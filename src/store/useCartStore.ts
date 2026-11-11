import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/database";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AddToCartResult {
  added: boolean;
  maxReached: boolean;
  availableStock: number | null;
}

/**
 * Returns remaining numeric stock for a product,
 * 0 if out of stock / sold out, or null if quantity tracking is unset.
 */
export function getAvailableStock(product: Product): number | null {
  if (product.in_stock === false) return 0;
  if (
    typeof product.stock_quantity === "number" &&
    !Number.isNaN(product.stock_quantity)
  ) {
    return Math.max(0, Math.floor(product.stock_quantity));
  }
  return null;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Drawer control
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Item operations
  addItem: (
    product: Product,
    quantity?: number,
    openDrawer?: boolean
  ) => AddToCartResult;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  syncCartWithProducts: (freshProducts: Product[]) => void;
  clearCart: () => void;

  // Computations
  getTotalCount: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getFinalTotal: () => number;
}

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 199;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (
        product: Product,
        quantity = 1,
        openDrawer = false
      ): AddToCartResult => {
        const availableStock = getAvailableStock(product);
        if (availableStock === 0) {
          return { added: false, maxReached: true, availableStock: 0 };
        }

        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id
        );
        const currentQty = existingIndex > -1 ? currentItems[existingIndex].quantity : 0;

        if (availableStock !== null && currentQty >= availableStock) {
          if (openDrawer) {
            set({ isOpen: true });
          }
          return { added: false, maxReached: true, availableStock };
        }

        const requestedQty = Math.max(1, Math.floor(quantity));
        const nextQty =
          availableStock !== null
            ? Math.min(availableStock, currentQty + requestedQty)
            : currentQty + requestedQty;

        set((state) => {
          const idx = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (idx > -1) {
            const newItems = state.items.map((item, i) =>
              i === idx ? { ...item, product, quantity: nextQty } : item
            );
            return { items: newItems, isOpen: openDrawer ? true : state.isOpen };
          } else {
            return {
              items: [...state.items, { product, quantity: nextQty }],
              isOpen: openDrawer ? true : state.isOpen,
            };
          }
        });

        return {
          added: true,
          maxReached: availableStock !== null && nextQty >= availableStock,
          availableStock,
        };
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const target = state.items.find((item) => item.product.id === productId);
          if (!target) return state;

          const availableStock = getAvailableStock(target.product);
          if (availableStock === 0) {
            return {
              items: state.items.filter((item) => item.product.id !== productId),
            };
          }

          const clampedQty =
            availableStock !== null ? Math.min(quantity, availableStock) : quantity;

          return {
            items: state.items.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: clampedQty }
                : item
            ),
          };
        });
      },

      syncCartWithProducts: (freshProducts: Product[]) => {
        if (!Array.isArray(freshProducts) || freshProducts.length === 0) return;

        set((state) => {
          if (state.items.length === 0) return state;

          let changed = false;
          const nextItems: CartItem[] = [];

          for (const item of state.items) {
            const match = freshProducts.find(
              (p) => p.id === item.product.id || p.slug === item.product.slug
            );

            if (!match) {
              nextItems.push(item);
              continue;
            }

            const availableStock = getAvailableStock(match);
            if (availableStock === 0) {
              changed = true;
              continue; // Drop item that is now sold out
            }

            const clampedQty =
              availableStock !== null
                ? Math.min(item.quantity, availableStock)
                : item.quantity;

            if (
              clampedQty !== item.quantity ||
              match.stock_quantity !== item.product.stock_quantity ||
              match.in_stock !== item.product.in_stock ||
              match.price !== item.product.price ||
              match.sale_price !== item.product.sale_price
            ) {
              changed = true;
            }

            nextItems.push({ product: match, quantity: clampedQty });
          }

          return changed ? { items: nextItems } : state;
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const activePrice = item.product.sale_price ?? item.product.price;
          return total + activePrice * item.quantity;
        }, 0);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return STANDARD_SHIPPING_FEE;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingFee();
        return subtotal + shipping;
      },
    }),
    {
      name: "anayas_cart_storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

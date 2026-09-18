"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export function useHydratedCart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...cart,
    isHydrated,
    totalCount: isHydrated ? cart.getTotalCount() : 0,
    subtotal: isHydrated ? cart.getSubtotal() : 0,
    shippingFee: isHydrated ? cart.getShippingFee() : 0,
    finalTotal: isHydrated ? cart.getFinalTotal() : 0,
  };
}

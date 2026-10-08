export type ProductCategory =
  | "Necklace"
  | "Pendant Sets"
  | "Everyday Wear"
  | "Earrings"
  | "Rings"
  | "Bracelets"
  | "Mangalsutra";

export interface ProductSpecifications {
  material: string;
  plating: string;
  stones: string;
  weight?: string;
  closure?: string;
}

export interface Product {
  id: string; // uuid
  title: string;
  slug: string;
  price: number;
  sale_price?: number;
  in_stock: boolean;
  is_bestseller: boolean;
  category: ProductCategory;
  description: string;
  images: string[];
  specifications: ProductSpecifications;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface OrderLineItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string; // uuid
  order_number: string; // e.g. "ANA-1082"
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  line_items: OrderLineItem[];
  total_amount: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  status: OrderStatus;
  courier_name: string; // default: "BlueDart"
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
}

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 199;

export const MAX_COD_AMOUNT = 1500;
export const COD_FEE = 80;

export function computeShippingFee(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return STANDARD_SHIPPING_FEE;
}


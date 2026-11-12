import { OrderLineItem } from "@/types/database";
import { writeClient } from "./client";

/**
 * Deducts purchased quantities from Sanity product documents (both published and
 * any open draft) using optimistic locking, and automatically marks items Out of Stock
 * (`inStock: false`) when remaining quantity reaches 0.
 */
export async function decrementProductStock(lineItems: OrderLineItem[]) {
  const qtyByProduct = new Map<string, number>();

  for (const item of lineItems) {
    if (!item.product_id) continue;
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    qtyByProduct.set(item.product_id, (qtyByProduct.get(item.product_id) || 0) + qty);
  }

  for (const [productId, purchasedQty] of qtyByProduct.entries()) {
    const publishedId = productId.replace(/^drafts\./, "");
    const draftId = `drafts.${publishedId}`;

    // Retry up to 2 times in case of a concurrent optimistic-lock (_rev) conflict
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const docs = await writeClient.fetch<
          Array<{
            _id: string;
            _rev: string;
            stockQuantity?: number | null;
            inStock?: boolean;
          }>
        >(
          `*[_type == "product" && (_id in [$publishedId, $draftId] || slug.current == $productId)]{ _id, _rev, stockQuantity, inStock }`,
          { publishedId, draftId, productId }
        );

        if (!docs || docs.length === 0) break;

        for (const doc of docs) {
          if (typeof doc.stockQuantity !== "number" || Number.isNaN(doc.stockQuantity)) {
            continue;
          }

          const nextQty = Math.max(0, Math.floor(doc.stockQuantity) - purchasedQty);
          const updates: { stockQuantity: number; inStock?: boolean } = {
            stockQuantity: nextQty,
          };

          if (nextQty <= 0) {
            updates.inStock = false;
          }

          await writeClient
            .patch(doc._id)
            .ifRevisionId(doc._rev)
            .set(updates)
            .commit();
        }

        break;
      } catch (err) {
        if (attempt === 1) {
          console.error(
            `[Sanity Stock Decrement Error] Failed for ${productId}:`,
            err
          );
        }
      }
    }
  }
}


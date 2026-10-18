import { DocumentActionProps, DocumentActionDescription } from "sanity";

export function SendTrackingEmailAction(
  props: DocumentActionProps
): DocumentActionDescription | null {
  const { id, type, draft, published } = props;

  // Only render on "order" documents
  if (type !== "order") return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = (draft || published) as any;
  const isSent = Boolean(doc?.trackingEmailSent);

  return {
    label: isSent ? "Resend Tracking Email" : "Dispatch & Send Tracking Email",
    tone: "primary",
    title:
      "Send BlueDart tracking waybill to customer email and mark order as Dispatched",
    onHandle: async () => {
      const trackingNumber = doc?.trackingNumber?.trim();

      if (!trackingNumber) {
        alert(
          "⚠️ Missing Courier Tracking Number\n\nPlease paste the BlueDart / Courier Waybill number in the 'Fulfillment & Tracking' section above before dispatching this order."
        );
        return;
      }

      if (!doc?.customerEmail) {
        alert("⚠️ Customer email address is missing on this order.");
        return;
      }

      const confirmed = window.confirm(
        `Are you ready to dispatch Order #${doc.orderNumber || id}?\n\nThis will email the tracking link (${trackingNumber}) to ${doc.customerEmail} and mark the order as Dispatched.`
      );
      if (!confirmed) return;

      try {
        const res = await fetch("/api/webhooks/sanity-dispatch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: id,
            orderNumber: doc.orderNumber,
            customerName: doc.customerName,
            customerEmail: doc.customerEmail,
            courierName: doc.courierName || "BlueDart",
            trackingNumber: trackingNumber,
            trackingUrl:
              doc.trackingUrl ||
              `https://www.bluedart.com/tracking?track=${encodeURIComponent(
                trackingNumber
              )}`,
            shippingAddress: doc.shippingAddress,
            lineItems: doc.lineItems,
            totalAmount: doc.totalAmount,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          alert(
            `✓ Order Dispatched!\n\nTracking notification email successfully sent to ${doc.customerEmail} via BlueDart.\nSanity order status has been updated to Dispatched.`
          );
          props.onComplete();
        } else {
          alert(
            `Dispatch Notice: ${
              data.error || "Could not complete dispatch request."
            }`
          );
        }
      } catch (err: unknown) {
        alert(
          `Network Error: ${
            err instanceof Error
              ? err.message
              : "Failed to connect to /api/webhooks/sanity-dispatch."
          }`
        );
      }
    },
  };
}

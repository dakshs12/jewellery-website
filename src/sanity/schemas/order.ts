import { defineType, defineField } from "sanity";
import { DispatchOrderField } from "../components/DispatchOrderField";

export const order = defineType({
  name: "order",
  title: "Customer Orders & Dispatch",
  type: "document",
  groups: [
    {
      name: "fulfillment",
      title: "1. Fulfillment & Tracking (Editable)",
      default: true,
    },
    {
      name: "details",
      title: "2. Order & Customer Details (Read-Only)",
    },
  ],
  fields: [
    // --- 1. FULFILLMENT & TRACKING (EDITABLE BY CLIENT) ---
    defineField({
      name: "status",
      title: "Order Fulfillment Status",
      type: "string",
      group: "fulfillment",
      options: {
        list: [
          { title: "Payment Pending", value: "pending" },
          { title: "Paid & Confirmed", value: "paid" },
          { title: "Processing & Packaging", value: "processing" },
          { title: "Dispatched / Shipped", value: "dispatched" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled / Refunded", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "paid",
    }),
    defineField({
      name: "courierName",
      title: "Courier / Logistics Partner",
      type: "string",
      group: "fulfillment",
      initialValue: "BlueDart",
      options: {
        list: [
          { title: "BlueDart Express", value: "BlueDart" },
          { title: "Delhivery", value: "Delhivery" },
          { title: "DTDC Courier", value: "DTDC" },
          { title: "India Post Speed Post", value: "India Post" },
          { title: "Other / Hand Delivered", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "trackingNumber",
      title: "Courier Waybill / Tracking AWB",
      type: "string",
      group: "fulfillment",
      description: "Paste courier waybill / tracking number here. Saving here triggers dispatch updates.",
    }),
    defineField({
      name: "trackingUrl",
      title: "Courier Tracking Page URL",
      type: "url",
      group: "fulfillment",
      initialValue: "https://www.bluedart.com/tracking",
      description: "Courier tracking page URL sent to client in dispatch notification.",
    }),
    defineField({
      name: "dispatchAction",
      title: "Dispatch Action",
      type: "string",
      group: "fulfillment",
      components: {
        field: DispatchOrderField,
      },
    }),
    defineField({
      name: "trackingEmailSent",
      title: "Tracking Email Dispatched?",
      type: "boolean",
      group: "fulfillment",
      initialValue: false,
      readOnly: true,
      description: "Automatically marked true when the dispatch notification email is sent to the customer.",
    }),
    defineField({
      name: "dispatchedAt",
      title: "Dispatched Timestamp",
      type: "datetime",
      group: "fulfillment",
      readOnly: true,
      description: "Date and time when the package was dispatched and customer was notified.",
    }),

    // --- 2. ORDER & CUSTOMER DETAILS (READ-ONLY CAPTURE) ---
    defineField({
      name: "orderNumber",
      title: "Order Reference Number",
      type: "string",
      group: "details",
      readOnly: true,
      description: "Auto-generated invoice number (e.g. ANA-1082)",
    }),
    defineField({
      name: "customerName",
      title: "Customer Full Name",
      type: "string",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email Address",
      type: "string",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "customerPhone",
      title: "Customer WhatsApp / Phone",
      type: "string",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "shippingAddress",
      title: "Delivery Address",
      type: "object",
      group: "details",
      readOnly: true,
      fields: [
        { name: "street", title: "Street Address", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "postalCode", title: "PIN Code", type: "string" },
      ],
    }),
    defineField({
      name: "lineItems",
      title: "Purchased Jewellery Items",
      type: "array",
      group: "details",
      readOnly: true,
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", title: "Product ID", type: "string" },
            { name: "title", title: "Jewellery Title", type: "string" },
            { name: "price", title: "Unit Price (₹)", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "image", title: "Product Thumbnail", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Paid Amount (₹)",
      type: "number",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "razorpayOrderId",
      title: "Razorpay Order ID",
      type: "string",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "razorpayPaymentId",
      title: "Razorpay Payment ID",
      type: "string",
      group: "details",
      readOnly: true,
    }),
    defineField({
      name: "createdAt",
      title: "Order Placed At",
      type: "datetime",
      group: "details",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      customerName: "customerName",
      totalAmount: "totalAmount",
      status: "status",
      date: "createdAt",
    },
    prepare({ orderNumber, customerName, totalAmount, status, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "";
      return {
        title: `${orderNumber || "New Order"} — ${customerName || "Customer"} (₹${totalAmount || 0})`,
        subtitle: `Status: ${(status || "pending").toUpperCase()} • ${formattedDate}`,
      };
    },
  },
});

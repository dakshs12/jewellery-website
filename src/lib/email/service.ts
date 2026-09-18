import { Resend } from "resend";
import { Order } from "@/types/database";
import {
  renderCustomerOrderConfirmationEmail,
  renderAdminNewOrderAlertEmail,
  renderCustomerOrderDispatchedEmail,
} from "./templates";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "orders@anayasjewels.com";
const ADMIN_EMAIL = process.env.ADMIN_ALERT_EMAIL || "admin@anayasjewels.com";

export async function sendOrderConfirmationEmails(order: Order) {
  const customerHtml = renderCustomerOrderConfirmationEmail(order);
  const adminHtml = renderAdminNewOrderAlertEmail(order);

  // If no Resend API key is configured yet, mock-log the transactional delivery
  if (!resend) {
    console.log(`[Resend Mock] Customer Order Confirmation Sent to ${order.customer_email}:`, {
      subject: `Order Confirmed: #${order.order_number} — Anayas Heirlooms`,
      orderNumber: order.order_number,
      total: order.total_amount,
    });
    console.log(`[Resend Mock] Admin Alert Sent to ${ADMIN_EMAIL}:`, {
      subject: `[ADMIN ALERT] New Order #${order.order_number} received`,
      orderId: order.id,
    });
    return {
      success: true,
      mock: true,
      message: "Transactional emails logged (RESEND_API_KEY not configured).",
    };
  }

  try {
    const [customerRes, adminRes] = await Promise.all([
      resend.emails.send({
        from: `Anayas Heirlooms <${SENDER_EMAIL}>`,
        to: order.customer_email,
        subject: `Order Confirmed: #${order.order_number} — Anayas Heirlooms`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: `Anayas System <${SENDER_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `[ADMIN ALERT] New Order #${order.order_number} received`,
        html: adminHtml,
      }),
    ]);

    return {
      success: true,
      customerMessageId: customerRes.data?.id,
      adminMessageId: adminRes.data?.id,
    };
  } catch (error) {
    console.error("[Resend Error] Failed sending order emails:", error);
    return { success: false, error };
  }
}

export async function sendOrderDispatchedEmail(order: Order) {
  const dispatchedHtml = renderCustomerOrderDispatchedEmail(order);

  if (!resend) {
    console.log(`[Resend Mock] Order Dispatched Email Sent to ${order.customer_email}:`, {
      subject: `Your Anayas parcel has been shipped via ${order.courier_name}!`,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
    });
    return {
      success: true,
      mock: true,
      message: "Dispatch email logged (RESEND_API_KEY not configured).",
    };
  }

  try {
    const result = await resend.emails.send({
      from: `Anayas Logistics <${SENDER_EMAIL}>`,
      to: order.customer_email,
      subject: `Your Anayas parcel has been shipped via ${order.courier_name}!`,
      html: dispatchedHtml,
    });
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error("[Resend Error] Failed sending dispatch email:", error);
    return { success: false, error };
  }
}

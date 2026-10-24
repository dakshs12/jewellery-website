import { Resend } from "resend";
import { Order } from "@/types/database";
import {
  renderCustomerOrderConfirmationEmail,
  renderAdminNewOrderAlertEmail,
  renderCustomerOrderDispatchedEmail,
} from "./templates";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Formats display name cleanly (e.g. orders@anayasjewels.com -> Anayas Jewels <orders@anayasjewels.com>)
const rawSender =
  process.env.RESEND_FROM_EMAIL || "Anayas Jewels <onboarding@resend.dev>";
const SENDER_EMAIL = rawSender.includes("<")
  ? rawSender
  : `Anayas Jewels <${rawSender}>`;
const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.ADMIN_ALERT_EMAIL ||
  "info@anayasjewels.com";
const CLIENT_REPLY_TO =
  process.env.RESEND_REPLY_TO || "anayasjewels9@gmail.com";

export async function sendOrderConfirmationEmails(
  order: Order,
  originUrl?: string
) {
  const customerHtml = renderCustomerOrderConfirmationEmail(order);
  const adminHtml = renderAdminNewOrderAlertEmail(order, originUrl);

  // If no Resend API key is configured yet, mock-log the transactional delivery
  if (!resend) {
    console.log(
      `[Resend Notice] RESEND_API_KEY not configured. Transactional emails logged:`
    );
    console.log(`  -> Customer Email: ${order.customer_email} (Order #${order.order_number})`);
    console.log(`  -> Admin Alert: ${ADMIN_EMAIL} (₹${order.total_amount})`);
    return {
      success: true,
      mock: true,
      message: "Transactional emails logged (RESEND_API_KEY not set).",
    };
  }

  try {
    const [customerRes, adminRes] = await Promise.allSettled([
      resend.emails.send({
        from: SENDER_EMAIL,
        to: order.customer_email,
        replyTo: CLIENT_REPLY_TO,
        subject: `ANAYAS - Order ${order.order_number} Confirmed!`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: SENDER_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: order.customer_email || CLIENT_REPLY_TO,
        subject: `🛍️ New Order #${order.order_number} — ₹${order.total_amount} (${order.customer_name})`,
        html: adminHtml,
      }),
    ]);

    const customerSuccess = customerRes.status === "fulfilled" && !customerRes.value.error;
    const adminSuccess = adminRes.status === "fulfilled" && !adminRes.value.error;

    if (!customerSuccess && customerRes.status === "fulfilled" && customerRes.value.error) {
      console.warn(
        `[Resend Customer Email Notice]:`,
        customerRes.value.error.message || customerRes.value.error
      );
    }

    if (!adminSuccess && adminRes.status === "fulfilled" && adminRes.value.error) {
      console.warn(
        `[Resend Admin Email Notice]:`,
        adminRes.value.error.message || adminRes.value.error
      );
    }

    return {
      success: true,
      customerSuccess,
      adminSuccess,
    };
  } catch (error) {
    console.warn(
      "[Resend Warning] Non-critical error sending confirmation emails:",
      error
    );
    return {
      success: true,
      emailDelivered: false,
      warning: error instanceof Error ? error.message : "Email delivery warning",
    };
  }
}

export async function sendOrderDispatchedEmail(order: Order) {
  const dispatchedHtml = renderCustomerOrderDispatchedEmail(order);

  if (!resend) {
    console.log(
      `[Resend Notice] RESEND_API_KEY not configured. Dispatch email logged:`
    );
    console.log(
      `  -> Customer: ${order.customer_email} | Waybill: ${order.tracking_number} | Carrier: ${order.courier_name}`
    );
    return {
      success: true,
      mock: true,
      message: "Dispatch email logged (RESEND_API_KEY not set).",
    };
  }

  try {
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to: order.customer_email,
      replyTo: CLIENT_REPLY_TO,
      subject: `✨ Your Anayas order ${order.order_number} has been Dispatched!`,
      html: dispatchedHtml,
    });

    if (result.error) {
      console.warn("[Resend Dispatch Email Notice]:", result.error.message);
      return { success: false, error: result.error };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.warn("[Resend Warning] Non-critical error sending dispatch email:", error);
    return {
      success: true,
      emailDelivered: false,
      warning: error instanceof Error ? error.message : "Dispatch delivery warning",
    };
  }
}

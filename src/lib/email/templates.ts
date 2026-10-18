import { Order } from "@/types/database";
import { formatPrice } from "@/lib/utils";

/**
 * Luxury HTML Email Templates for Anayas Jewels
 * Palette:
 * - Ivory / Cream: #FFF6EA
 * - Warm Sand / Gold Accent: #EAD5BE / #C5A059
 * - Espresso Typography: #1C1917
 * - Soft Border: #E9E3DB
 */

export function renderCustomerOrderConfirmationEmail(order: Order): string {
  const itemsHtml = order.line_items
    .map(
      (item) => `
      <tr>
        <td style="padding: 14px 0; border-bottom: 1px solid #E9E3DB;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="60" style="vertical-align: top; padding-right: 14px;">
                <img src="${item.image}" alt="${item.title}" width="60" height="75" style="border-radius: 8px; object-fit: cover; display: block; border: 1px solid #E9E3DB;" />
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 16px; color: #1C1917; font-weight: 600;">${item.title}</p>
                <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #78716C;">Qty: ${item.quantity} × ${formatPrice(item.price)}</p>
              </td>
              <td style="vertical-align: top; text-align: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 600; color: #1C1917;">
                ${formatPrice(item.price * item.quantity)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmed — Anayas Jewels</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF6EA; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 24px; text-align: center; background-color: #EAD5BE; border-bottom: 1px solid #D8C2AA;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; letter-spacing: 0.28em; color: #1C1917; font-weight: 600;">ANAYAS</p>
              <p style="margin: 4px 0 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #1C1917;">Artisanal Heirlooms & Fine Imitation Jewellery</p>
            </td>
          </tr>

          <!-- Confirmation Copy -->
          <tr>
            <td style="padding: 36px 40px 20px; background-color: #FFFFFF;">
              <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A059; font-weight: 600;">Payment Confirmed • #${order.order_number}</p>
              <h1 style="margin: 0 0 16px; font-family: 'Times New Roman', Georgia, serif; font-size: 26px; font-weight: 500; color: #1C1917; line-height: 1.3;">Thank you for shopping with Anayas Jewels.</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #57534E; line-height: 1.6;">
                Thank you for shopping with Anayas Jewels. Your order has been placed successfully and our artisans are preparing your pieces. We will shortly share your tracking link with you as soon as your package is dispatched.
              </p>

              <!-- Order & Payment Reference Box -->
              <div style="background-color: #FFF6EA; border-radius: 12px; border: 1px solid #E9E3DB; padding: 18px 20px; margin-bottom: 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="font-size: 12px; color: #78716C; padding-bottom: 6px;">Order Number:</td>
                    <td style="font-size: 13px; font-weight: 700; color: #1C1917; text-align: right; padding-bottom: 6px;">${order.order_number}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #78716C; padding-bottom: 6px;">Razorpay Payment ID:</td>
                    <td style="font-size: 12px; font-family: monospace; color: #1C1917; text-align: right; padding-bottom: 6px;">${order.razorpay_payment_id || "Paid Online"}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #78716C;">Status:</td>
                    <td style="font-size: 12px; font-weight: 700; color: #2D4F3E; text-align: right; text-transform: uppercase;">Confirmed & Paid</td>
                  </tr>
                </table>
              </div>

              <!-- Shipping Address Box -->
              <div style="background-color: #F8F6F2; border-radius: 12px; border: 1px solid #E9E3DB; padding: 18px 20px; margin-bottom: 28px;">
                <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #78716C; font-weight: 700;">Delivery Destination</p>
                <p style="margin: 0; font-size: 14px; color: #1C1917; font-weight: 600;">${order.customer_name}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #57534E; line-height: 1.5;">
                  ${order.shipping_address.street}<br/>
                  ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.postal_code}<br/>
                  Mobile: <strong>${order.customer_phone}</strong>
                </p>
              </div>

              <!-- Line Items -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                ${itemsHtml}
              </table>

              <!-- Total Breakdown -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #E9E3DB; padding-top: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #78716C;">Total Items</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #1C1917; text-align: right; font-weight: 600;">${order.line_items.length} item(s)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #78716C;">Insured Courier Delivery (${order.courier_name})</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #2D4F3E; text-align: right; font-weight: 600;">INCLUDED</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; color: #1C1917; font-weight: 700; border-top: 1px solid #E9E3DB;">Total Paid (INR)</td>
                  <td style="padding: 12px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 20px; color: #1C1917; text-align: right; font-weight: 700; border-top: 1px solid #E9E3DB;">${formatPrice(order.total_amount)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #FFF6EA; border-top: 1px solid #E9E3DB; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #78716C;">Have questions about your order? Reply directly to this email or message our Bridal Concierge on WhatsApp.</p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #A8A29E;">© ${new Date().getFullYear()} Anayas Jewels. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function renderAdminNewOrderAlertEmail(
  order: Order,
  studioBaseUrl = "https://anayasjewels.com"
): string {
  const studioOrderLink = `${studioBaseUrl}/studio/structure/order;${order.id || `order-${order.order_number.toLowerCase()}`}`;

  const itemsListText = order.line_items
    .map(
      (item) =>
        `• ${item.title} (Qty: ${item.quantity}) — ${formatPrice(item.price * item.quantity)}`
    )
    .join("<br/>");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🛍️ New Order #${order.order_number} Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F3EFEA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3EFEA; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 14px; border: 1px solid #E9E3DB; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
          <tr>
            <td>
              <span style="display: inline-block; background-color: #EAD5BE; color: #1C1917; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;">New Paid Order</span>
              <h1 style="margin: 0 0 12px; font-family: 'Times New Roman', Georgia, serif; font-size: 24px; color: #1C1917;">Order #${order.order_number} — ${formatPrice(order.total_amount)}</h1>
              <p style="margin: 0 0 20px; font-size: 15px; color: #1C1917; line-height: 1.5;">
                A new order has been paid via Razorpay by <strong>${order.customer_name}</strong>. Please prepare the pieces and generate the BlueDart courier label.
              </p>

              <!-- Shipping Slip Box -->
              <div style="background-color: #FFF6EA; border: 1px solid #E9E3DB; border-radius: 10px; padding: 18px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; color: #1C1917;">
                <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #C5A059; font-weight: 700;">Customer & Courier Details</p>
                <p style="margin: 0;"><strong>Name:</strong> ${order.customer_name}</p>
                <p style="margin: 2px 0;"><strong>Phone:</strong> <a href="tel:${order.customer_phone}" style="color: #1C1917; font-weight: bold;">${order.customer_phone}</a></p>
                <p style="margin: 2px 0;"><strong>Email:</strong> <a href="mailto:${order.customer_email}" style="color: #1C1917;">${order.customer_email}</a></p>
                <p style="margin: 8px 0 2px;"><strong>Shipping Address:</strong><br/>
                  ${order.shipping_address.street}<br/>
                  ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.postal_code}
                </p>
                <p style="margin: 6px 0 0; font-size: 12px; color: #78716C;"><strong>Razorpay Payment:</strong> ${order.razorpay_payment_id}</p>
              </div>

              <!-- Product List Box -->
              <div style="background-color: #F8F6F2; border: 1px solid #E9E3DB; border-radius: 10px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #1C1917;">
                <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #78716C; font-weight: 700;">Ordered Items</p>
                ${itemsListText}
              </div>

              <!-- Direct CTA to Sanity Studio -->
              <div style="text-align: center;">
                <a href="${studioOrderLink}" target="_blank" style="display: inline-block; background-color: #1C1917; color: #FAF8F5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; padding: 14px 28px; border-radius: 50px;">
                  Open in Sanity Studio to Dispatch →
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function renderCustomerOrderDispatchedEmail(order: Order): string {
  const trackingNumber = order.tracking_number || "BLUEDART-EXP-98218";
  const trackingUrl =
    order.tracking_url ||
    `https://www.bluedart.com/tracking?track=${trackingNumber}`;
  const courierName = order.courier_name || "BlueDart";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>✨ Your Anayas Jewels Order #${order.order_number} has been Dispatched!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF6EA; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; background-color: #EAD5BE; border-bottom: 1px solid #D8C2AA; text-align: center;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 26px; letter-spacing: 0.28em; color: #1C1917; font-weight: 600;">ANAYAS</p>
              <p style="margin: 4px 0 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #1C1917;">Artisanal Heirlooms Dispatched</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2D4F3E; font-weight: 700; display: block; margin-bottom: 8px;">Shipped via ${courierName} Insured</span>
              <h1 style="margin: 0 0 16px; font-family: 'Times New Roman', Georgia, serif; font-size: 24px; color: #1C1917;">Your jewellery package is on its way!</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #57534E; line-height: 1.6;">
                Dear ${order.customer_name}, your handcrafted jewellery pieces for Order <strong>#${order.order_number}</strong> have been packaged in our luxury vault box and handed over to <strong>${courierName}</strong> for insured express delivery.
              </p>

              <!-- Copy-Friendly Waybill Box -->
              <div style="background-color: #FFF6EA; border: 2px dashed #C5A059; border-radius: 12px; padding: 22px; margin-bottom: 28px; text-align: center;">
                <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #78716C; letter-spacing: 0.15em;">Courier Tracking AWB / Waybill</p>
                <p style="margin: 0; font-family: monospace; font-size: 22px; font-weight: bold; letter-spacing: 0.1em; color: #1C1917; user-select: all;">
                  ${trackingNumber}
                </p>
                <p style="margin: 8px 0 0; font-size: 12px; color: #78716C;">Carrier: <strong>${courierName} Express</strong></p>
              </div>

              <!-- Primary CTA Button -->
              <div style="text-align: center; margin-bottom: 28px;">
                <a href="${trackingUrl}" target="_blank" style="display: inline-block; background-color: #1C1917; color: #FAF8F5; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; padding: 16px 36px; border-radius: 50px;">
                  Track Your Order →
                </a>
              </div>

              <div style="background-color: #F8F6F2; border-radius: 10px; padding: 14px 18px; font-size: 12px; color: #78716C; line-height: 1.5;">
                <strong style="color: #1C1917;">Destination:</strong> ${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state} (${order.shipping_address.postal_code})
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #FFF6EA; border-top: 1px solid #E9E3DB; text-align: center; font-size: 12px; color: #78716C;">
              Please ensure an adult is available to receive the insured parcel upon OTP confirmation.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

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
  const itemsTotal = order.line_items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = Math.max(0, order.total_amount - itemsTotal);

  const itemsHtml = order.line_items
    .map(
      (item, idx) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #F0ECE6; vertical-align: top;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="24" style="vertical-align: top; font-size: 14px; font-weight: 700; color: #1C1917; padding-top: 2px;">
                ${idx + 1}.
              </td>
              <td width="60" style="vertical-align: top; padding-right: 14px;">
                <img src="${item.image}" alt="${item.title}" width="56" height="70" style="border-radius: 6px; object-fit: cover; display: block; border: 1px solid #E9E3DB;" />
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: #1C1917; font-weight: 700;">
                  ${item.title}
                </p>
                <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #57534E;">
                  ${item.quantity > 1 ? `Qty: ${item.quantity} × ` : ""}${formatPrice(item.price)}
                </p>
              </td>
              <td style="vertical-align: top; text-align: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 700; color: #1C1917;">
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
  <title>ANAYAS - Order ${order.order_number} Confirmed!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1917;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF6EA; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 20px; text-align: center; background-color: #FFF6EA; border-bottom: 1px solid #E9E3DB;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; letter-spacing: 0.28em; color: #1C1917; font-weight: 700;">ANAYAS</p>
              <p style="margin: 8px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 19px; color: #1C1917; font-weight: 600;">Thank You for Shopping with Anayas!</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 36px; font-size: 14px; line-height: 1.6; color: #1C1917;">
              <p style="margin: 0 0 10px; font-size: 15px;">Dear <strong>${order.customer_name}</strong>,</p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #57534E;">Greetings from Anayas!</p>
              <p style="margin: 0 0 14px; color: #1C1917;">
                We're delighted to confirm that your order has been placed successfully and your payment has been received.
              </p>
              <p style="margin: 0 0 24px; color: #57534E;">
                Our team is preparing your order. We will notify you as soon as your order is dispatched, along with the tracking details so you can follow its journey to you.
              </p>

              <!-- ORDER DETAILS -->
              <div style="background-color: #FAF8F5; border: 1px solid #E9E3DB; border-radius: 10px; padding: 16px 20px; margin-bottom: 22px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #C5A059;">ORDER DETAILS</p>
                <p style="margin: 0 0 4px; font-size: 13px;"><strong>Order Number:</strong> ${order.order_number}</p>
                <p style="margin: 0; font-size: 13px;"><strong>Payment ID:</strong> <span style="font-family: monospace;">${order.razorpay_payment_id || "Paid Online"}</span></p>
              </div>

              <!-- DELIVERY DESTINATION -->
              <div style="background-color: #FAF8F5; border: 1px solid #E9E3DB; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #C5A059;">DELIVERY DESTINATION</p>
                <p style="margin: 0; font-weight: 700; font-size: 14px; color: #1C1917;">${order.customer_name}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #57534E; line-height: 1.5;">
                  ${order.shipping_address.street}<br/>
                  ${order.shipping_address.city}, ${order.shipping_address.state} – ${order.shipping_address.postal_code}
                </p>
                <p style="margin: 6px 0 0; font-size: 13px; color: #1C1917;">
                  <strong>Mobile:</strong> ${order.customer_phone}
                </p>
              </div>

              <!-- YOUR ORDER -->
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #1C1917;">YOUR ORDER</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                ${itemsHtml}
              </table>

              <!-- Cost Breakdown -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #57534E; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 4px 0;"><strong>Total Cost:</strong></td>
                  <td style="padding: 4px 0; text-align: right; color: #1C1917;">${formatPrice(itemsTotal)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Shipping Cost:</strong></td>
                  <td style="padding: 4px 0; text-align: right; color: #2D4F3E; font-weight: 600;">
                    ${shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 0; font-size: 15px; font-weight: 700; color: #1C1917; border-top: 1px solid #E9E3DB;"><strong>Total Paid:</strong></td>
                  <td style="padding: 10px 0 0; font-size: 16px; font-weight: 700; color: #1C1917; text-align: right; border-top: 1px solid #E9E3DB;">${formatPrice(order.total_amount)}</td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top: 1px solid #E9E3DB; margin: 24px 0 20px;"></div>

              <!-- Sign-off & Support -->
              <p style="margin: 0 0 14px; font-size: 14px;">Thank you for choosing Anayas.</p>
              <p style="margin: 0 0 20px; font-size: 14px;">
                <strong>With love,</strong><br/>
                Team Anayas
              </p>

              <div style="background-color: #FFF6EA; border-radius: 8px; padding: 14px 16px; font-size: 12px; color: #78716C; line-height: 1.5;">
                Have questions about your order? Reply directly to this email or reach out to us on WhatsApp at <a href="https://wa.me/919893020204" style="color: #1C1917; font-weight: 700; text-decoration: underline;">+91 98930 20204</a>.
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
    `https://www.bluedart.com/tracking?track=${encodeURIComponent(trackingNumber)}`;
  const courierName = order.courier_name || "BlueDart";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>✨ Your Anayas order ${order.order_number} has been Dispatched!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1917;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF6EA; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 20px; text-align: center; background-color: #FFF6EA; border-bottom: 1px solid #E9E3DB;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; letter-spacing: 0.28em; color: #1C1917; font-weight: 700;">ANAYAS</p>
              <p style="margin: 6px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 15px; color: #78716C; font-style: italic; letter-spacing: 0.05em;">An everyday luxury</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 28px 36px; font-size: 14px; line-height: 1.6; color: #1C1917;">
              <p style="margin: 0 0 10px; font-size: 15px;">Dear <strong>${order.customer_name}</strong>,</p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #57534E;">Greetings from Anayas</p>
              <p style="margin: 0 0 24px; color: #1C1917;">
                Your order <strong>${order.order_number}</strong> has been shipped from the dispatch center today and is on its way to you.
              </p>

              <!-- Tracking Details Box -->
              <p style="margin: 0 0 10px; font-size: 14px; font-weight: 700; color: #1C1917;">
                To Track your order kindly find the details below:
              </p>
              <div style="background-color: #FAF8F5; border: 1px solid #E9E3DB; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 13px;">
                  <strong>Courier Partner:</strong> ${courierName}
                </p>
                <p style="margin: 0; font-size: 13px;">
                  <strong>Tracking / AWB Number:</strong> <span style="font-family: monospace; font-size: 15px; font-weight: 700; background-color: #FFF6EA; padding: 3px 8px; border-radius: 4px; border: 1px solid #EAD5BE; user-select: all;">${trackingNumber}</span>
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 24px 0 8px;">
                <a href="${trackingUrl}" target="_blank" style="display: inline-block; background-color: #1C1917; color: #FAF8F5; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; padding: 16px 36px; border-radius: 50px;">
                  TRACK YOUR ORDER
                </a>
              </div>
              <p style="text-align: center; margin: 0 0 28px; font-size: 12px; color: #78716C; font-style: italic;">
                Click the button above to follow your shipment.
              </p>

              <!-- Sign-off -->
              <p style="margin: 0 0 10px; font-size: 14px; font-weight: 700;">
                Thank you for choosing us :)
              </p>
              <p style="margin: 0 0 24px; font-size: 14px;">
                Best Regards,<br/>
                <strong>Team Anayas</strong>
              </p>

              <!-- Divider -->
              <div style="border-top: 1px solid #E9E3DB; margin: 24px 0 20px;"></div>

              <!-- Important Notes & Support -->
              <div style="font-size: 12px; color: #78716C; line-height: 1.6;">
                <p style="margin: 0 0 8px;">
                  Please ensure an adult is available to receive the parcel upon OTP confirmation if required.
                </p>
                <p style="margin: 0;">
                  For any assistance with your order, please contact us at <a href="mailto:anayasjewels9@gmail.com" style="color: #1C1917; text-decoration: underline;">anayasjewels9@gmail.com</a> or <a href="tel:+919893020204" style="color: #1C1917; font-weight: 700; text-decoration: underline;">+91 98930 20204</a>.
                </p>
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

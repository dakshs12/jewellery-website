import { Order } from "@/types/database";
import { formatPrice } from "@/lib/utils";

/**
 * Clean responsive inline HTML luxury email templates styled with Anayas aesthetic:
 * #FAF8F5 (Alabaster Cream), #F3EFEA (Warm Oat), #D4AF37 (Champagne Gold), #1C1917 (Deep Espresso)
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
                <p style="margin: 0; font-family: 'Times New Roman', serif; font-size: 16px; color: #1C1917; font-weight: 600;">${item.title}</p>
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
  <title>Order Confirmed — Anayas</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF8F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 24px; text-align: center; background-color: #F3EFEA; border-bottom: 1px solid #E9E3DB;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 28px; letter-spacing: 0.28em; color: #1C1917; font-weight: 600;">ANAYAS</p>
              <p style="margin: 4px 0 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #78716C;">Artisanal Imitation Jewellery</p>
            </td>
          </tr>

          <!-- Confirmation Copy -->
          <tr>
            <td style="padding: 36px 40px 20px;">
              <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A059; font-weight: 600;">Order Confirmed • ${order.order_number}</p>
              <h1 style="margin: 0 0 16px; font-family: 'Times New Roman', Georgia, serif; font-size: 26px; font-weight: 500; color: #1C1917; line-height: 1.3;">Thank you for shopping with Anayas.</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #78716C; line-height: 1.6;">
                Your order is confirmed and our artisans are preparing it. We will email your courier tracking link as soon as it is dispatched.
              </p>

              <!-- Order Summary Box -->
              <div style="background-color: #FAF8F5; border-radius: 12px; border: 1px solid #E9E3DB; padding: 20px 24px; margin-bottom: 28px;">
                <p style="margin: 0 0 12px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #78716C; font-weight: 600;">Delivery Address</p>
                <p style="margin: 0; font-size: 14px; color: #1C1917; font-weight: 600;">${order.customer_name}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #78716C; line-height: 1.5;">
                  ${order.shipping_address.street}<br/>
                  ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.postal_code}<br/>
                  Phone: ${order.customer_phone}
                </p>
              </div>

              <!-- Line Items -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                ${itemsHtml}
              </table>

              <!-- Total Breakdown -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #E9E3DB; padding-top: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #78716C;">Subtotal</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #1C1917; text-align: right; font-weight: 600;">${formatPrice(order.total_amount)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #78716C;">Courier Service (${order.courier_name})</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #2D4F3E; text-align: right; font-weight: 600;">COMPLIMENTARY</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 18px; color: #1C1917; font-weight: 700; border-top: 1px solid #E9E3DB;">Total Paid (Razorpay)</td>
                  <td style="padding: 12px 0 0; font-family: 'Times New Roman', Georgia, serif; font-size: 20px; color: #1C1917; text-align: right; font-weight: 700; border-top: 1px solid #E9E3DB;">${formatPrice(order.total_amount)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #FAF8F5; border-top: 1px solid #E9E3DB; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #78716C;">Need assistance with your jewellery? Contact our Bridal Concierge on WhatsApp or reply directly to this email.</p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #A8A29E;">© ${new Date().getFullYear()} Anayas Artisanal Heirlooms. All rights reserved.</p>
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
  directusAdminUrl = "https://admin.anayasjewels.com"
): string {
  const orderAdminLink = `${directusAdminUrl}/admin/content/orders/${order.id}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Admin Alert: New Order ${order.order_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F3EFEA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3EFEA; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E9E3DB; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
          <tr>
            <td>
              <span style="display: inline-block; background-color: #E8D7D0; color: #1C1917; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">Immediate Action Required</span>
              <h1 style="margin: 0 0 12px; font-family: 'Times New Roman', Georgia, serif; font-size: 24px; color: #1C1917;">New Order #${order.order_number} received</h1>
              <p style="margin: 0 0 20px; font-size: 15px; color: #1C1917; line-height: 1.5;">
                Total: <strong>${formatPrice(order.total_amount)}</strong>. Action required: Pack items and generate courier slip.
              </p>

              <div style="background-color: #FAF8F5; border: 1px solid #E9E3DB; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; color: #78716C;">
                <p style="margin: 0;"><strong>Customer:</strong> ${order.customer_name} (${order.customer_email}, ${order.customer_phone})</p>
                <p style="margin: 4px 0;"><strong>Destination:</strong> ${order.shipping_address.city}, ${order.shipping_address.state} (${order.shipping_address.postal_code})</p>
                <p style="margin: 4px 0;"><strong>Razorpay Payment ID:</strong> ${order.razorpay_payment_id}</p>
                <p style="margin: 4px 0 0;"><strong>Items Count:</strong> ${order.line_items.length} line item(s)</p>
              </div>

              <a href="${orderAdminLink}" target="_blank" style="display: inline-block; background-color: #1C1917; color: #FAF8F5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; padding: 14px 28px; border-radius: 50px;">
                Open in Directus Admin →
              </a>
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
  const trackingUrl =
    order.tracking_url ||
    `https://www.bluedart.com/tracking?track=${order.tracking_number}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Anayas Parcel Has Dispatched!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF8F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E3DB; overflow: hidden;">
          <tr>
            <td style="padding: 32px 40px; background-color: #F3EFEA; border-bottom: 1px solid #E9E3DB; text-align: center;">
              <p style="margin: 0; font-family: 'Times New Roman', Georgia, serif; font-size: 26px; letter-spacing: 0.28em; color: #1C1917; font-weight: 600;">ANAYAS</p>
              <p style="margin: 4px 0 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #78716C;">Artisanal Heirlooms Dispatched</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 40px;">
              <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #2D4F3E; font-weight: 700; display: block; margin-bottom: 8px;">Shipped via ${order.courier_name}</span>
              <h1 style="margin: 0 0 16px; font-family: 'Times New Roman', Georgia, serif; font-size: 24px; color: #1C1917;">Your Anayas parcel has been shipped via ${order.courier_name}!</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #78716C; line-height: 1.6;">
                Track your package here: <a href="${trackingUrl}" style="color: #C5A059; font-weight: 600; text-decoration: underline;">${trackingUrl}</a> (Waybill: <strong>${order.tracking_number || "BLUEDART-EXP-9821"}</strong>).
              </p>

              <div style="background-color: #FAF8F5; border: 1px solid #E9E3DB; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #78716C; letter-spacing: 0.1em;">Shipment Details</p>
                <p style="margin: 0; font-size: 14px; color: #1C1917;"><strong>Order Number:</strong> ${order.order_number}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #1C1917;"><strong>Carrier:</strong> ${order.courier_name} Express Insured</p>
                <p style="margin: 4px 0; font-size: 14px; color: #1C1917;"><strong>Waybill / AWB:</strong> ${order.tracking_number || "Pending generation"}</p>
              </div>

              <div style="text-align: center;">
                <a href="${trackingUrl}" target="_blank" style="display: inline-block; background-color: #C5A059; color: #1C1917; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; padding: 16px 36px; border-radius: 50px;">
                  Track Live Shipment →
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px; background-color: #FAF8F5; border-top: 1px solid #E9E3DB; text-align: center; font-size: 12px; color: #78716C;">
              Please ensure an adult is present to receive the insured parcel upon OTP confirmation.
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

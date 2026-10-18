"use client";

import React, { useState } from "react";
import { Card, Stack, Button, Text, Flex, Badge } from "@sanity/ui";
import { useFormValue } from "sanity";

export function DispatchOrderField() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const rawId = useFormValue(["_id"]) as string | undefined;
  const orderNumber = useFormValue(["orderNumber"]) as string | undefined;
  const customerName = useFormValue(["customerName"]) as string | undefined;
  const customerEmail = useFormValue(["customerEmail"]) as string | undefined;
  const customerPhone = useFormValue(["customerPhone"]) as string | undefined;
  const courierName =
    (useFormValue(["courierName"]) as string | undefined) || "BlueDart";
  const trackingNumber = useFormValue(["trackingNumber"]) as string | undefined;
  const trackingUrl = useFormValue(["trackingUrl"]) as string | undefined;
  const trackingEmailSent = useFormValue(["trackingEmailSent"]) as
    | boolean
    | undefined;
  const dispatchedAt = useFormValue(["dispatchedAt"]) as string | undefined;

  const handleDispatch = async () => {
    const cleanTracking = trackingNumber?.trim();
    if (!cleanTracking) {
      alert(
        "⚠️ Please enter the Courier Tracking Number / Waybill above before dispatching."
      );
      return;
    }

    if (!customerEmail) {
      alert("⚠️ No customer email found on this order document.");
      return;
    }

    const confirmSend = window.confirm(
      `Dispatch Order #${orderNumber || rawId}?\n\nThis will send the ${courierName} tracking link (${cleanTracking}) to ${customerEmail} and mark the order as Dispatched.`
    );
    if (!confirmSend) return;

    setLoading(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const res = await fetch("/api/webhooks/sanity-dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: rawId,
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          courierName,
          trackingNumber: cleanTracking,
          trackingUrl:
            trackingUrl ||
            `https://www.bluedart.com/tracking?track=${encodeURIComponent(
              cleanTracking
            )}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsError(false);
        setStatusMessage(
          `✓ Order Dispatched! Tracking notification email delivered to ${customerEmail} via ${courierName}.`
        );
      } else {
        setIsError(true);
        setStatusMessage(
          `Notice: ${data.error || "Could not complete dispatch request."}`
        );
      }
    } catch (err: unknown) {
      setIsError(true);
      setStatusMessage(
        err instanceof Error ? err.message : "Failed to trigger dispatch webhook."
      );
    } finally {
      setLoading(false);
    }
  };

  const isSent = Boolean(trackingEmailSent);
  const hasTracking = Boolean(trackingNumber?.trim());

  return (
    <Card
      padding={4}
      radius={3}
      border
      tone={isSent ? "positive" : hasTracking ? "primary" : "default"}
      style={{
        backgroundColor: isSent ? "#F4F9F5" : hasTracking ? "#FFFDF9" : "#FAFAFA",
        borderColor: isSent ? "#2D4F3E" : hasTracking ? "#C5A059" : "#E9E3DB",
      }}
    >
      <Stack gap={3}>
        <Flex justify="space-between" align="center">
          <Text weight="bold" size={1} style={{ color: "#1C1917" }}>
            {isSent
              ? "✓ Order Dispatched & Customer Notified"
              : "Fulfillment & Customer Email Action"}
          </Text>
          {isSent && (
            <Badge tone="positive" fontSize={1} padding={2}>
              Dispatched via {courierName}
            </Badge>
          )}
        </Flex>

        <Text size={1} muted style={{ color: "#78716C", lineHeight: 1.5 }}>
          {isSent
            ? `Tracking email was dispatched to ${customerEmail || "customer"} on ${
                dispatchedAt ? new Date(dispatchedAt).toLocaleString() : "record"
              }. You can re-send if the customer requires a reminder.`
            : hasTracking
            ? `Tracking AWB "${trackingNumber}" is ready. Click below to notify the customer and mark this order as Dispatched.`
            : "Paste the BlueDart or courier tracking number in the field above to enable the dispatch notification button."}
        </Text>

        <Button
          tone={isSent ? "default" : "primary"}
          mode={isSent ? "ghost" : "default"}
          onClick={handleDispatch}
          loading={loading}
          disabled={!hasTracking || loading}
          text={
            loading
              ? "Sending Email & Updating Sanity..."
              : isSent
              ? `↻ Resend Tracking Email (${courierName})`
              : `🚀 Dispatch & Send Tracking Email to Customer`
          }
          style={{ cursor: hasTracking ? "pointer" : "not-allowed" }}
        />

        {statusMessage && (
          <Text
            size={1}
            weight="semibold"
            style={{ color: isError ? "#B91C1C" : "#2D4F3E" }}
          >
            {statusMessage}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

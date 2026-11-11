"use client";

import React, { useState } from "react";
import { ObjectInputProps, useClient, useFormValue } from "sanity";
import { usePaneRouter } from "sanity/structure";
import { Box, Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { useToast } from "@sanity/ui/toast";
import { Trash2, AlertTriangle } from "lucide-react";

/**
 * Custom root form wrapper for Sanity "product" documents.
 * Preserves all standard schema fields and adds an unmistakable,
 * confirmation-protected "Delete Product" control so editors can delete
 * published items OR accidental empty/draft products in two clicks.
 */
export function ProductFormInput(props: ObjectInputProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const rawId = useFormValue(["_id"]) as string | undefined;
  const title = useFormValue(["title"]) as string | undefined;
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();
  const paneRouter = usePaneRouter();

  // Only wrap the root document form, not nested objects if any exist
  if (props.id !== "root") {
    return props.renderDefault(props);
  }

  const handleDelete = async () => {
    if (!rawId) {
      paneRouter?.closeCurrent?.();
      return;
    }

    const publishedId = rawId.replace(/^drafts\./, "");
    const draftId = `drafts.${publishedId}`;

    setDeleting(true);
    setErrorText(null);
    try {
      await client
        .transaction()
        .delete(publishedId)
        .delete(draftId)
        .commit();

      toast.push({
        status: "success",
        title: "Product deleted",
        description: title
          ? `"${title}" was permanently removed.`
          : "The draft product was permanently removed.",
      });

      setConfirming(false);
      paneRouter?.closeCurrent?.();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Please check your permissions or use the '...' menu next to Publish.";
      setErrorText(msg);
      toast.push({
        status: "error",
        title: "Could not delete product",
        description: msg,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack gap={5}>
      {props.renderDefault(props)}

      {/* Visible Delete Product Danger Zone */}
      <Box marginTop={3} paddingTop={2}>
        <Card
          padding={4}
          radius={3}
          border
          tone="critical"
          style={{
            backgroundColor: "#FFF5F5",
            borderColor: "#FECACA",
          }}
        >
          <Stack gap={3}>
            <Flex align="center" justify="space-between" gap={3} wrap="wrap">
              <Stack gap={2} flex={1}>
                <Flex align="center" gap={2}>
                  <Trash2 className="w-4 h-4" style={{ color: "#B91C1C" }} />
                  <Text size={1} weight="bold" style={{ color: "#991B1B" }}>
                    Delete This Product
                  </Text>
                </Flex>
                <Text size={1} muted style={{ color: "#7F1D1D", lineHeight: 1.5 }}>
                  Permanently remove{" "}
                  <strong>{title?.trim() ? `"${title}"` : "this untitled / draft product"}</strong>{" "}
                  from Sanity Studio and your live store.
                </Text>
              </Stack>

              {!confirming && (
                <Button
                  type="button"
                  tone="critical"
                  mode="ghost"
                  text="Delete Product"
                  onClick={() => {
                    setErrorText(null);
                    setConfirming(true);
                  }}
                  disabled={deleting}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Flex>

            {errorText && (
              <Text size={1} style={{ color: "#B91C1C" }}>
                Error: {errorText}
              </Text>
            )}

            {confirming && (
              <Card
                padding={3}
                radius={2}
                border
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FCA5A5",
                }}
              >
                <Stack gap={3}>
                  <Flex align="center" gap={2}>
                    <AlertTriangle
                      className="w-4 h-4 shrink-0"
                      style={{ color: "#B91C1C" }}
                    />
                    <Text size={1} weight="semibold" style={{ color: "#7F1D1D" }}>
                      Are you sure? This will delete both the live product and any drafts permanently.
                    </Text>
                  </Flex>
                  <Flex gap={2} justify="flex-end">
                    <Button
                      type="button"
                      mode="ghost"
                      text="Cancel"
                      onClick={() => setConfirming(false)}
                      disabled={deleting}
                      style={{ cursor: "pointer" }}
                    />
                    <Button
                      type="button"
                      tone="critical"
                      text={deleting ? "Deleting..." : "Yes, Permanently Delete"}
                      onClick={handleDelete}
                      disabled={deleting}
                      loading={deleting}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Stack>
              </Card>
            )}
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
}

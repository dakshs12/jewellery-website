"use client";

import React from "react";
import { Card, Stack, Text, Flex, Badge, Box } from "@sanity/ui";

export function WebsitePhotosBanner() {
  return (
    <Card
      padding={4}
      radius={3}
      tone="caution"
      border
      style={{
        backgroundColor: "#FFFBF2",
        borderColor: "#EAD5BE",
        marginBottom: "16px",
      }}
    >
      <Stack gap={3}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <Text size={2} weight="bold" style={{ color: "#78350F" }}>
              📸 Website Media & Banners Console
            </Text>
            <Badge tone="primary" fontSize={1} padding={2}>
              Draft Protected
            </Badge>
          </Flex>
          <Badge tone="positive" fontSize={1} padding={2}>
            Requires Confirmation
          </Badge>
        </Flex>

        <Text size={1} style={{ color: "#92400E", lineHeight: 1.6 }}>
          <strong>🔒 Safe Editing Mode:</strong> Whenever you upload or change an image here, Sanity automatically saves it as a <em>private Draft</em>. It will <strong>NOT</strong> appear on your live website until you confirm and click the green <strong>"Publish"</strong> button in the bottom-right corner of your screen.
        </Text>

        <Card padding={3} radius={2} tone="default" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F3EFEA" }}>
          <Stack gap={2}>
            <Text size={1} weight="bold" style={{ color: "#1C1917" }}>
              📐 Photo Dimensions Cheat-Sheet:
            </Text>
            <Box paddingLeft={2}>
              <Stack gap={1}>
                <Text size={1} style={{ color: "#57534E" }}>
                  • <strong>Hero Section Photo:</strong> 1200 × 1600 px (3:4 vertical portrait ratio). Minimum 900px wide. Under 2MB.
                </Text>
                <Text size={1} style={{ color: "#57534E" }}>
                  • <strong>Category Photos (All 7):</strong> 1000 × 1400 px (5:7 or 3:4 vertical portrait). Under 2MB each.
                </Text>
                <Text size={1} style={{ color: "#57534E" }}>
                  • <strong>Recommended File Types:</strong> JPG or WebP (PNG is also supported).
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Card>

        <Text size={1} style={{ color: "#78350F" }}>
          💡 <em>Tip: Use the image crop/hotspot tool by clicking on any uploaded image to ensure faces and focal jewellery pieces remain perfectly centered across both desktop and mobile viewports.</em>
        </Text>
      </Stack>
    </Card>
  );
}

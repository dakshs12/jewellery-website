import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = client.config().projectId
  ? createImageUrlBuilder(client)
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  if (!builder || !source) return "";
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return "";
  }
}

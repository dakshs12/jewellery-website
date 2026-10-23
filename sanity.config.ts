import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { SendTrackingEmailAction } from "./src/sanity/actions/sendTrackingEmailAction";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "anayas-jewels-studio",
  title: "Anayas Jewels — Admin Console",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Jewellery Products")
              .schemaType("product")
              .child(S.documentTypeList("product").title("Jewellery Products")),
            S.listItem()
              .title("Customer Orders & Dispatch")
              .schemaType("order")
              .child(S.documentTypeList("order").title("Customer Orders & Dispatch")),
            S.divider(),
            S.listItem()
              .title("Website Photos")
              .id("websitePhotos")
              .schemaType("websitePhotos")
              .child(
                S.document()
                  .schemaType("websitePhotos")
                  .documentId("websitePhotos")
                  .title("Website Photos")
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "order") {
        return [SendTrackingEmailAction, ...prev];
      }
      if (context.schemaType === "websitePhotos") {
        // For singleton Website Photos: retain Publish and Discard; filter out duplicate, delete, and unpublish
        return prev.filter(
          (action) =>
            action.action !== "duplicate" &&
            action.action !== "delete" &&
            action.action !== "unpublish"
        );
      }
      return prev;
    },
  },
});

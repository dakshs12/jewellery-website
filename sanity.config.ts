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
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "order") {
        return [SendTrackingEmailAction, ...prev];
      }
      return prev;
    },
  },
});

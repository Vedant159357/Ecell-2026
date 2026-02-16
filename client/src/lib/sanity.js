import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your_project_id",
    dataset: import.meta.env.VITE_SANITY_DATASET || "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2024-03-21", // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

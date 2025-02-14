import { Hono } from "hono";

import { unsplash } from "@/lib/unsplash";
import { verifyAuth } from "@hono/auth-js";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono().get("/", verifyAuth(), async (context) => {
  const images = await unsplash.photos.getRandom({
    collectionIds: DEFAULT_COLLECTION_IDS,
    count: DEFAULT_COUNT,
  });

  if (images.errors) {
    return context.json({ error: "Something went wrong" }, 400);
  }

  let response = images.response;

  if (!Array.isArray(response)) {
    response = [response];
  }

  return context.json({ data: response });
});

export default app;

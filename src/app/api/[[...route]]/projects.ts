import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    projectsInsertSchema.pick({
      name: true,
      json: true,
      width: true,
      height: true,
    }),
  ),
  async (context) => {
    const auth = context.get("authUser");
    const { name, json, height, width } = context.req.valid("json");

    if (!auth.token?.id) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .insert(projects)
      .values({
        name,
        json,
        height,
        width,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!data[0]) {
      return context.json({ error: "Something went wrong" }, 400);
    }

    return context.json({ data: data[0] });
  },
);

export default app;

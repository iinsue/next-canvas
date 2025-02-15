import { z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";

const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (context) => {
      const { page, limit } = context.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPro), desc(projects.updatedAt));

      return context.json({ data });
    },
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (context) => {
      const auth = context.get("authUser");
      const { id } = context.req.valid("param");

      if (!auth.token?.id) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data?.length === 0) {
        return context.json({ error: "Not found" }, 404);
      }

      return context.json({ data: data[0] });
    },
  )
  .post(
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
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial(),
    ),
    async (context) => {
      const auth = context.get("authUser");
      const { id } = context.req.valid("param");
      const values = context.req.valid("json");

      if (!auth.token?.id) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      return context.json({ data: data[0] });
    },
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (context) => {
      const auth = context.get("authUser");
      const { page, limit } = context.req.valid("query");

      if (!auth.token?.id) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return context.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (context) => {
      const auth = context.get("authUser");
      const { id } = context.req.valid("param");

      if (!auth.token?.id) {
        return context.json({ error: "Unauthorized" });
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data.length === 0) {
        return context.json({ error: "Not found" }, 404);
      }

      const project = data[0];

      const duplicateData = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return context.json({ data: duplicateData[0] });
    },
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (context) => {
      const auth = context.get("authUser");
      const { id } = context.req.valid("param");

      if (!auth.token?.id) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return context.json({ error: "Not found" }, 404);
      }

      return context.json({ data: { id } });
    },
  );
export default app;

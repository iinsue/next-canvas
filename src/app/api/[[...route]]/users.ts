import { z } from "zod";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(3).max(20),
    }),
  ),
  async (context) => {
    const { name, email, password } = context.req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    // 이메일 중복 체크
    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return context.json({ error: "Email already in use" }, 400);
    }

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    return context.json(null, 200);
  },
);

export default app;

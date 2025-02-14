import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";

import authConfig from "@/auth.config";

import ai from "./ai";
import users from "./users";
import images from "./images";
import projects from "./projects";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

function getAuthConfig(context: Context): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users)
  .route("/projects", projects);

// 기존 API를 덮어씁니다.
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

import { Hono } from "hono";
import { handle } from "hono/vercel";

import ai from "./ai";
import images from "./images";

// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app.route("/ai", ai).route("/images", images);

// 기존 API를 덮어씁니다.
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

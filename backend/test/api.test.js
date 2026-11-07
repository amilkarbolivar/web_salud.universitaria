import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health responde ok", async () => {
  const res = await request(app).get("/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
});

test("POST /api/v1/auth/register valida campos", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({});
  assert.equal(res.status, 422);
});
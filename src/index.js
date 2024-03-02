const serverless = require("serverless-http");
const express = require("express");
const { neon } = require("@neondatabase/serverless");
const { getDatabaseUrl } = require("./lib/secrets");

const app = express();

const DATABASE_URL_SSM_PARAM = "/serverless-nodejs-api/prod/database-url";

const dbClient = async () => {};

app.get("/", async (req, res, next) => {
  const sql = await getDatabaseUrl();
  // const [result] = await sql`select now()`;
  return res.status(200).json({
    message: "Hello from root!",
    result: sql,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app, {
  callbackWaitsForEmptyEventLoop: false,
});

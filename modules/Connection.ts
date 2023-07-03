import { load } from "https://deno.land/std@0.192.0/dotenv/mod.ts";

const env = await load();

import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

export const client = await new Client().connect({
  hostname: env["hostname"],
  username: env["username"],
  password: env["password"],
  db: env["db"],
  port: parseInt(env["port"]),
});


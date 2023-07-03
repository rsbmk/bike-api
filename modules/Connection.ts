import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

export const client = await new Client().connect({
  hostname: Deno.env.get("hostname"),
  username: Deno.env.get("username"),
  password: Deno.env.get("password"),
  db: Deno.env.get("db"),
  port: parseInt(Deno.env.get("port") || "3306"),
});


import "https://deno.land/std@0.192.0/dotenv/load.ts"; // upload envs
import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";


import { bikeRouter } from "./modules/Bikes/infrastructure/bike.controller.ts";
import { rentrouter } from "./modules/Rent/infrastructure/rent.controller.ts";
import { userRouter } from './modules/Users/infrastructure/user.controller.ts';
import { UpdateStatusBikeCron } from "./modules/corn/UpdateStatusBikes.ts";

const app = new Application();
UpdateStatusBikeCron.init();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(bikeRouter.routes());
app.use(bikeRouter.allowedMethods());

app.use(rentrouter.routes());
app.use(rentrouter.allowedMethods());

// deno run -A https://deno.land/x/denon/denon.ts run -A main.ts 

const port = Deno.env.get("PORT") || 3000;

console.log("Server running on port 3000");
await app.listen({ port: +port })


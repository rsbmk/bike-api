import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import { CreateBike } from "../application/createBike.ts";
import { BikeRepository } from "./BikeRepository.ts";

export const bikeRouter = new Router({ prefix: "/bikes" });
const bikeRepository = new BikeRepository();

bikeRouter.get("/", async ({ response }) => {
  response.body = await bikeRepository.findAll();
});

bikeRouter.post("/", async ({ request, response }) => {
  const { value } = request.body();
  const { model, price } = await value;

  try {
    const createBike = new CreateBike(bikeRepository);
    const bike = await createBike.save({ model, price });

    response.status = 201;
    response.body = bike;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

bikeRouter.get("/:id", async ({ params, response }) => {
  const { id } = params;

  const bike = await bikeRepository.findOne(id);

  if (!bike) {
    response.status = 404;
    response.body = { message: "Bike not found" };
    return;
  }

  response.body = bike;
});

// TODO: create a application service of update status bike
bikeRouter.put("/:id/status", async ({ params, request, response }) => {
  const { id } = params;
  const { value } = request.body();
  const { status_bike } = await value;

  try {
    response.body = await bikeRepository.updateStatus(id, status_bike);
    response.status = 200;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

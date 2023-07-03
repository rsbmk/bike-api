import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import { BikeRepository } from "../../Bikes/infrastructure/BikeRepository.ts";
import { UserRepository } from "../../Users/infrastructure/UserRepository.ts";
import { RentBike } from "../application/rentBike.ts";
import { RentRepository } from "./rentRespository.ts";

export const rentrouter = new Router({ prefix: "/rent" });

rentrouter.post("/", async ({ request, response }) => {
  const { value } = request.body();
  const { userId, bikeId, startAt, endAt } = await value;

  try {
    const rent = new RentBike(
      { bikeId, userId },
      { startAt, endAt },
      new RentRepository(),
      new UserRepository(),
      new BikeRepository()
    );

    response.body = await rent.save();
    response.status = 201;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

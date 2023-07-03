import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import { UpdateBalance } from "../application/updateBalance.ts";
import { User } from "../domain/user.ts";
import { UserRepository } from "./UserRepository.ts";

export const userRouter = new Router({ prefix: "/users" });
const userRepository = new UserRepository();

userRouter.get("/", async ({ response }) => {
  try {
    response.body = await userRepository.findAll();
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

userRouter.post("/", async ({ request, response }) => {
  const { value } = request.body();

  const { name, email } = await value;

  try {
    const user = new User({ name, email });
    const userCreated = await userRepository.save(user);

    response.body = userCreated;
    response.status = 201;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

userRouter.get("/:id", async ({ params, response }) => {
  const { id } = params;

  try {
    const user = await userRepository.findOne(id);

    if (!user) {
      response.status = 404;
      response.body = { message: "User not found" };
      return;
    }

    response.body = user;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

userRouter.post("/:id/balance", async ({ params, request, response }) => {
  const { id } = params;
  const { value } = request.body();
  const { amount } = await value;

  try {
    const updateBalance = new UpdateBalance(userRepository);
    response.body = await updateBalance.update(id, amount);
    response.status = 201;
  } catch (error) {
    response.status = 400;
    response.body = { message: error.message };
  }
});

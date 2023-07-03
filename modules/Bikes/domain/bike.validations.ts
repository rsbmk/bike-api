import { Validations } from "../../share/domain/validations.ts";

export class BikeValidations extends Validations {
  static validBikeModel(name: string) {
    if (typeof name !== "string") throw new Error("Model is not a string");
    if (name.length <= 3) throw new Error("Model is not a valid string");
  }

  static validBikePrice(price: number) {
    if (typeof price !== "number") throw new Error("Price is not a number");
    if (price <= 0) throw new Error("Price is not a positive number");
  }
}

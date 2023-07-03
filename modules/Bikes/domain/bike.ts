import { IBike, STATUS_BIKE } from "./bike.types.ts";
import { BikeValidations } from "./bike.validations.ts";

export class Bike implements IBike {
  id: string;
  model: string;
  price: number;
  status_bike: STATUS_BIKE;

  constructor({ model, price, status_bike, id }: IBike) {
    BikeValidations.validBikeModel(model);
    BikeValidations.validBikePrice(price);

    this.id = id ?? crypto.randomUUID();
    this.model = model;
    this.price = price;
    this.status_bike = status_bike ?? STATUS_BIKE.AVALIABLE;
  }

  isUnavaliable() {
    return this.status_bike === STATUS_BIKE.UNAVALIABLE;
  }

  changeStatus(status: STATUS_BIKE) {
    this.status_bike = status;
  }
}

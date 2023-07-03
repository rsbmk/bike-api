import { Bike } from "../../Bikes/domain/bike.ts";
import { STATUS_BIKE } from "../../Bikes/domain/bike.types.ts";
import { User } from "../../Users/domain/user.ts";

import { RentDates } from "./rent.type.d.ts";
import { RentValidation } from "./rent.validation.ts";

export const DATE_FORMAT = "yyyy-dd-MM HH:mm:ss.SSS"

export class Rent {
  id?: number;
  userId: string;
  bikeId: string;
  startAt: string;
  endAt: string;
  updatedAt?: string;

  constructor(
    private readonly bike: Bike,
    private readonly user: User,
    { startAt, endAt }: RentDates
  ) {
    RentValidation.validateEndAt(endAt);
    startAt && RentValidation.isVaildDate(startAt);

    this.userId = user.id;
    this.bikeId = bike.id;
    this.startAt = startAt ?? new Date().toISOString();
    this.endAt = endAt;
  }

  userBike() {
    if (this.bike.isUnavaliable()) {
      throw new Error("Bike is not avaliable");
    }

    this.user.removeBalance(this.bike.price);
    this.bike.changeStatus(STATUS_BIKE.UNAVALIABLE);

    return {
      user: this.user,
      bike: this.bike,
    };
  }
}

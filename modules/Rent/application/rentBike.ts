import { format } from "https://deno.land/std@0.192.0/datetime/format.ts";

import { Bike } from "../../Bikes/domain/bike.ts";
import { IBikeRepository } from "../../Bikes/domain/bike.types.ts";
import { User } from "../../Users/domain/user.ts";
import { IUserRepository } from "../../Users/domain/user.types.d.ts";
import { DATE_FORMAT, Rent } from "../domain/rent.ts";
import { IRentRepository, RentDates } from "../domain/rent.type.d.ts";
import { RentValidation } from "../domain/rent.validation.ts";

export interface IRentBikeParams {
  userId: string;
  bikeId: string;
}

export class RentBike {
  private userId: string;
  private bikeId: string;
  private rentDates: RentDates;

  constructor(
    params: IRentBikeParams,
    rentDates: RentDates,
    private readonly rentRepository: IRentRepository,
    private readonly userRepository: IUserRepository,
    private readonly bikeRepository: IBikeRepository
  ) {

    RentValidation.validUUID(params.userId, `Invalid user id: ${params.userId}`)
    RentValidation.validUUID(params.bikeId, `Invalid bike id: ${params.bikeId}`)
    RentValidation.validateEndAt(rentDates.endAt, `Invalid end date: ${rentDates.endAt}. Must be a iso string date`)
    rentDates?.startAt && RentValidation.isVaildDate(rentDates.startAt, `Invalid start date: ${rentDates.startAt}. Must be a iso string date`)

    const startAt = rentDates?.startAt ? new Date(rentDates.startAt) : new Date();

    this.userId = params.userId;
    this.bikeId = params.bikeId;
    this.rentDates = {
      endAt: format(new Date(rentDates.endAt), DATE_FORMAT),
      startAt: format(startAt, DATE_FORMAT),
    };
  }

  async save() {
    const bikeFound = await this.getBike(this.bikeId);
    const userFound = await this.getUser(this.userId);
    const rent = new Rent(bikeFound, userFound, this.rentDates);

    const { bike, user } = rent.userBike();

    const [_, updatedUser, updatedBike] = await Promise.all([
      this.rentRepository.saveRent(user, bike, rent),
      this.userRepository.updateBalance(user.id, user.balance),
      this.bikeRepository.updateStatus(bike.id, bike.status_bike),
    ]);

    return { updatedUser, updatedBike }
  }

  private async getUser(userId: string) {
    const userFound = await this.userRepository.findOne(userId);

    if (!userFound) {
      throw new Error("User not found");
    }

    return new User({
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      balance: userFound.balance,
    });
  }

  private async getBike(bikeId: string) {
    const bikeFound = await this.bikeRepository.findOne(bikeId);

    if (!bikeFound) {
      throw new Error("Bike not found");
    }

    const bike =  new Bike({
      model: bikeFound.model,
      price: bikeFound.price,
      id: bikeFound.id,
      status_bike: bikeFound.status_bike,
    });

    if (bike.isUnavaliable()) {
      throw new Error("Bike is unavaliable");
    }
    
    return bike;
  }
}
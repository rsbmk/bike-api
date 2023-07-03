import { Bike } from "../../Bikes/domain/bike.ts";
import { User } from "../../Users/domain/user.ts";
import { Rent } from "./rent.ts";

export type DBRent = {
  id: number;
  userId: string;
  bikeId: string;
  status: 1 | 0;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt?: string;
};

export interface IRentRepository {
  saveRent(user: User, bike: Bike, rent: Rent): Promise<DBRent>;
  findOne(userId: string, bikeId: string, endAt: string): Promise<DBRent | undefined>;
  getAllExpiredRents(): Promise<DBRent[]>;
  updateStatusExpiredRents(id: number): Promise<void>;
}

export type RentDates = {
  startAt?: string;
  endAt: string;
};

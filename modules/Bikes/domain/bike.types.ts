import { Bike } from "./bike.ts";

export type DBBike = {
  id: string;
  model: string;
  price: number;
  status: 1 | 0;
  status_bike: STATUS_BIKE;
  createdAt: Date;
  updatedAt: Date;
};

export type IBikeRepository = {
  save(bike: Bike): Promise<DBBike>;
  findOne(id: string): Promise<DBBike | undefined>;
  findAll(): Promise<DBBike[]>;
  update(id: string, bike: Bike): Promise<DBBike>;
  updateStatus(id: string, status: STATUS_BIKE): Promise<DBBike>;
};

export type IBike = {
  id?: string;
  model: string;
  price: number;
  status_bike?: STATUS_BIKE;
};

export const enum STATUS_BIKE {
  AVALIABLE = "AVAILABLE",
  UNAVALIABLE = "UNAVAILABLE",
  MAINTENANCE = "MAINTENANCE",
}
import { User } from "./user.ts";

export interface DBUser {
  id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

type IUser = {
  id?: string;
  name: string;
  email: string;
  balance?: number;
}

export interface IUserRepository {
  save(user: User): Promise<DBUser>;
  findOne(id: string): Promise<DBUser | undefined>;
  findAll(): Promise<DBUser[]>;
  update(user: User): Promise<DBUser>;
  updateBalance(id: string, amount: number): Promise<DBUser>;
}

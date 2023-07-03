import { IUser } from "./user.types.d.ts";
import { validBalance, validateEmail, validateName } from "./validation.user.ts";

export class User {
  id: string;
  name: string;
  email: string;
  balance = 0;

  constructor({ name, email, balance, id }: IUser) {
    validateName(name);
    validateEmail(email);
    balance !== undefined && validBalance(balance);

    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.balance = balance ?? 0;
  }

  addBalance(amount: number) {
    if (amount <= 0) throw new Error("Amount must be a positive number");
    if (isNaN(amount)) throw new Error("Amount must be a number");
    this.balance += amount;
  }

  removeBalance(amount: number) {
    if (this.balance < amount) throw new Error("Insufficient balance");
    if (amount <= 0) throw new Error("Amount must be a positive number");
    if (isNaN(amount)) throw new Error("Amount must be a number");

    this.balance -= amount;
  }
}

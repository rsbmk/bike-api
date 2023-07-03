import { User } from "../domain/user.ts";
import { DBUser, IUserRepository } from "../domain/user.types.d.ts";

export class UpdateBalance {
  constructor(private readonly userRepository: IUserRepository) {}

  async update(id: string, amount: number) {
    const userFound = await this.userRepository.findOne(id);
    if (!userFound) {
      throw new Error("User not found");
    }

    const user = this.addUserBalance(userFound, amount);
    return this.userRepository.updateBalance(user.id, user.balance);
  }

  private addUserBalance(userFound: DBUser, amount: number) {
     const user = new User({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      balance: userFound.balance,
    });

    user.addBalance(amount);

    return user;
  }
}

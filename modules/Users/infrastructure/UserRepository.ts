import { client } from "../../Connection.ts";
import type { User } from "../domain/user.ts";
import { DBUser, IUserRepository } from "../domain/user.types.d.ts";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<DBUser> {
    await client.query(`
      INSERT INTO User (id, name, email) 
      VALUES ('${user.id}', '${user.name}', '${user.email}');
      `);

    return await this.findOne(user.id) as DBUser;
  }

  async update(user: User) {
    await client.query(`
      UPDATE User 
      SET name = '${user.name}', email = '${user.email}', balance = '${user.balance}', updatedAt = NOW()
      WHERE id = '${user.id}' and status = 1;
    `);

    return await this.findOne(user.id) as DBUser;
  }

  async updateBalance(id: string, amount: number) {
    await client.query(`
      UPDATE User 
      SET balance = ${amount}, updatedAt = NOW()
      WHERE id = '${id}' and status = 1;
    `);

    return await this.findOne(id) as DBUser;
  }

  async findOne(id: string): Promise<DBUser | undefined> {
    const user = await client.query(`SELECT * FROM User WHERE id = '${id}' and status = 1`);
    return user[0];
  }

  async findAll(): Promise<DBUser[]> {
    return await client.query(`SELECT * FROM User WHERE status = 1`);
  }
}

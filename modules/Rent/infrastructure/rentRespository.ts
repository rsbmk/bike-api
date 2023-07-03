import { client } from "../../Connection.ts";

import { Bike } from "../../Bikes/domain/bike.ts";
import { User } from "../../Users/domain/user.ts";
import { Rent } from "../domain/rent.ts";
import { DBRent, IRentRepository } from "../domain/rent.type.d.ts";

export class RentRepository implements IRentRepository {
  async saveRent(user: User, bike: Bike, rent: Rent): Promise<DBRent> {
    await client.query(`
      INSERT INTO Rent (userId, bikeId, startAt, endAt)
      VALUES ('${user.id}', '${bike.id}', '${rent.startAt}', '${rent.endAt}');
    `);

    return (await this.findOne(user.id, bike.id, rent.endAt)) as DBRent;
  }

  findOne(userId: string, bikeId: string, endAt: string): Promise<DBRent | undefined> {
    return client.query(`
      SELECT * 
      FROM Rent 
      WHERE userId = '${userId}' and bikeId = '${bikeId}' and endAt = '${endAt}' and status = 1
    `);
  }

  getAllExpiredRents(): Promise<DBRent[]> {
    return client.query(`
      SELECT * 
      FROM Rent 
      WHERE endAt < NOW() and status = 1
    `);
  }

  updateStatusExpiredRents(id: number): Promise<void> {
    return client.query(`
      UPDATE Rent
      SET status = 0, updatedAt = NOW()
      WHERE id = '${id}' and status = 1;
    `);
  }
}

import { client } from "../../Connection.ts";

import { Bike } from "../domain/bike.ts";
import { DBBike, IBikeRepository, STATUS_BIKE } from "../domain/bike.types.ts";

export class BikeRepository implements IBikeRepository {
  async save(bike: Bike): Promise<DBBike> {
    await client.query(`
      INSERT INTO Bike (id, model, price)
      VALUES ('${bike.id}', '${bike.model}', '${bike.price}');
    `);

    return await this.findOne(bike.id) as DBBike;
  }

  async update(id: string, bike: Bike): Promise<DBBike> {
    await client.query(`
      UPDATE Bike
      SET model = '${bike.model}', price = '${bike.price}', updatedAt = NOW()
      WHERE id = '${id}' and status = 1;
    `);

    return await this.findOne(id) as DBBike;
  }

  async findAll(): Promise<DBBike[]> {
    return await client.query(`SELECT * FROM Bike WHERE status = 1`);
  }

  async findOne(id: string): Promise<DBBike | undefined> {
    const bike = await client.query(`SELECT * FROM Bike WHERE id = '${id}' and status = 1`);
    return bike[0];
  }

  async updateStatus(id: string, status: STATUS_BIKE): Promise<DBBike> {
    await client.query(`
      UPDATE Bike
      SET status_bike = '${status}', updatedAt = NOW()
      WHERE id = '${id}' and status = 1;
    `);

    return await this.findOne(id) as DBBike;
  }
}

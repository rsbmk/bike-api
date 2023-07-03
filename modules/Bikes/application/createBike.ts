import { Bike } from "../domain/bike.ts";
import { IBikeRepository } from "../domain/bike.types.ts";

type CreateBikeDTO = {
  model: string;
  price: number;
};

export class CreateBike {
  constructor(private readonly bikeRepository: IBikeRepository) {}

  async save({ model, price }: CreateBikeDTO) {
    const bike = new Bike({ model, price });

    return await this.bikeRepository.save(bike);
  }
}

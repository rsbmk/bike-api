import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import { STATUS_BIKE } from "../Bikes/domain/bike.types.ts";
import { BikeRepository } from "../Bikes/infrastructure/BikeRepository.ts";
import { RentRepository } from "../Rent/infrastructure/rentRespository.ts";

const rentRepository = new RentRepository();
const bikeRepository = new BikeRepository();

export class UpdateStatusBikeCron {
  static init() {
    cron("1 */30 * * * *", async () => {
      const expiredRents = await rentRepository.getAllExpiredRents();
      console.log({ expiredRents });

      const updateStatusExpiredRents = expiredRents.map((rent) => {
        rentRepository.updateStatusExpiredRents(rent.id);
      });

      const updateStatusBikes = expiredRents.map((rent) => {
        console.log({ bikeId: rent.bikeId });
        bikeRepository.updateStatus(rent.bikeId, STATUS_BIKE.AVALIABLE);
      });

      try {
        await Promise.all([...updateStatusExpiredRents, ...updateStatusBikes]);
      } catch (error) {
        console.log("Error UpdateStatusBikeCron", error);
      }
    });
  }
}

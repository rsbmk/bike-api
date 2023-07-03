import { Validations } from "../../share/domain/validations.ts";

export class RentValidation extends Validations {
  static validateEndAt(endAt: Date | string, message?: string) {
    this.isVaildDate(endAt, message);

    if (typeof endAt === "string") {
      endAt = new Date(endAt);
    }
    
    if (endAt.getTime() < new Date().getTime()) {
      throw new Error("End date must be greater than current date");
    }
  }
}

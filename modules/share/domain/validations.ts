const regex = new RegExp("^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}.\\d{3}$", "i");

export class Validations {
  static isVaildDate(date: string | Date, message?: string) {
    if (typeof date === "string") {
      if (!regex.test(date)) {
        throw new Error(message ?? "Invalid date, must be a iso string date");
      }

      if (isNaN(new Date(date).getTime())) {
        throw new Error(message ?? "Invalid date");
      }
    }

    if (date instanceof Date && isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
  }

  static validUUID(uuid: string, message?: string) {
    const regex = new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
      "i"
    );

    if (!regex.test(uuid)) {
      throw new Error(message ?? "Invalid id");
    }
  }
}

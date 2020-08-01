import { Schema, model } from "mongoose";
import { IHourModel } from "../interfaces/IHour";

const documentName = "Hour";

const HourSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  start: Date,
  end: Date,
  timeZoneOffset: Number,
});

const Hour = model<IHourModel>(documentName, HourSchema);
export default Hour;

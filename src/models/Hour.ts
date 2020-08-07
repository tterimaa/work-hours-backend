import { Schema, model } from "mongoose";
import { IHourModel } from "../interfaces/IHour";

const documentName = "Hour";

const HourSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  startHour: {
    type: Number,
    required: true,
  },
  startMin: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
  endMin: {
    type: Number,
    required: true,
  },
});

const Hour = model<IHourModel>(documentName, HourSchema);
export default Hour;

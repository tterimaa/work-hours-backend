import { Schema, model, Document } from "mongoose";
import { IHour } from "../interfaces/IHour";

const documentName = "Hour";

const HourSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  start: Date,
  end: Date,
});

const Hour = model<IHour & Document>(documentName, HourSchema);
export default Hour;

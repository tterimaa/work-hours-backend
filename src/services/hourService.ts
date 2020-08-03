import Hour from "../models/Hour";
import { IHourInput } from "interfaces/IHour";

const add = async (hour: IHourInput, user: Express.User) => {
  const start = new Date(hour.start);
  const end = new Date(hour.end);
  const newHour = new Hour({
    employee: user._id,
    start: start,
    end: end,
    timeZoneOffset: hour.timeZoneOffset,
  });
  return newHour.save();
};

const getHours = async (user: Express.User) => {
  const hours = await Hour.findOne({ employee: user._id });
  return hours;
};

export default { add, getHours };

import Hour from "../models/Hour";
import { IHourInput } from "interfaces/IHour";

const add = async (hour: IHourInput, user: Express.User) => {
  const newHour = new Hour({
    employee: user._id,
    day: hour.day,
    month: hour.month,
    year: hour.year,
    startHour: hour.startHour,
    startMin: hour.startMin,
    endHour: hour.endHour,
    endMin: hour.endMin,
  });
  return newHour.save();
};

const getHours = async (user: Express.User) => {
  const hours = await Hour.findOne({ employee: user._id });
  return hours;
};

export default { add, getHours };

import Hour from "../models/Hour";
import { IHourInput } from "interfaces/IHour";
import User from "../models/User";

const add = async (hour: IHourInput) => {
  const employee = await User.findOne({ _id: hour.employeeId });
  if (employee == null) throw new Error("Employee by this id does not exist");
  const start = new Date(hour.start);
  const end = new Date(hour.end);
  const newHour = new Hour({
    employee: employee.id,
    start: start,
    end: end,
    timeZoneOffset: hour.timeZoneOffset,
  });
  return newHour.save();
};

export default { add };

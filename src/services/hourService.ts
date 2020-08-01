import Hour from "models/Hour";
import { IHour } from "interfaces/IHour";

const add = (hour: IHour) => {
  const newHour = new Hour({
    employee: hour.employee,
    start: hour.start,
    end: hour.end,
  });
  return newHour.save();
};

export { add };

import Hour from "../src/models/Hour";
import User from "../src/models/User";
import { Error } from "mongoose";
import dbHandler from "./db-handler";
import { IUser } from "../src/interfaces/IUser";

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const employee: IUser = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

describe("Test Hour model", () => {
  test("Validation should succeed with employee", () => {
    const user = new User(employee);
    const hour = new Hour({
      employee: user.id,
      day: 1,
      month: 1,
      year: 2020,
      startHour: 12,
      startMin: 0,
      endHour: 13,
      endMin: 30,
    });
    const promise = hour.save();
    expect(promise).resolves.toEqual(hour);
  });
  test("Validation should fail without employee", () => {
    const hour = new Hour({
      day: 1,
      month: 1,
      year: 2020,
      startHour: 12,
      startMin: 0,
      endHour: 13,
      endMin: 30,
    });
    const promise = hour.save();
    expect(promise).rejects.toThrowError(Error.ValidationError);
  });
});

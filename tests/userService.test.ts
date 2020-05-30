import userService from "../src/services/userService";
import { EmployeeUserDTO } from "types";
import dbHandler from "./db-handler";

const employee: EmployeeUserDTO = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

describe("loginService tests", () => {
  beforeAll(async () => await dbHandler.connect());

  afterEach(async () => await dbHandler.clearDatabase());

  afterAll(async () => await dbHandler.closeDatabase());

  test("asd", async () => {
    const newUser = await userService.addEmployee(employee);
    expect(newUser.email).toBeTruthy();
  });
});

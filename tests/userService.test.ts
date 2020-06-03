import userService from "../src/services/userService";
import { UserDTO } from "types";
import dbHandler from "./db-handler";

const employee: UserDTO = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("Registration", () => {
  test("Save valid user", async () => {
    const newUser = await userService.addUser(employee);
    expect(newUser.email).toBeTruthy();
    expect(newUser.role).toBeTruthy();
    expect(newUser.firstname).toBeTruthy();
    expect(newUser.lastname).toBeTruthy();
    expect(newUser.password).toBeFalsy();
  });

  test("Find saved user by email", async () => {
    const newUser = await userService.addUser(employee);
    const found = await userService.findUserByEmail(employee.email);
    expect(found.email).toEqual(newUser.email);
  });

  test("Find company fails when trying to find with employee email", async () => {
    await userService.addUser(employee);
    const promise = userService.findUserByEmail(employee.email);
    expect(promise).rejects.toThrowError();
  });
});

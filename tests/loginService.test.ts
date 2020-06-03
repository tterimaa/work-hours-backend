import userService from "../src/services/userService";
import loginService from "../src/services/loginService";
import { UserDTO } from "types";
import dbHandler from "./db-handler";

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const employee: UserDTO = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

describe("Login", () => {
    test("Login user", async () => {
        await userService.addUser(employee);
        const token = await loginService.login(employee.email, employee.password, employee.role);
        expect(token.token).toBeTruthy();
        expect(token.expires).toBeTruthy();
    });
    test("Login user fails when no user is added", () => {
        const promise = loginService.login(employee.email, employee.password, employee.role);
        expect(promise).rejects.toThrowError();
    });
  });


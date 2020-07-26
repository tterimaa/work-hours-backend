import userService from "../src/services/userService";
import loginService from "../src/services/loginService";
import { UserDTO } from "../src/interfaces/IUser";
import dbHandler from "./db-handler";
import supertest from "supertest";
import express from "express";
import configure from "../src/loaders/passport";
import expressLoader from "../src/loaders/express";
import passport from "passport";

const app = express();
configure(passport);
expressLoader({ app });
const api = supertest(app);

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
    const token = await loginService.login(
      employee.email,
      employee.password,
      employee.role
    );
    expect(token.token).toBeTruthy();
    expect(token.expires).toBeTruthy();
  });
  test("Login user fails when no user is added", () => {
    const promise = loginService.login(
      employee.email,
      employee.password,
      employee.role
    );
    expect(promise).rejects.toThrowError();
  });
});

describe("Authorization", () => {
  test("Auth success", async () => {
    await userService.addUser(employee);
    const token = await loginService.login(
      employee.email,
      employee.password,
      employee.role
    );
    const result = await api
      .get("/users/protected")
      .set("Authorization", token.token);
    expect(result.status).toBe(200);
  });

  test("Auth failure", async () => {
    await userService.addUser(employee);
    const token = await loginService.login(
      employee.email,
      employee.password,
      employee.role
    );
    const result = await api
      .get("/users/protected-company")
      .set("Authorization", token.token);
    expect(result.status).toBe(401);
  });
});

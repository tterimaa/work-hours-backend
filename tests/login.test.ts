import registrationService from "../src/services/registration";
import loginService from "../src/services/login";
import { IUser } from "../src/interfaces/IUser";
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

const employee: IUser = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

describe("Login", () => {
  test("Login user", async () => {
    await registrationService.registerUser(employee);
    const token = await loginService.login(employee.email, employee.password);
    expect(token.token).toBeTruthy();
    expect(token.expires).toBeTruthy();
  });
  test("Login user fails when no user is added", () => {
    const promise = loginService.login(employee.email, employee.password);
    expect(promise).rejects.toThrowError();
  });
});

describe("Authorization", () => {
  test("Auth success", async () => {
    await registrationService.registerUser(employee);
    const token = await loginService.login(employee.email, employee.password);
    const result = await api
      .get("/users/protected")
      .set("Authorization", token.token);
    expect(result.status).toBe(200);
  });

  test("Auth failure", async () => {
    await registrationService.registerUser(employee);
    const token = await loginService.login(employee.email, employee.password);
    const result = await api
      .get("/users/protected-company")
      .set("Authorization", token.token);
    expect(result.status).toBe(401);
  });
});

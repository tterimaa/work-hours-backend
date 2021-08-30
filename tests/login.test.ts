import registrationService from "../src/services/registration";
import loginService from "../src/services/login";
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

const employee = {
  email: "roope@gmail.com",
  password: "salasana",
  role: "employee",
  firstname: "Roope",
  lastname: "Ankka",
};

describe("Login", () => {
  test("Login user", async () => {
    await registrationService.registerEmployee(employee);
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
    await registrationService.registerEmployee(employee);
    const token = await loginService.login(employee.email, employee.password);
    const result = await api
      .get("/users/protected")
      .set("Authorization", token.token);
    expect(result.status).toBe(200);
  });

  test("Auth failure", async () => {
    await registrationService.registerEmployee(employee);
    const token = await loginService.login(employee.email, employee.password);
    const result = await api
      .get("/users/protected-company")
      .set("Authorization", token.token);
    expect(result.status).toBe(401);
  });
});

describe("Authorization e2e", () => {
  test("Register succeeds with valid inputs", async () => {
    const result = await api.post("/users/register-company").send({
      email: "company@gmail.com",
      password: "password",
      role: "company",
      companyName: "yritys",
    });
    expect(result.status).toBe(200);
  });

  test("Login fails and responds with error when user does not exist", async () => {
    const result = await api.post("/users/login").send({
      email: "company@gmail.com",
      password: "password",
    });
    expect(result.status).toBe(500);
  });
});

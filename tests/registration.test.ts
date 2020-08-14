import registrationService from "../src/services/registration";
import accountService from "../src/services/account";
import dbHandler from "./db-handler";

const employeeInput = {
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
    const { account, employee } = await registrationService.registerEmployee(
      employeeInput
    );
    expect(account.email).toBeTruthy();
    expect(account.role).toBeTruthy();
    expect(employee.firstname).toBeTruthy();
    expect(employee.lastname).toBeTruthy();
    expect(account.password).toBeFalsy();
  });

  test("Find saved user by email", async () => {
    const { account } = await registrationService.registerEmployee(employeeInput);
    const found = await accountService.findAccountByEmail(employeeInput.email);
    expect(found.email).toEqual(account.email);
  });
});

import Employee from "../models/Employee";
import Account from "../models/Account";
import Request from "../models/Request";
import Company from "../models/Company";

enum Status {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

const sendRequest = async (fromId: string, toId: string) => {
  const request = new Request({
    status: Status.PENDING,
    from: fromId,
    to: toId,
  });

  return await request.save().catch((err) => {
    throw new Error(err);
  });
};

const getIncoming = async (toId: string) => {
  const requests = await Request.find({ to: toId });
  const senderIds = requests.map((req) => req.from);
  const accounts = await Account.find({
    _id: { $in: senderIds },
  });
  return accounts;
};

const acceptRequest = async (fromId: string, userId: string) => {
  const request = await Request.findOne({ to: userId, from: fromId }).orFail();
  // Company requests employee: to = employee, from = company
  const employee = await Employee.findOne({
    account: request.to.toString(),
  }).orFail();
  const company = await Company.findOne({
    account: request.from.toString(),
  }).orFail();
  const companiesOfEmployee = [...new Set([...employee.companies, fromId])];
  employee.companies = companiesOfEmployee;
  const employeesOfCompany = [...new Set([...company.employees, userId])];
  company.employees = employeesOfCompany;
  employee.save();
  company.save();
  request.remove();
};

export default { sendRequest, getIncoming, acceptRequest };

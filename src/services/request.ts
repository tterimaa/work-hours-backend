import Account from "../models/Account";
import Request from "../models/Request";

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

export default { sendRequest, getIncoming };

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

export default { sendRequest };

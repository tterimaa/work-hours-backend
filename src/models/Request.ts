import { IRequestModel } from "interfaces/IRequest";
import { model, Schema } from "mongoose";

const documentName = "Request";

const RequestSchema = new Schema({
  status: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

const Company = model<IRequestModel>(documentName, RequestSchema);
export default Company;

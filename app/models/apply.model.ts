import mongoose, { Schema, model, models } from "mongoose";

const applySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  aadharCardURL: {
    type: String,
    default: null,
  },
  class12MarkSheetURL: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    required: true,
  },
});
const Apply = models.Apply || model("Apply", applySchema);
export default Apply;

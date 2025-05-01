import mongoose, { Schema, model, models } from "mongoose";

const applySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  guardianNumber: {
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
  class12marks: {
    type: String,
    default: null,
  },
  pinCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  passingYear: {
    type: String,
    required: true,
  },
  lateral: {
    type: Boolean,
    default: false,
  },
});
const Apply = models.Apply || model("Apply", applySchema);
export default Apply;

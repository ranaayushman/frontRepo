import mongoose, { Schema, model, models } from "mongoose";

const applySchema = new Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: false, // Optional, aligns with frontend sending null
  // },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colleges",
    required: [true, "College is required"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Branch is required"],
    // No ref since branches are subdocuments in Colleges
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  guardianNumber: {
    type: String,
    required: [true, "Guardian phone number is required"],
    match: [/^\d{10}$/, "Guardian phone number must be 10 digits"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  // Removed branch field since frontend sends branchId
  // If needed, populate branch name on the backend using branchId
  class12marks: {
    type: Number, // Changed to Number for numeric operations
    required: [true, "Class 12 marks are required"],
    min: [0, "Marks cannot be less than 0"],
    max: [100, "Marks cannot exceed 100"],
  },
  pinCode: {
    type: String,
    required: [true, "PIN code is required"],
    match: [/^\d{6}$/, "PIN code must be 6 digits"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  passingYear: {
    type: String, // Changed to Number for consistency
    required: [true, "Passing year is required"],
  },
  lateralEntry: {
    type: Boolean,
    default: false,
  },
  // aadharCardURL: {
  //   type: String,
  //   default: null,
  // },
});

const Apply = models.Apply || model("Apply", applySchema);
export default Apply;

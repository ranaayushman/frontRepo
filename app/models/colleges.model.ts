import mongoose, { Schema, model, models } from "mongoose";

const collegeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  branches: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Colleges = models.Colleges || mongoose.model("Colleges", collegeSchema);
export default Colleges;

import mongoose, { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  subject: String,
  address: String,
});

const Contact = models.Contact || model("Contact", contactSchema);
export default Contact;

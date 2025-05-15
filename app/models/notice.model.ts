import { Mongoose, Schema, model, models } from "mongoose";

const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notice = models.Notice || model("Notice", noticeSchema);
export default Notice;
export type NoticeType = {
  _id?: string; 
  title: string;
  description: string;
  isPublished: boolean;
  date: Date;
};

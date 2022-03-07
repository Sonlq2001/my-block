import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titleInside: {
      type: String,
      required: true,
      unique: true,
    },
    titleOutside: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
      required: true,
    },
    topic: { type: mongoose.Types.ObjectId, ref: "topics" },
    authPost: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);

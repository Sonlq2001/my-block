import mongoose from "mongoose";

const schemeComment = new mongoose.Schema(
  {
    user: {
      ref: "users",
      type: mongoose.Types.ObjectId,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      ref: "posts",
      type: mongoose.Types.ObjectId,
    },
    parent_comment: {
      ref: "new_comments",
      type: mongoose.Types.ObjectId,
      required: false,
      set: (v) => (v ? v : null),
    },
    total_children: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("new_comments", schemeComment);

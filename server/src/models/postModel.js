import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const tagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    avatar: {
      type: Object,
      required: true,
    },
    tags: {
      type: [tagSchema],
      default: [],
      required: true,
    },
    topics: [{ type: mongoose.Types.ObjectId, ref: "topics" }],
    authPost: { type: mongoose.Types.ObjectId, ref: "users" },
    view: {
      type: Number,
      default: 0,
    },
    slug: { type: String, slug: "title", unique: true },
    format: {
      type: Number,
      default: 1, // format standard
    },
    videoUrl: {
      type: String,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    allowComment: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("posts", postSchema);

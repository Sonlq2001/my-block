import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

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
		view: {
			type: Number,
			default: 0,
		},
		categoryId: { type: mongoose.Types.ObjectId, ref: "categories" },
		slug: { type: String, slug: "titleInside", unique: true },
	},
	{ timestamps: true }
);

export default mongoose.model("posts", postSchema);

import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const tagSchema = new mongoose.Schema({
	tag: { type: String, required: true, unique: true },
});

const postSchema = new mongoose.Schema(
	{
		// titleInside: {
		// 	type: String,
		// 	required: true,
		// 	unique: true,
		// },
		// titleOutside: {
		// 	type: String,
		// 	required: true,
		// 	unique: true,
		// },
		title: { type: String, required: true, unique: true },
		content: {
			type: String,
			required: true,
		},
		description: {
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
	},
	{ timestamps: true }
);

export default mongoose.model("posts", postSchema);

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
	},
	{ timestamp: true }
);

export default mongoose.model("post", postSchema);

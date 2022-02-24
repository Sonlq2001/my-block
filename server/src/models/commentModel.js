import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		reply: mongoose.Types.ObjectId,
		tag: Object,
		user: { type: mongoose.Types.ObjectId, ref: "users" },
		likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
		postId: mongoose.Types.ObjectId,
		postUserId: mongoose.Types.ObjectId,
	},
	{ timestamps: true }
);

export default mongoose.model("comments", commentSchema);

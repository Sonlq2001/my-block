import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		userComment: { type: mongoose.Types.ObjectId, ref: "users" },
		postId: mongoose.Types.ObjectId,
		authPost: mongoose.Types.ObjectId,
		content: {
			type: String,
			required: true,
		},
		replyComment: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
		replyUser: { type: mongoose.Types.ObjectId, ref: "users" },
		rootComment: { type: mongoose.Types.ObjectId, ref: "comments" },
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "users",
			},
		],
		reactionText: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("comments", commentSchema);

import mongoose from "mongoose";

const reactionTypeSchema = new mongoose.Schema(
	{
		type: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("reactionType", reactionTypeSchema);

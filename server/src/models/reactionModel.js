import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		userLike: { type: mongoose.Types.ObjectId, ref: "users" },
	},
	{
		type: { type: mongoose.Types.ObjectId, ref: "reactionType" },
	},
	{ timestamps: true }
);

export default mongoose.model("reactions", schema);

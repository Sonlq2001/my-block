import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		conversation: { type: mongoose.Types.ObjectId, ref: "conversations" },
		sender: { type: mongoose.Types.ObjectId, ref: "users" },
		recipient: { type: mongoose.Types.ObjectId, ref: "users" },
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("messages", schema);

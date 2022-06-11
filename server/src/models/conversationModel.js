import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		recipients: [{ type: mongoose.Types.ObjectId, ref: "users" }],
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("conversations", schema);

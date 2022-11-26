import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		slug: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("topics", topicSchema);

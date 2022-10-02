import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		slug: { type: String, slug: "name", unique: true },
	},
	{ timestamps: true }
);

export default mongoose.model("categories", schema);

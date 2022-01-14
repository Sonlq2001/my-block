import mongoose from "mongoose";

const connect = async () => {
	try {
		mongoose.connect(`${process.env.API}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connect db successfully");
	} catch (error) {
		console.log("Connect db failed");
	}
};

export default { connect };

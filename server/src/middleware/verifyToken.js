import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.header("Authorization");

		const token = authHeader && authHeader.split(" ")[1];
		if (token) {
			jwt.verify(token, process.env.ACCESS_TOKEN, async (err, data) => {
				if (err) {
					return res.status(408).json({ message: "Token đã hết hạn" });
				}

				const user = await User.findOne({ _id: data._id }).select("-password");

				req.user = user;
				next();
			});
		} else {
			return res.status(401).json({ message: "Bạn không thể xác thực" });
		}
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

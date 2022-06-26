import jwt from "jsonwebtoken";

import User from "./../models/userModel";
import {
	generateToken,
	generateRefreshToken,
} from "./../helpers/generate-token.helpers";

export const refreshToken = async (req, res) => {
	try {
		const token = req.cookies.refreshToken;

		if (!token) {
			return res.status(401).json({ msg: "Please login now! 1" });
		}
		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);

		const userVerify = await User.findOne({ _id: decoded._id }).select(
			"-password +refresh_token"
		);

		if (!userVerify) {
			return res.status(401).json({ msg: "This account dose not exist" });
		}

		if (token !== userVerify.refresh_token) {
			return res.status(401).json({ msg: "Please login now" });
		}

		const dataToken = {
			_id: decoded._id,
			email: decoded.email,
			name: decoded.name,
			avatar: decoded.picture || decoded.avatar,
		};

		const newAccessToken = generateToken(dataToken);
		const newRefreshToken = generateRefreshToken(dataToken);

		const result = await User.findOneAndUpdate(
			{ _id: decoded._id },
			{ refresh_token: newRefreshToken }
		);

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict",
		});

		return res.status(200).json({
			accessToken: newAccessToken,
		});
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

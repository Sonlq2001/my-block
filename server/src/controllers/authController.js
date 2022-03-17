import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

import {
	generateToken,
	generateRefreshToken,
} from "./../helpers/generate-token.helpers";
import User from "./../models/userModel";
import RefreshToken from "./../models/refreshTokenModel";

const client = new OAuth2Client(`${process.env.CLIENT_ID}`);

const handleToken = async ({ user, res }) => {
	const accessToken = generateToken({
		_id: user._id,
		email: user.email,
		name: user.name,
		avatar: user.picture || user.avatar,
	});

	const refreshToken = generateRefreshToken({
		_id: user._id,
		email: user.email,
		name: user.name,
		avatar: user.picture || user.avatar,
	});

	// save refresh token with db when login
	const saveRefreshToken = new RefreshToken({ refreshToken });
	await saveRefreshToken.save();

	// save refresh token with httpOnly cookie
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		path: "/",
		sameSite: "strict",
	});

	return {
		user,
		accessToken,
	};
};

export const logout = async (req, res) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			return res.status(401).json({ msg: "yes" });
		}

		res.clearCookie("refreshToken", { path: "/" });

		const refreshTokenDb = await RefreshToken.findOne({ refreshToken: token });
		if (!refreshTokenDb) {
			// không có token trong db thì client sẽ cho logout ra
			return res.status(401).json({ msg: "yes" });
		}

		await RefreshToken.findOneAndDelete({ refreshToken: token });

		return res.status(200).json({ msg: "Đăng xuất thành công !" });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const loginGoogle = async (req, res) => {
	try {
		const { token } = req.body;
		const verify = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});

		const { email, email_verified, name, picture } = verify.getPayload();

		if (!email_verified) {
			return res.status(500).json({ message: "Xác minh email thất bại" });
		}

		const user = await User.findOne({ email });
		const passwordHash = await bcrypt.hash(email, 12);

		if (user) {
			// login
			const { user: resUser, accessToken } = await handleToken({
				user,
				res,
			});

			return res.status(200).json({
				message: "Đăng nhập thành công !",
				user: { ...resUser._doc, password: "" },
				accessToken,
			});
		} else {
			// register
			const newUser = new User({
				email,
				name,
				avatar: picture,
				password: passwordHash,
			});
			await newUser.save();
			const { user: resUser, accessToken } = await handleToken({
				user: newUser,
				res,
			});

			return res.status(200).json({
				message: "Đăng nhập thành công !",
				user: { ...resUser._doc, password: "" },
				accessToken,
			});
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

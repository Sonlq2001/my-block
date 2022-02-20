import bcrypt from "bcryptjs";

import { isValidEmail } from "./../helpers/validator.helpers";
import {
	generateToken,
	generateRefreshToken,
} from "./../helpers/generate-token.helpers";
import User from "./../models/userModel";
import RefreshToken from "./../models/refreshTokenModel";

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Vui lòng điền đầy đủ thông tin !" });
		}

		if (!isValidEmail(email)) {
			return res.status(400).json({ message: "Email không hợp lệ !" });
		}

		const userUnique = await User.findOne({ email });
		if (userUnique) {
			return res.status(400).json({ message: "Tài khoản đã được đăng ký !" });
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashPassword });
		const resUser = await newUser.save();

		const accessToken = generateToken({
			_id: newUser._id,
			email: newUser.email,
			name: newUser.name,
		});

		const refreshToken = generateRefreshToken({
			_id: newUser._id,
			email: newUser.email,
			name: newUser.name,
		});

		// save refresh token with httpOnly cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict",
		});

		return res.status(200).json({
			message: "Đăng kí tài khoản thành công !",
			user: resUser,
			accessToken,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userUnique = await User.findOne({ email });

		if (!userUnique) {
			return res.status(404).json({ message: "Tài khoản không tồn tại !" });
		}

		const invalidPassword = await bcrypt.compare(password, userUnique.password);

		if (!invalidPassword) {
			return res.status(404).json({ message: "Mật khẩu không đúng !" });
		}

		const accessToken = generateToken({
			_id: userUnique._id,
			email: userUnique.email,
			name: userUnique.name,
		});

		const refreshToken = generateRefreshToken({
			_id: userUnique._id,
			email: userUnique.email,
			name: userUnique.name,
		});

		// save refresh token with db
		const saveRefreshToken = new RefreshToken({ refreshToken });
		saveRefreshToken.save();

		// save refresh token with httpOnly cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			path: "/",
			sameSite: "strict",
			// maxAge: accessToken.
		});

		const { password: hiddenPassword, ...other } = userUnique._doc;

		return res.status(200).json({
			message: "Đăng nhập thành công !",
			user: other,
			accessToken,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
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
		res.status(500).json({ msg: error.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const listUser = await User.find();
		return res.status(200).json({ message: "Danh sách user", users: listUser });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userDeleted = await User.findByIdAndRemove({ _id: req.params.id });
		return res
			.status(200)
			.json({ message: "Xóa thành công user", user: userDeleted });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

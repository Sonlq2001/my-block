import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN, {
		expiresIn: "60s",
	});
};

export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN, {
		expiresIn: "180s",
	});
};

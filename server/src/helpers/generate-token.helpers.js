import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
	return jwt.sign({ id: payload }, process.env.ACCESS_TOKEN, {
		expiresIn: "60s",
	});
};

export const generateRefreshToken = (payload) => {
	return jwt.sign({ id: payload }, process.env.REFRESH_TOKEN, {
		expiresIn: "1h",
	});
};

export const updateUserToken = (payload) => {
	console.log(payload, "o day");
};

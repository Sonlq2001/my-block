import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization");
	const token = authHeader && authHeader.split(" ")[1];
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
			if (err) {
				res.status(403).json({ message: "Token đã hết hạn" });
			}
			req.userId = user.id;
			next();
		});
	} else {
		res.status(401).json({ message: "Bạn không thể xác thực" });
	}
};

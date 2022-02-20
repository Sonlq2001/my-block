import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "1800s",
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "1h",
  });
};

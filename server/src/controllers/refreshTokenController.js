import jwt from "jsonwebtoken";

import RefreshToken from "./../models/refreshTokenModel";
import {
  generateToken,
  generateRefreshToken,
} from "./../helpers/generate-token.helpers";

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res
        .status(400)
        .json({ msg: "Bạn cần đăng nhập, không được phép refresh token" });
    }

    const refreshTokenDb = await RefreshToken.findOne({ refreshToken: token });
    if (!refreshTokenDb) {
      return res.status(401).json({ msg: "refresh token không tồn tại" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, data) => {
      if (err) {
        return res.status(403).json({ msg: "Token không hợp lệ" });
      }

      const newAccessToken = generateToken(data.id);
      const newRefreshToken = generateRefreshToken(data.id);

      await RefreshToken.findOneAndUpdate(
        { refreshToken: token },
        { refreshToken: newRefreshToken },
        {
          new: true,
        }
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
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

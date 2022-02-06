import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("refreshToken", refreshTokenSchema);

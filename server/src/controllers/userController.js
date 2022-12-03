import User from "./../models/userModel";

export const getUser = async (req, res) => {
	try {
		const dataUser = await User.findOne({ _id: req.params.user_id }).select(
			"-password"
		);
		return res.status(200).json({ dataUser });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

// [PATCH] - [/user_save_post/:post_id]
export const patchUseSavePost = async (req, res) => {
	try {
		const existPost = await User.findOne({ savePost: req.params.post_id });

		if (existPost) {
			return res.status(400).json({ message: "Bài viết đã được lưu" });
		}

		await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { savePost: req.params.post_id } },
			{ new: true }
		);
		return res.status(200).json({ message: "Thêm vào mục đã lưu" });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

// [PATCH] - [/user_un_save_post/:post_id]
export const useUnSavePost = async (req, res) => {
	try {
		await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $pull: { savePost: req.params.post_id } },
			{ new: true }
		);
		return res.status(200).json({ message: "Xóa khỏi mục đã lưu" });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getUserInfo = async (req, res) => {
	try {
		const userInfo = await User.findOne({ _id: req.user._id }).select(
			"-password"
		);
		return res.status(200).json({ userInfo });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getUserSearch = async (req, res) => {
	try {
		const { q } = req.query;
		const useSearched = await User.find({
			name: { $regex: q.trim() },
		}).select("name avatar email");
		return res.status(200).json({ useSearched });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

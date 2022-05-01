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

export const useSavePost = async (req, res) => {
	try {
		const resData = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { savePost: req.body.postId } },
			{ new: true }
		);
		return res.status(200).json({ resData });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const useUnSavePost = async (req, res) => {
	try {
		const resData = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $pull: { savePost: req.body.postId } },
			{ new: true }
		);
		return res.status(200).json({ resData });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getUserInfo = async (req, res) => {
	try {
		const userInfo = await User.findOne({ _id: req.user._id }).select(
			"-password"
		);
		console.log(req.user);
		return res.status(200).json({ userInfo });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

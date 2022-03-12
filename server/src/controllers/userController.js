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

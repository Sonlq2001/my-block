import Notify from "./../models/notifyModel";

export const createNotify = async (req, res) => {
	try {
		const newNotify = new Notify({ ...req.body, user: req.user._id });

		if (req.body.recipients.includes(req.user._id.toString())) return;

		await newNotify.save();
		const resNotify = await newNotify.populate({
			path: "user",
			select: "name avatar",
		});
		return res.status(200).json({ resNotify });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getNotifies = async (req, res) => {
	try {
		const listNotify = await Notify.find({ recipients: req.user._id })
			.sort("-createdAt")
			.populate({ path: "user", select: "avatar name" });
		return res.status(200).json({ msg: "Danh sách thông báo", listNotify });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const patchReadNotify = async (req, res) => {
	try {
		const resData = await Notify.findOneAndUpdate(
			{ _id: req.body.idNotify },
			{ isRead: true },
			{ new: true }
		);
		return res.status(200).json({ notify: resData });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

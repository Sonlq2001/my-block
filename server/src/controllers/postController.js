import Post from "./../models/postModel";

export const createPost = async (req, res) => {
	try {
		const post = new Post(req.body);
		const resPost = await post.save();
		return res
			.status(200)
			.json({ msg: "Đăng bài viết thành công !", post: resPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPosts = async (req, res) => {
	try {
		const listPost = await Post.find()
			.populate({
				path: "topic user",
				select: "-password",
			})
			.populate({
				path: "comments",
				populate: { path: "user", select: "-password" },
			});
		return res.status(200).json({ msg: "Danh sách bài viết !", listPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { post_id } = req.params;
		const postItem = await Post.findOne({ _id: post_id })
			.populate({
				path: "topic user",
				select: "-password",
			})
			.populate({
				path: "comments",
				populate: { path: "user", select: "-password" },
			});
		if (!postItem) {
			return res.status(404).json({ msg: "Không tìm thấy bài viết !" });
		}

		return res.status(200).json({ msg: "Chi tiết bài viết !", postItem });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

import Post from "./../models/postModel";
import Comment from "./../models/commentModel";

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
		const listPost = await Post.find().populate({
			path: "topic authPost",
			select: "name email",
		});
		return res.status(200).json({ msg: "Danh sách bài viết !", listPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { post_id } = req.params;
		const postItem = await Post.findOne({ _id: post_id }).populate({
			path: "topic authPost",
			select: "name email",
		});

		const totalComment = await Comment.count({ postId: post_id });

		if (!postItem) {
			return res.status(404).json({ msg: "Không tìm thấy bài viết !" });
		}

		return res.status(200).json({
			postItem: { ...postItem._doc, totalComment },
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const searchPost = async (req, res) => {
	try {
		const listPost = await Post.find({
			titleOutside: { $regex: req.query.q.trim() },
		}).populate({
			path: "topic",
			select: "name",
		});

		return res.status(200).json({ listPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPostUser = async (req, res) => {
	try {
		const data = await Post.find({ authPost: req.params.user_id });

		// result.map(async (item) => {
		// 	const comment = await Comment.find({ postId: item });
		// 	dataComment.push(comment);
		// });

		return res.status(200).json({ data });
	} catch (error) {
		return res.status(500).json({ msg: err.message });
	}
};

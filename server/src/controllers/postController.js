import mongoose from "mongoose";

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
		const listPost = await Post.aggregate([
			{
				// topic
				$lookup: {
					from: "topics",
					localField: "topic",
					foreignField: "_id",
					as: "topic",
				},
			},
			// array -> object
			{ $unwind: "$topic" },
			// auth post
			{
				$lookup: {
					from: "users",
					localField: "authPost",
					foreignField: "_id",
					as: "authPost",
				},
			},
			// array -> object
			{ $unwind: "$authPost" },
			// sorting
			{ $sort: { createdAt: -1 } },
			// total comment
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "postId",
					as: "totalComment",
				},
			},
			// count comment
			{ $addFields: { totalComment: { $size: "$totalComment" } } },
			// remove data unnecessary
			{ $unset: ["authPost.password", "authPost.email"] },
		]);
		return res.status(200).json({ msg: "Danh sách bài viết !", listPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { post_id } = req.params;
		const postItem = await Post.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(post_id),
				},
			},
			// topic
			{
				$lookup: {
					from: "topics",
					localField: "topic",
					foreignField: "_id",
					as: "topic",
				},
			},
			// array -> object
			{ $unwind: "$topic" },
			// auth post
			{
				$lookup: {
					from: "users",
					localField: "authPost",
					foreignField: "_id",
					as: "authPost",
				},
			},
			// array -> object
			{ $unwind: "$authPost" },
			// total comment
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "postId",
					as: "totalComment",
				},
			},
			// count comment
			{ $addFields: { totalComment: { $size: "$totalComment" } } },
			// remove data unnecessary
			{ $unset: ["authPost.password", "authPost.email"] },
		]);

		if (!postItem) {
			return res.status(404).json({ msg: "Không tìm thấy bài viết !" });
		}

		return res.status(200).json({
			postItem: postItem[0],
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

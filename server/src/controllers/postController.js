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

export const viewPost = async (req, res) => {
	try {
		const resData = await Post.findOneAndUpdate(
			{ _id: req.params.post_id },
			{ $inc: { view: 1 } },
			{ new: true }
		);
		return res.status(200).json({ resData });
	} catch (error) {
		return res.status(500).json({ msg: err.message });
	}
};

export const getPostsTrending = async (req, res) => {
	try {
		const listPostTrending = await Post.find()
			.populate({
				path: "authPost",
				select: "name avatar",
			})
			.sort({ view: -1 })
			.limit(4);
		return res.status(200).json({ listPostTrending });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getPostsUser = async (req, res) => {
	try {
		const postsUser = await Post.find({
			authPost: req.params.user_id,
		}).populate({
			path: "authPost topic",
			select: "name",
		});
		return res.status(200).json({ postsUser });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getPostsSaved = async (req, res) => {
	try {
		const postsSaved = await Post.find({
			_id: { $in: req.user.savePost },
		}).populate({
			path: "authPost topic",
			select: "name",
		});
		return res.status(200).json({ postsSaved });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getPostNewest = async (req, res) => {
	try {
		const postsNewest = await Post.find()
			.populate({
				path: "authPost topic",
				select: "avatar name",
			})
			.sort({ createdAt: -1 });
		return res.status(200).json({ postsNewest });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

import Post from "./../models/postModel";
import Topic from "./../models/topicModel";

import { ApiFeatures, pagination } from "../helpers/features.helpers";
import { FORMAT_POST } from "../constants/post.constants";

export const createPost = async (req, res) => {
	try {
		const post = new Post(req.body);
		const postSaved = await post.save();
		return res.status(200).json({ post: postSaved });
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
		return res.status(200).json({ list: listPost });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

// [GET] - [/post/:slug]
export const getPost = async (req, res) => {
	try {
		const { slug } = req.params;

		const postItem = await Post.aggregate([
			{
				$match: {
					slug,
				},
			},
			// topic
			{
				$lookup: {
					from: "topics",
					localField: "topics",
					foreignField: "_id",
					as: "topics",
				},
			},

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
			{
				$project: {
					"authPost.refresh_token": 0,
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
		return res.status(500).json({ msg: error.message });
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
		const features = new ApiFeatures(
			Post.find({
				authPost: req.params.user_id,
			}),
			req.query
		)
			.pagination()
			.sorting();

		const postsUser = await features.query.populate({
			path: "authPost topic",
			select: "name",
		});
		const total = await Post.count({
			authPost: req.params.user_id,
		});
		return res.status(200).json({ postsUser, total });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getPostsSaved = async (req, res) => {
	try {
		const features = new ApiFeatures(
			Post.find({
				_id: { $in: req.user.savePost },
			}),
			req.query
		)
			.pagination()
			.sorting();
		const postsSaved = await features.query.populate({
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

export const getPostExplore = async (req, res) => {
	try {
		const { skip, perPage } = pagination(req);

		const resData = await Post.aggregate([
			{
				$facet: {
					posts: [
						{
							$match: {
								title: { $regex: req.query.q },
							},
						},
						{
							$lookup: {
								from: "topics",
								localField: "topics",
								foreignField: "_id",
								as: "topics",
							},
						},
						// { $unwind: "$topic" },
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
						{
							$project: {
								avatar: 1,
								"topics._id": 1,
								"topics.name": 1,
								totalComment: 1,
								createdAt: 1,
								updatedAt: 1,
								titleInside: 1,
								titleOutside: 1,
								slug: 1,
							},
						},
						{ $skip: skip },
						{ $limit: perPage },
						{ $sort: { createdAt: -1 } },
					],
					totalCount: [
						{
							$match: {
								title: { $regex: req.query.q },
							},
						},
						{ $count: "count" },
					],
				},
			},
		]);
		const list = resData[0].posts;
		const total = resData[0].totalCount[0]?.count;
		return res.status(200).json({ list, total });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

// [GET] - [/posts-type]
export const getPostsType = async (req, res) => {
	try {
		const { type } = req.query;
		const { skip, perPage } = pagination(req);

		const topic = await Topic.findOne({ slug: type }).select({
			createdAt: 0,
			updatedAt: 0,
			__v: 0,
		});

		if (!topic) {
			return res.status(400).json({ message: "Not Found topic" });
		}

		const listPost = await Post.find({
			topics: topic._id,
			format: FORMAT_POST.STANDARD,
		})
			.populate({
				path: "topics",
				select: "name",
			})
			.populate({
				path: "authPost",
				select: "name avatar",
			})
			.skip(skip)
			.limit(perPage)
			.sort({ createdAt: -1 });

		const total = await Post.count({ topics: topic._id });

		return res.status(200).json({
			list: {
				...topic._doc,
				name: undefined,
				topic: topic.name,
				data: listPost,
				total,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getPostsVideo = async (req, res) => {
	try {
		const listVideo = await Post.find({ format: FORMAT_POST.VIDEO }).sort({
			createdAt: -1,
		});
		return res.status(200).json({ list: listVideo });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const patchLikePost = async (req, res) => {
	try {
		const likedPost = await Post.find({
			_id: req.params.id,
			likes: req.user._id,
		});

		if (likedPost.length) {
			return res.status(400).json({ message: "You liked post" });
		}

		await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { likes: req.user._id } }
		);
		return res.status(200).json({ message: "Like post success" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const patchUnLikePost = async (req, res) => {
	try {
		await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { likes: req.user._id } }
		);
		return res.status(200).json({ message: "UnLike post success" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

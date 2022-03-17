import mongoose from "mongoose";

import Comment from "./../models/commentModel";
import { pagination } from "./../helpers/index";
import { io } from "./../index";

export const getComments = async (req, res) => {
	try {
		const { limit, skip } = pagination(req);

		const data = await Comment.aggregate([
			{
				$facet: {
					totalData: [
						{
							$match: {
								postId: mongoose.Types.ObjectId(req.params.post_id),
								rootComment: { $exists: false },
								replyUser: { $exists: false },
							},
						},
						{
							$lookup: {
								from: "users",
								localField: "userComment",
								foreignField: "_id",
								as: "userComment",
							},
						},
						{ $unwind: "$userComment" },
						{
							$lookup: {
								from: "comments",
								let: { cm_id: "$replyComment" },
								pipeline: [
									{ $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
									{
										$lookup: {
											from: "users",
											localField: "userComment",
											foreignField: "_id",
											as: "userComment",
										},
									},
									{ $unwind: "$userComment" },
									{
										$lookup: {
											from: "users",
											localField: "replyUser",
											foreignField: "_id",
											as: "replyUser",
										},
									},
									{ $unwind: "$replyUser" },
								],
								as: "replyComment",
							},
						},
						{ $skip: skip },
						{ $limit: limit },
						{ $sort: { createdAt: -1 } },
					],
					totalCount: [
						{
							$match: {
								postId: mongoose.Types.ObjectId(req.params.post_id),
								rootComment: { $exists: false },
								replyUser: { $exists: false },
							},
						},
						{ $count: "count" },
					],
				},
			},
			{
				$project: {
					count: { $arrayElemAt: ["$totalCount.count", 0] },
					totalData: 1,
				},
			},
		]);

		const comments = data[0].totalData;
		const count = data[0].count;

		let total = 0;
		if (count % limit === 0) {
			total = count / limit;
		} else {
			total = Math.floor(count / limit) + 1;
		}

		return res.status(200).json({ comments, total });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const createComment = async (req, res) => {
	try {
		const { postId, content, authPost, replyUser } = req.body;
		const newComment = new Comment({
			postId,
			content,
			authPost,
			userComment: req.user._id,
			replyUser,
		});

		await newComment.save();
		const dataComment = await newComment.populate({
			path: "userComment",
			select: "name email",
		});
		io.to(postId).emit("createComment", dataComment);
		return res.status(200).json({ dataComment });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const replyComment = async (req, res) => {
	try {
		const { postId, content, authPost, rootComment, replyUser } = req.body;

		const newComment = new Comment({
			postId,
			content,
			authPost,
			userComment: req.user._id,
			rootComment,
			replyUser,
		});

		// đẩy id comment reply vào trong mảng của comment root
		await Comment.findOneAndUpdate(
			{ _id: rootComment },
			{ $push: { replyComment: newComment._id } }
		);

		await newComment.save();

		const dataReplyComment = await newComment.populate({
			path: "userComment replyUser",
			select: "name email",
		});
		io.to(postId).emit("replyComment", dataReplyComment);
		return res.status(200).json({ dataReplyComment });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const reactionComment = async (req, res) => {
	try {
		await Comment.updateOne(
			{ _id: req.body.commentReaction },
			{ $addToSet: { likes: req.user._id }, reactionText: req.body.type }
		);
		return res.status(200).json({ msg: "like ok" });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

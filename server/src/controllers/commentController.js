import Comment from "./../models/commentModel";
import Post from "./../models/postModel";

export const createComment = async (req, res) => {
	try {
		const { postId, content, tag, reply } = req.body;

		const comment = new Comment({
			user: req.user._id,
			content,
			tag,
			reply,
		});

		const result = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: comment._id } },
			{ new: true }
		)
			.populate({
				path: "topic user",
				select: "-password",
			})
			.populate({
				path: "comments",
				populate: { path: "user", select: "-password" },
			});

		console.log(result);
		await comment.save();

		return res.status(200).json({ comment });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

import mongoose from "mongoose";

import Post from "../models/postModel";

import { pagination } from "../helpers/features.helpers";
import { io } from "./../index";
import Comment from "../models/commentModel";

export const createComment = async (req, res) => {
  try {
    const { parent_comment } = req.body;
    if (parent_comment) {
      await Comment.findOneAndUpdate(
        {
          _id: req.body.parent_comment,
        },
        { $inc: { total_children: 1 } }
      );
    }

    const reqComment = {
      post: req.body.post,
      content: req.body.content,
      parent_comment: req.body.parentComment || req.body.parent_comment,
      user: req.body.user,
    };
    const commentModel = new Comment(reqComment);
    await commentModel.save();
    const dataComment = await commentModel.populate({
      path: "user",
      select: "_id name email avatar",
      model: "users",
    });
    io.to(req.body.post).emit("createComment", dataComment);

    return res.status(200).json({ data: dataComment });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { perPage, skip } = pagination(req);

    const parent_comment = req.query.parent_comment;
    const slug = req.query.slug;

    if (!slug) {
      return res.status(400).json({ message: "Not found" });
    }

    const postData = await Post.findOne({ slug });

    if (!postData) {
      return res.status(400).json({ message: "Not found" });
    }

    const listData = await Comment.find({
      post: postData._id,
      parent_comment: parent_comment,
    })
      .populate({
        path: "user",
        select: "_id name email avatar",
        model: "users",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    const total = await Comment.find({
      post: postData._id,
    }).count();

    return res.status(200).json({ data: listData, total });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

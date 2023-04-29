import mongoose from "mongoose";

import Post from "./../models/postModel";
import Topic from "./../models/topicModel";

import { pagination } from "../helpers/features.helpers";
import {
  FORMAT_POST,
  SLUG_TOPICS,
  TYPE_SEARCH,
  STATUS_POST,
} from "../constants/post.constants";
import { PER_PAGE_SLIDE } from "../constants/app.constants";
import { convertsQuery } from "../helpers/features.helpers";

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

// [GET] - [/posts_user/:user_id]
export const getPostsUser = async (req, res) => {
  try {
    const { q, tab } = req.query;
    const { skip, perPage } = pagination(req);

    let queriesSearch = {};
    switch (tab) {
      // search post save
      case TYPE_SEARCH.SAVE:
        queriesSearch = {
          _id: { $in: req.user?.savePost || [] },
        };
        break;
      case TYPE_SEARCH.PUBLIC:
        // search post public
        queriesSearch = {
          authPost: mongoose.Types.ObjectId(req.params.user_id),
          status: { $eq: STATUS_POST.PUBLIC },
        };
        break;
      case TYPE_SEARCH.DRAFT:
        // search post draft
        queriesSearch = {
          authPost: mongoose.Types.ObjectId(req.params.user_id),
          status: { $eq: STATUS_POST.DRAFT },
        };
        break;
      default:
        break;
    }

    const listPost = await Post.aggregate([
      {
        $facet: {
          data: [
            {
              $match: {
                $and: [{ title: { $regex: q || "" } }, queriesSearch],
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "authPost",
                foreignField: "_id",
                as: "authPost",
              },
            },
            { $unwind: "$authPost" },
            {
              $lookup: {
                from: "topics",
                localField: "topics",
                foreignField: "_id",
                as: "topics",
              },
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
              },
            },
            { $addFields: { totalLikes: { $size: "$likes" } } },
            { $addFields: { totalComments: { $size: "$comments" } } },
            { $sort: convertsQuery(req) },
            {
              $project: {
                title: 1,
                avatar: 1,
                "topics.name": 1,
                createdAt: 1,
                updatedAt: 1,
                slug: 1,
                totalLikes: 1,
                totalComments: 1,
                format: 1,
                "authPost.name": 1,
                "authPost.avatar": 1,
              },
            },
            { $skip: skip },
            { $limit: perPage },
          ],
          total: [
            {
              $match: {
                $and: [{ title: { $regex: q || "" } }, queriesSearch],
              },
            },
            { $count: "totalPost" },
          ],
        },
      },
    ]);

    const data = listPost[0]?.data || [];
    const total = listPost[0]?.total[0]?.totalPost || 0;
    return res.status(200).json({ data, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const tag = req.query.tag;

    let objectQuery = {};
    if (tag) {
      objectQuery = { "tags.tag": { $regex: tag } };
    } else {
      objectQuery = {
        title: {
          $regex: req.query.q,
        },
      };
    }

    const resData = await Post.aggregate([
      {
        $facet: {
          posts: [
            {
              $match: { $and: [objectQuery, { status: STATUS_POST.PUBLIC }] },
            },
            {
              $lookup: {
                from: "topics",
                localField: "topics",
                foreignField: "_id",
                as: "topics",
              },
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "authPost",
                foreignField: "_id",
                as: "authPost",
              },
            },
            { $unwind: "$authPost" },
            { $addFields: { totalComments: { $size: "$comments" } } },
            { $addFields: { totalLikes: { $size: "$likes" } } },
            {
              $project: {
                avatar: 1,
                "topics._id": 1,
                "topics.name": 1,
                totalComments: 1,
                createdAt: 1,
                updatedAt: 1,
                slug: 1,
                totalLikes: 1,
                title: 1,
                "authPost.name": 1,
                "authPost.avatar": 1,
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
    const data = resData[0]?.posts || [];
    const total = resData[0]?.totalCount[0]?.count || 0;
    return res.status(200).json({ data, total });
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

    const topLikesPost = await Post.aggregate([
      { $addFields: { totalLikes: { $size: "$likes" } } },
      { $match: { totalLikes: { $gt: 0 } } },
      { $sort: { totalLikes: -1, createdAt: -1 } },
      { $project: { totalLikes: 1 } },
      { $limit: PER_PAGE_SLIDE },
    ]);

    const listPost = await Post.aggregate([
      {
        $match: {
          $and: [
            { topics: topic._id },
            {
              _id: {
                $nin: topLikesPost.map((item) =>
                  mongoose.Types.ObjectId(item._id)
                ),
              },
            },
            {
              $or: [
                { authPost: { $in: req.user.following } },
                { authPost: { $ne: req.user._id } },
                { authPost: req.user._id },
              ],
            },
            { status: STATUS_POST.PUBLIC },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authPost",
          foreignField: "_id",
          as: "authPost",
        },
      },
      { $unwind: "$authPost" },
      {
        $lookup: {
          from: "topics",
          localField: "topics",
          foreignField: "_id",
          as: "topics",
        },
      },
      { $unwind: "$authPost" },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $addFields: { totalComments: { $size: "$comments" } } },
      { $addFields: { totalLikes: { $size: "$likes" } } },
      {
        $project: {
          title: 1,
          totalLikes: 1,
          "topics.name": 1,
          "authPost.name": 1,
          "authPost.avatar": 1,
          avatar: 1,
          view: 1,
          createdAt: 1,
          updatedAt: 1,
          format: 1,
          slug: 1,
          totalComments: 1,
          excerpt: 1,
          content: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ]);

    const total = await Post.count({ topics: topic._id });

    return res.status(200).json({
      data: {
        ...topic._doc,
        name: undefined,
        topic: topic.name,
        list: listPost,
        total,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// [GET] - [/posts-video]
export const getPostsVideo = async (req, res) => {
  try {
    const listVideo = await Post.find({
      format: FORMAT_POST.VIDEO,
      status: STATUS_POST.PUBLIC,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ list: listVideo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// [PATCH] - [/like_post/:id]
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

// [PATCH] - [/unlike_post/:id]
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

// [GET] - [/post_slide]
export const getPostSlide = async (req, res) => {
  try {
    const { skip, perPage } = pagination(req);

    if (req.query.type !== SLUG_TOPICS.FAVORITE) {
      return res.status(400).json({ message: "Not Found topic" });
    }

    const topic = await Topic.findOne({ slug: req.query.type }).select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    if (!topic) {
      return res.status(400).json({ message: "Not Found topic" });
    }

    const listPostSlide = await Post.aggregate([
      { $addFields: { totalLikes: { $size: "$likes" } } },
      {
        $match: {
          $and: [
            { totalLikes: { $gt: 0 } },
            { status: { $eq: STATUS_POST.PUBLIC } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authPost",
          foreignField: "_id",
          as: "authPost",
        },
      },
      { $unwind: "$authPost" },
      {
        $lookup: {
          from: "topics",
          localField: "topics",
          foreignField: "_id",
          as: "topics",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },

      { $addFields: { totalComments: { $size: "$comments" } } },
      { $sort: { totalLikes: -1, createdAt: -1 } },
      { $limit: perPage },
      { $skip: skip },

      {
        $project: {
          title: 1,
          "authPost.name": 1,
          "authPost.avatar": 1,
          totalComments: 1,
          totalLikes: 1,
          "topics.name": 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          avatar: 1,
        },
      },
    ]);
    return res.status(200).json({
      data: {
        ...topic._doc,
        name: undefined,
        topic: topic.name,
        list: listPostSlide,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// [PATCH]
export const updatePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { status } = req.body;

    const resData = await Post.findOneAndUpdate(
      { _id: post_id },
      { status },
      { new: true }
    );
    return res.status(200).json({ data: resData });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

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
    const listPost = await Post.find();
    return res.status(200).json({ msg: "Danh sách bài viết !", listPost });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

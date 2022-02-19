import Topic from "./../models/topicModel";

export const createTopic = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Không có tên chủ đề !" });
    }

    const topic = new Topic({ name });
    await topic.save();

    return res.status(200).json({ msg: "Thêm mới chủ đề thành công !" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    return res.status(200).json({ msg: "Danh sách chủ đề", topics });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

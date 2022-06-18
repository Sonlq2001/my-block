import Conversation from "./../models/conversationModel";
import Message from "./../models/messageModel";

export const postMessage = async (req, res) => {
	try {
		const { recipient, message, sender, ...rest } = req.body;
		if (!recipient || !message.trim()) {
			return;
		}
		const newConversation = await Conversation.findOneAndUpdate(
			{
				$or: [
					{ recipients: [sender, recipient] },
					{ recipients: [recipient, sender] },
				],
			},
			{ recipients: [sender, recipient], message, rest },
			{ new: true, upsert: true }
		);
		const newMessage = new Message({
			conversation: newConversation._id,
			sender,
			recipient,
			message,
			rest,
		});

		await newMessage.save();

		const messageChat = await newMessage.populate({
			path: "sender recipient",
			select: "name email avatar",
		});
		return res.status(200).json({ newMessage: messageChat });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getConversations = async (req, res) => {
	try {
		const conversations = await Conversation.find({
			recipients: req.user._id,
		})
			.populate({
				path: "recipients",
				select: "name email avatar",
			})
			.sort("-updatedAt");

		return res.status(200).json({ conversations, total: conversations.length });
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

export const getMessages = async (req, res) => {
	try {
		const dataMessages = await Message.find({
			$or: [
				{ sender: req.user._id, recipient: req.params.id },
				{ sender: req.params.id, recipient: req.user._id },
			],
		})
			.populate({
				path: "sender recipient",
				select: "name email avatar",
			})
			.sort("-createdAt");
		return res.status(200).json({
			listMessage: {
				list: dataMessages.reverse(),
				_id: req.params.id,
			},
			total: dataMessages.length,
		});
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

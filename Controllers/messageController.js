import { conversation } from "../Models/conversationSchema.js";
import { message } from "../Models/messageSchema.js";
import { getRecieverSocketId, io } from "../Socket/socket.js";

export const sendMessages = async (req, res) => {
  const senderId = req.id;
  const recieverId = req.params.id;
  const { messages } = req.body;

  let userConversation = await conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  });

  if (!userConversation) {
    userConversation = await conversation.create({
      participants: [senderId, recieverId],
    });
  }

  const newMessage = await message.create({
    senderId,
    recieverId,
    messages,
  });

  if (newMessage) {
    userConversation.messages.push(newMessage._id);
  }
  await Promise.all([userConversation.save(), newMessage.save()]);

  const recieverSocketId = getRecieverSocketId(recieverId);
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }

  return res.status(200).json({
    newMessage,
  });
};

export const getMessages = async (req, res) => {
  const senderId = req.id;
  const recieverId = req.params.id;
  const userConversation = await conversation
    .findOne({
      participants: { $all: [senderId, recieverId] },
    })
    .populate("messages");

  return res.status(200).json({
    getMessage: userConversation?.messages,
  });
};

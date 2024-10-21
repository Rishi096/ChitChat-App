const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { getRecieverSocketId, io } = require("../socket/socket");

exports.sendMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants :{$all :[senderId, recieverId]},

        });
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,recieverId],
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // this will run one by one
        // await conversation.save();
        // await newMessage.save();

        // this will run parallel
        await Promise.all([conversation.save(),newMessage.save()]);


        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            //io.to(<socketid/>).emit() functionality is used to send events to specific client.
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }

        

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message",error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}

exports.getMessage = async(req,res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId,userToChatId]},
        }).populate("messages");
        if (!conversation) {
            // Handle case where conversation is not found
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }
        
      res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage",error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}
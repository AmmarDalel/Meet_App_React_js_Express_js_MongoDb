import { getConversationRepository, getMessageRepository, getRoomRepository } from "../BdConnection";
import { Message } from "../entity/Message";
import { Request, Response  } from "express";
import { io , getReceiverSocketId} from "../index";
import { error } from "console";
import { ObjectId } from "mongodb";
const MsgRepository=getMessageRepository() ;
const ConversationRepository=getConversationRepository() ;
const RoomRepository=getRoomRepository() ;

export const sendMsg=async (req:Request, res:Response) =>{
  try{
    const {content ,type ,conversationId , senderId, receiverId }=req.body ;
    console.log('content : ',content , ' type : ', type , ' converstionId : ',conversationId , ' senderId : ',senderId) ;
    const msg=new Message() ;
    msg.content=content ;
    msg.conversation=conversationId;
    msg.sender=senderId ;
    msg.type=type ;
    await MsgRepository.save(msg) ;
    const conversation = await ConversationRepository.findOneById( String(conversationId)  );
    console.log('conversation from create msg : ',conversation) ;
    if(conversation){
      if(conversation?.messages){
        conversation?.messages.push(msg.id) ;
        console.log('msg.id : ', msg.id) ;
      }
      else{
        conversation.messages=[] ;
        console.log('msg.id : ', msg.id) ;
        conversation.messages.push(msg.id) ;
      }
      console.log('messages from create msg : ',conversation?.messages) ;
      await ConversationRepository.update(conversation.id, { messages:conversation.messages }, );

      console.log('msg is created and added in the database ') ;
        // socket io functionality
      const receiverSocketId = await getReceiverSocketId(receiverId)

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", msg)
      }

      res.status(201).json(msg)
      return msg.id ;
    }
    console.log('conversation not found ') ;
    res.status(400).json({ message: "Conversation not found" });
    console.log('msg is not created ') ;
    return null ;

  }
  catch(error){
    console.log('msg is not created ') ;
    res.status(500).json({ message: "Internal server error" });
    console.log(error) ;
    return null ;
  }
}


export const getMessages=async ( req:Request, res:Response)=>{
  try{
    const {roomId}=req.body ;
    const room = await RoomRepository.findOneById(String(roomId));
    if(room){
      const conversationId=room.conversation ;
      const conversation = await ConversationRepository.findOneById( new ObjectId(conversationId)  );
      if(conversation){
        console.log('conversation : ', conversation)
        const messagesIds=conversation.messages ;
        console.log('messagesIds : ',messagesIds) ;
        if(messagesIds){
          var messages:String[]=[] ;
          messagesIds.map(async (msgId, index) => {
            console.log(`Element at index ${index}: ${msgId}`);
            const msg = await MsgRepository.findOneById( String(msgId)  );
            console.log('msg : ',msg?.content)
            if(msg) messages.push(msg.content) ;

        });
        return res.status(200).json(messages)
        }
      }
      else{
        console.log('conversation not found') ;
        return res.status(200).json([])

      }

    }else{
      console.log('room not found') ;
      return res.status(200).json([])

    }

  }
  catch(error){
    console.log(error) ;
    return res.status(400) ;

  }
}

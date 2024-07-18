import { getMessageRepository } from "../BdConnection";
import { Message } from "../entity/Message";

const MsgRepository=getMessageRepository() ;

export const createMsg=async (content:string , type:string  , conversationId:string)=>{
  try{
    const msg=new Message() ;
    msg.content=content ;
    msg.conversation=conversationId;
    msg.type=type ;
    await MsgRepository.save(msg) ;
    console.log('msg is created and added in the database ') ;
    return msg.id ;

  }
  catch(error){
    console.log('msg is not created ') ;
    console.log(error) ;
    return null ;
  }
}
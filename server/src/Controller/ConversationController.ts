import { Conversation } from '../entity/Conversation';
import { getConversationRepository, getMessageRepository } from "../BdConnection";

let MsgRepository=getMessageRepository() ;
let conversationRepository=getConversationRepository() ;

export const createConversation=async ()=>{
  try{
    const conversation =new Conversation() ;
    conversation.messages=[] ;
    const savedconversation= await conversationRepository.save(conversation) ;
    console.log('conversation is created and added in the database ', String(savedconversation.id)) ;
    return  String(savedconversation.id);
  }
  catch(error){
    console.log('conversation is not created') ;
    console.log(error) ;
    return '' ;

  }
  
}


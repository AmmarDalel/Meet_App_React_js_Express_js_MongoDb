import { Request, Response } from 'express';
import { Conversation } from '../entity/Conversation';
import { getConversationRepository, getMessageRepository } from "../BdConnection";
import { createMsg } from './MessageController';
import { Message } from '../entity/Message';

let MsgRepository=getMessageRepository() ;
let conversationRepository=getConversationRepository() ;

export const createConversation=async ()=>{
  try{
    const conversation =new Conversation() ;
    conversation.messages=[] ;
    const savedconversation= await conversationRepository.save(conversation) ;
    console.log('conversation is created and added in the database ') ;
    return savedconversation.id ;
  }
  catch(error){
    console.log('conversation is not created') ;
    console.log(error) ;
    return '' ;

  }
  
}

export const addMessage=async (content:string , type:string , conversationId:string)=>{
  try{
   
      const msg=new Message() ;
      msg.content=content ;
      msg.conversation=conversationId;
      msg.type=type ;
      const savedMessage= await  MsgRepository.save(msg) ;
      console.log('msg is created and added in the database ')   
   
   const conversationPromise: Promise<Conversation | null> = conversationRepository.findOne({where:{id:conversationId}});

   const conversation = await conversationPromise;  
   if(!conversation){
    console.log(`conversation ${conversationId} not found`) ;
    return ;
   }
   conversation.messages.push(savedMessage.id) ;
   await conversationRepository.save(conversation) ;
   console.log('conversation is created and added in the database ') ;
   
   }
   catch(error){
    console.log('msg is not added in the conversation') ;
    console.log(error) ;
  
   }
}


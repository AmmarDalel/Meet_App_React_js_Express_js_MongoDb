import { Room } from "../entity/Room";
import { getRoomRepository, getUserRepository , getHistoricCallRepository } from "../BdConnection";
import { createConversation } from "./ConversationController";
import { Call } from "../entity/Call";
import { Request, Response } from "express";
import internal from "stream";
import { ObjectId } from "typeorm";
import e from "cors";


const roomRepository = getRoomRepository(); 
const userRepository = getUserRepository();
let callRepository=getHistoricCallRepository() ;

export const CreateRoom = async (email: string, peerId: string, roomId: string) => {
    try {
        const createdby = await userRepository.findOne({ where: { email } });
        if (!createdby) {
            throw new Error(`User with email ${email} not found`);
        }
        createdby.peerid=peerId ;
        const updatedcreatedby= await userRepository.save(createdby) ;
        // room creation 
        const room = new Room();
        room.roomId = roomId;
        room.type = 'p2p';
        room.createdBy = updatedcreatedby;
        room.participants=[] ;
        room.participantsInTheRoom=[] ;
        room.participants.push(createdby.id) ;
        room.participantsInTheRoom.push(createdby.id) ;
        
        //conversation creation 
        room.conversation = String(createConversation()) ;
       
        const call=new Call() ;
        call.callType='video' ;
        call.endTime=undefined ;
        const savedcall= await callRepository.save(call) ;

        room.call =savedcall.id ;

        await roomRepository.save(room);
    } catch (error) {
        console.log(error);
    }
}

export const AddParticipant = async (email: string, peerId: string, roomId: string) => {
  try {
    // Trouver le participant par email
    const participant = await userRepository.findOne({ where: { email } });
    if (!participant) {
      throw new Error(`Participant with email ${email} not found`);
    }
    participant.peerid=peerId ;
    const updatedparticipant=userRepository.save(participant) ;
    // Trouver la salle par ID et charger les participants existants
    const room = await roomRepository.findOne({ where: { roomId: roomId }});
    if (!room) {
      throw new Error(`Room with id ${roomId} not found`);
    }
    // Ajouter le participant à la salle
    console.log(room.participants) ;
    room.participantsInTheRoom.push(participant.id) ;
    room.participants.push(participant.id) ;
    console.log(room.participants) ;
    // Sauvegarder les modifications de la salle
    await roomRepository.update(room.id, { participants: room.participants });

  } catch (error) {
    console.error('Error adding participant:', error);
  }
};

export const LeaveParticipant = async ( peerId: string, roomId: string , duration:string) => {
  try{
    const participant = await userRepository.findOne({ where: {peerid: peerId } });
    const room = await roomRepository.findOne({ where: {roomId:roomId } });

    if(participant && room){

      const updatedParticipants = room.participantsInTheRoom.filter(participantroom => participantroom !== participant.id);
      console.log(participant) ;
     
     if(!room.duration) room.duration=[] ;
     const currentDate=new Date() ;
     const currentTime=currentDate.getTime() ;
     console.log('currentDate : ', currentDate) ;
     console.log('currentTime : ',currentTime) ;
     console.log(duration)
     console.log('duration : ' , parseInt(duration) )
     const test =currentDate.getTime() - parseInt(duration) ;
     console.log('test : ', test)
     const startTime = new Date(test);
     console.log('start time : ',startTime)

     //room.duration.push(`the participant ${participant.id} enter the room on [time of join] and left after ${duration} mn`)
    
  
    


    }}
  catch(error){
    console.log(error) ;
  }
} ;

interface IntParticipant {
  name: string;
}

export const getParticipantsInRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    
    if (!roomId) {
      return res.status(400).json({ error: "roomId is required" });
    }

    const room = await roomRepository.findOne({ where: { roomId: roomId } });

    if (room) {
      console.log('room ---------------- participants : ',room.participantsInTheRoom)
      // Création d'un tableau pour stocker les participants
      const participants: IntParticipant[] = [];

      const participantPromises = room.participantsInTheRoom.map(async (element: String) => {
        console.log('element : ',String(element))
        const p = await userRepository.findOneById(String(element))
          console.log('p : ',p)    
        if (p) {
          // Création d'un objet IntParticipant avec les données nécessaires
          const part: IntParticipant = { name: p.fullName }; // Ajustez la clé pour correspondre à votre modèle
          participants.push(part);
        }
      });



      // Attendre que toutes les promesses soient résolues
      await Promise.all(participantPromises);

      console.log('participants from get participants in the room : ' , participants) ;


      return res.status(200).json(participants);
    } else {
      return res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
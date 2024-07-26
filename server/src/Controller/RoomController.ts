import { Room } from "../entity/Room";
import { getRoomRepository, getUserRepository , getHistoricCallRepository } from "../BdConnection";
import { createConversation } from "./ConversationController";
import { Call } from "../entity/Call";


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
        room.participants.push(createdby.id) ;
        
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
    room.participants.push(participant.id) ;
    console.log(room.participants) ;
    // Sauvegarder les modifications de la salle
    await roomRepository.update(room.id, { participants: room.participants });

  } catch (error) {
    console.error('Error adding participant:', error);
  }
};

export const LeaveParticipant = async ( peerId: string, roomId: string) => {
  try{
    const participant = await userRepository.findOne({ where: {peerid: peerId } });
    const room = await roomRepository.findOne({ where: {roomId:roomId } });

    if(participant && room){
      participant.peerid='' ;
      participant.room=new Room() ;
      //supprimer le participant qui a quitter le room
      const updatedParticipants = room.participants.filter(p => String(p) !== String(participant.id));

      // ajouter l'heure de fin du Call
      if(updatedParticipants.length==0){
       const id=room.call ;
        const call = await callRepository.findOneById(id);
        if(call) {
          call.endTime=new Date() ;
          await callRepository.save(call) ;
        }

      }
      //mise à jour du tableau des participants 
      room.participants=updatedParticipants ;
      await roomRepository.save(room) ;
      await userRepository.save(participant)
  
    }


  }
  catch(error){
    console.log(error) ;
  }
}

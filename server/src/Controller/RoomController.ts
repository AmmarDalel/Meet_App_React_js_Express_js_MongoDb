import { Room } from "../entity/Room";
import { User } from "../entity/User";
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
        console.log('participants : ', room.participants) ;
        
        //conversation creation 
        room.conversation = String(createConversation()) ;
       
        const call=new Call() ;
        call.callType='video' ;
        const savedcall= await callRepository.save(call) ;

        room.call =savedcall.id ;

        await roomRepository.save(room);
        console.log('Room created in the database');
    } catch (error) {
        console.log('Room not created in the database');
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

    console.log('participants :', room.participants)

    // Ajouter le participant à la salle
    //room.participants = room.participants ? [...room.participants, participant] : [participant];
    console.log(room.participants) ;
    room.participants.push(participant.id) ;
    console.log(room.participants) ;
    // Sauvegarder les modifications de la salle
    await roomRepository.update(room.id, { participants: room.participants });

    console.log('Participant added successfully');
  } catch (error) {
    console.error('Error adding participant:', error);
  }
};
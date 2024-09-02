import { Room } from "../entity/Room";
import { getRoomRepository, getUserRepository , getHistoricCallRepository } from "../BdConnection";
import { createConversation } from "./ConversationController";
import { Call } from "../entity/Call";
import { Request, Response } from "express";



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
        createdby.online=true ;
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
        const conversation=await createConversation() ;
        room.conversation = String(conversation) ;
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
    participant.online=true ;
    const updatedparticipant=userRepository.save(participant) ;
    // Trouver la salle par ID et charger les participants existants
    const room = await roomRepository.findOne({ where: { roomId: roomId }});
    if (!room) {
      throw new Error(`Room with id ${roomId} not found`);
    }
    // Ajouter le participant à la salle
    room.participantsInTheRoom.push(participant.id) ;
    room.participants.push(participant.id) ;
    // Sauvegarder les modifications de la salle
    const test =await roomRepository.update(room.id, { participants: room.participants , participantsInTheRoom:room.participantsInTheRoom }, );

  } catch (error) {
    console.error('Error adding participant:', error);
  }
};


export const LeaveParticipant = async (peerId: string, roomId: string, duration: string) => {
  try {
    // Recherche du participant par peerId
    const participant = await userRepository.findOne({ where: { peerid: peerId } });
    // Recherche de la salle par roomId
    const room = await roomRepository.findOne({ where: { roomId: roomId } });

    if (participant && room) {
      // Filtrage des participants de la salle pour enlever le participant qui quitte
      participant.online=false ;
      const updatedparticipant=userRepository.save(participant) ;
      const updatedParticipants = room.participantsInTheRoom.filter(participantRoom => String(participantRoom) !== String(participant.id));
      room.participantsInTheRoom= updatedParticipants ;
      // Si room.durationHistory n'existe pas, l'initialiser comme un tableau vide
      if (!room.durationHistory) room.durationHistory = [];

      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      const durationInMilliseconds = parseInt(duration) * 1000; // Assurez-vous que la durée est en secondes et non en millisecondes

      // Calcul du temps d'entrée en soustrayant la durée de l'appel du temps actuel
      const entryTime = new Date(currentTime - durationInMilliseconds);

      // Conversion de la durée en hh:mm:ss
      const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;
      const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      // Ajouter l'entrée de durée au tableau room.durationHistory
      room.durationHistory.push(`The participant ${participant.fullName} entered the room on ${entryTime.toISOString()} and left after ${formattedDuration} minutes`);

      // Mise à jour de la salle avec les participants modifiés et la nouvelle durée
     // await roomRepository.save({ ...room, participantsInTheRoom: updatedParticipants });

      const test =await roomRepository.update(room.id, { participantsInTheRoom:room.participantsInTheRoom }, );

      return participant ;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getParticipantsInRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    
    if (!roomId) {
      return res.status(400).json({ error: "roomId is required" });
    }

    const room = await roomRepository.findOne({ where: { roomId: roomId } });

    if (room) {
      // Création d'un tableau pour stocker les participants
      const participants: any[] = [];

      const participantPromises = room.participantsInTheRoom.map(async (element: String) => {
        const p = await userRepository.findOneById(String(element))
        if (p) {
          participants.push(p);
        }
      });

      // Attendre que toutes les promesses soient résolues
      await Promise.all(participantPromises);

      return res.status(200).json(participants);
    } else {
      return res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid" ;
import { AddParticipant, CreateRoom , LeaveParticipant } from "../Controller/RoomController";

const rooms:Record<string , string[]>={}
interface IJoinRoom{
    roomId :string;
    peerId:string;
    email:string ;
}

interface IRoomParams{
  roomId :string;
  peerId:string;
  
}

interface ICreateRoom{
  userId :any ;
  peerId:string;
  email:string ;

}

export const RoomHandler = (socket: Socket) => {
    
  const createRoom = ({userId , peerId , email}:ICreateRoom)=> {
    console.log(userId)
    const roomId=uuidV4() ;
    rooms[roomId]=[] ;
    rooms[roomId].push(peerId) ;
    try{
      CreateRoom(email, peerId , roomId ) ;
    }catch(error){
      console.log(error)
    }
    socket.emit('room-created' , {roomId}) ;
    socket.on('disconnect', () => {
        //leaveRoom({roomId , peerId}) ;
    ;}) ;
   }

   const  joinRoom = ({roomId ,  peerId , email}:IJoinRoom)=> {
    if(rooms[roomId]){
      rooms[roomId].push(peerId) ;
      socket.join(roomId) ;
      console.log('roomId from joinRoom : ', roomId) ;
      socket.broadcast.emit("user-joined",peerId);
      AddParticipant(email , peerId, roomId) ;
      socket.emit('get-users',{
      roomId ,
      participants:rooms[roomId] ,
     }) ;
    }

    socket.on('disconnect', () => {
     // leaveRoom({roomId , peerId}) ; 
    })

   }
  
   const leaveRoom=({roomId , peerId}:IRoomParams)=>{
      rooms[roomId]=rooms[roomId].filter((id)=>id!==peerId) ;
      LeaveParticipant(peerId , roomId) ;
      socket.to(roomId).emit("user-disconnected" , peerId) ;
  
   }
  

  socket.on('create-room', createRoom);
  socket.on('join-room',joinRoom );

}



import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid" ;
import { AddParticipant, CreateRoom } from "../Controller/RoomController";

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

export const callHandler = (socket: Socket) => {
    
  console.log('connected');

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
    socket.emit('room-create' , {roomId}) ;
    console.log('user created the room') ;
    socket.on('disconnect', () => {
        console.log("user left the room")
        //leaveRoom({roomId , peerId})
    ;}) ;
   }

   const  joinRoom = ({roomId ,  peerId , email}:IJoinRoom)=> {
    if(rooms[roomId]){
      rooms[roomId].push(peerId) ;
      console.log('user joined the room ',roomId , peerId) ;
      socket.join(roomId) ;
      AddParticipant(email , peerId, roomId) ;
      socket.emit('get-users',{
      roomId ,
      participants:rooms[roomId] ,
     }) ;
    }

    socket.on('disconnect', () => {
      console.log("user left the room")
      //leaveRoom({roomId , peerId}) ;
      
    })

   }
  
   /*const leaveRoom=({roomId , peerId}:IRoomParams)=>{
      rooms[roomId]=rooms[roomId].filter((id)=>id!==peerId) ;
      socket.to(roomId).emit("user-disconnected" , peerId) ;
  
   }
  */

  socket.on('create-room', createRoom);
  socket.on('join-room',joinRoom );
}



import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid" ;
import {createHistoricCall , AddUser} from '../Controller/HistoriCallController' ;

interface ICallParams{
    callId :string;
    userId:string;
    peerId :string ;
}
export const callHandler=(socket:Socket)=>{
    console.log('from callhandler')
    try{
        const createCall=()=>{
            console.log('from createcall')
            const callId=uuidV4() ;
            createHistoricCall( callId ) ;
            socket.emit('call-created',{callId}) ;
            console.log("user created the call") ;
        }
    
        const joinCall=({callId ,userId , peerId}:ICallParams)=>{
            
            socket.join(callId) ;
            //createHistoricCall(userId, callId , peerId) ;
            AddUser(callId , userId , peerId)
            console.log('user joined the call' , callId , peerId) ;
    
            socket.on("disconnect",()=>{
                console.log("user left the call") ;
                leaveCall({callId , userId , peerId}) ;
            }) ;
    
            const leaveCall=({callId ,userId, peerId}:ICallParams)=>{
    
                //supprimer user du call
    
                socket.to(callId).emit("user-disconnected" , peerId) ;
        }
        
        socket.on('start-call',createCall) ;
        socket.on('join-call',joinCall) ;
    
    }
    }
    catch(error){
        console.log(error)
    }

 
}


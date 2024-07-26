import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from 'socket.io-client' ;
import Peer from 'peerjs' ;
import {v4 as uuidV4} from "uuid" ;
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const WS='http://localhost:5000' ;

export const CallContext=createContext<null | any>(null) ;

const ws=socketIO(WS) ;

interface CallProviderProps {
    children: ReactNode; // Typing children as ReactNode
  }
export const CallProvider: React.FC<CallProviderProps> =({children})=>{
    const navigate=useNavigate() ;
    const [me , setMe] =useState<Peer>() ;
    const [stream , setStream]=useState<MediaStream>() ;
    const [peers , dispatch]=useReducer(peerReducer,{}) ;
    const [participants, setParticipants] = useState<string[]>([]);
    const leaveCall = useSelector((state: RootState) => state.user.leavecall);


  const enterRoom=({roomId}:{roomId:"String"})=>{
        navigate(`/call/${roomId}`)
     
    }

    const getUsers=({participants}:{participants:string[]})=>{
      setParticipants(participants) ;
      console.log({participants}) ;
    }

    const removePeer=(peerId:string)=>{
      dispatch(removePeerAction(peerId)) ;
    }

   useEffect(()=>{
    const meId=uuidV4() ;
    const peer=new Peer(meId) ;
    setMe(peer) ;

    ws.on("room-create",enterRoom) ;
    try{
      navigator.mediaDevices.getUserMedia({video:true ,audio:false})
      .then((stream)=>{
        setStream(stream) ;
      });
    }
    catch(error){
      console.log(error) ;
    }
    ws.on("get-users",getUsers)
    if(!leaveCall) 
      {console.log(leaveCall)
        ws.on("user-disconnected",removePeer) ;
      }
   } ,[])

   useEffect(()=>{
    if(leaveCall) 
      {console.log(leaveCall)
        ws.on("user-disconnected",removePeer) ;}
   },[leaveCall])

   useEffect(()=>{
    if(!me){ console.log('!me') ; return} ;
    if(!stream) { console.log('!stream') ; return} ;
    ws.on('user-joined',(peerId)=>{
      const call =me.call(peerId , stream) ;
      call.on("stream",(peerStream)=>{
    
        dispatch(addPeerAction(peerId , peerStream)) ;
      }) ;
    }) ;

    me.on("call",(call)=>{
      call.answer(stream) ;
      call.on("stream",(peerStream)=>dispatch(addPeerAction(call.peer, peerStream))) ;
    })
   },[me , stream]) ;
  
   console.log({peers}) ;
    return <CallContext.Provider value={{ ws , me  , stream  , peers}}>{children}</CallContext.Provider>;
}
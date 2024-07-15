import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from 'socket.io-client' ;
import Peer from 'peerjs' ;
import {v4 as uuidV4} from "uuid" ;

const WS='http://localhost:5000' ;

export const CallContext=createContext<null | any>(null) ;

const ws=socketIO(WS) ;

interface CallProviderProps {
    children: ReactNode; // Typing children as ReactNode
  }
export const CallProvider: React.FC<CallProviderProps> =({children})=>{
    const navigate=useNavigate() ;
    const [me,setMe]=useState<Peer>() ;

    const enterCall=({callId}:{callId:'string'})=>{
        console.log({callId}) ;
        navigate(`/call/${callId}`) ;
    }
    useEffect(()=>{
        const meId=uuidV4();
        const peer=new Peer(meId) ;
        setMe(peer) ;
        console.log('CallProvider useeffect       :  ',peer)
        
        ws.on("call-created",enterCall) ; 
      
    },[]);

    return <CallContext.Provider value={{ ws , me }}>{children}</CallContext.Provider>;
}
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
    const [me , setMe] =useState<Peer>() ;

    

   useEffect(()=>{
    const meId=uuidV4() ;
    const peer=new Peer(meId) ;
    setMe(peer) ;
//console.log('me from call context : ',peer)
   } ,[])

   useEffect(()=>{
  
   } ,[me])
 

  
  
    return <CallContext.Provider value={{ ws , me }}>{children}</CallContext.Provider>;
}
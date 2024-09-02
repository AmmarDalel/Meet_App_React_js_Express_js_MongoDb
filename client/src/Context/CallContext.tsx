import { createContext, ReactNode, useEffect,  useState } from "react";
import socketIO from 'socket.io-client' ;
import Peer from 'peerjs' ;
import {v4 as uuidV4} from "uuid" ;

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const WS='http://localhost:5000' ;

export const CallContext=createContext<null | any>(null) ;
const cookies = new Cookies();
var usertoken=null ;
var userdata=null ;
var userId: string | null=null ;
try{
  usertoken=cookies.get('user') ;
  userdata = jwtDecode(usertoken.token); // decode your token here
  userId = String(userdata.userid);
}
catch(error){
  console.log(error) ;
}
const ws=socketIO(WS,{
  query: {
    userId: userId,
  },
}) ;

interface CallProviderProps {
    children: ReactNode; // Typing children as ReactNode
  }
export const CallProvider: React.FC<CallProviderProps> =({children})=>{
    const [me , setMe] =useState<Peer>() ;

    

   useEffect(()=>{
    const meId=uuidV4() ;
    const peer=new Peer(meId) ;
    setMe(peer) ;
   } ,[])

 

  
  
    return <CallContext.Provider value={{ ws , me }}>{children}</CallContext.Provider>;
}
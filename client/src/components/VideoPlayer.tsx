import { useContext, useEffect , useRef, useState } from "react";
import { CallContext } from "../Context/CallContext";
import { SocketContext } from "../Context/SocketIo";

export const VideoPlayer:React.FC<{stream:MediaStream}>=({stream})=>{
    //callEnded
    const { callEnded , peers} = useContext(SocketContext);
    const [participants , setParticipants]=useState(false) ;

   
  

    const videoref=useRef<HTMLVideoElement>(null) ;

    useEffect(()=>{
        if(videoref.current)videoref.current.srcObject=stream ;

    },[stream]) ;

    useEffect(() => {
     // console.log('peers useeefect : ' , Object.values(peers).length)
      //console.log('participants from videoplayer : ', participants)

        // Vérifiez si `peers` a des valeurs
        if (Object.values(peers).length > 0) {
          setParticipants(true);
         // console.log('>0' , Object.values(peers).length)
        } else {
         // console.log('=0 ' ,  Object.values(peers).length)
          setParticipants(false);
        }
      }, [peers]);


    return (callEnded && !participants )? <></> : <video ref={videoref} autoPlay  style={{width:'100%' , height:'100%' }} // Inverser horizontalement l'image
    /> ;
}
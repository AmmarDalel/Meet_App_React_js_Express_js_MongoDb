import { useEffect , useRef } from "react";

export const VideoPlayer:React.FC<{stream:MediaStream}>=({stream})=>{

    const videoref=useRef<HTMLVideoElement>(null) ;

    useEffect(()=>{
        if(videoref.current)videoref.current.srcObject=stream ;
    },[stream]) ;

    return <video ref={videoref} autoPlay  style={{ transform: 'scaleX(-1)'  , width:'100%' , height:'100%'}} // Inverser horizontalement l'image
    /> ;
}
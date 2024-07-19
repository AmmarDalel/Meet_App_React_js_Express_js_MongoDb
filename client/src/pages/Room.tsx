import { useParams } from 'react-router-dom';
import { RoomContainer } from '../components/Room/RoomContainer'
import { useContext, useEffect } from 'react';
import { CallContext } from '../Context/CallContext';

export default function Room() {
  const {id}=useParams() ;
  const {ws,me}=useContext(CallContext) ;

  useEffect(()=>{
   if(me) ws.emit('join-room',{roomId:id}) ;
  },[id,me,ws])

  return (
    <>
    <RoomContainer/>

    </>
  )
}

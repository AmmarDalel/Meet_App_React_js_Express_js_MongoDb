import './RoomContainer.css';
import ControllBar from './ControllBar/ControllBar';
import { VideoPlayer } from '../VideoPlayer';
import { useContext, useEffect, useState } from 'react';
import { CallContext } from '../../Context/CallContext';
import { SocketContext } from '../../Context/SocketIo';
import { PeerState } from '../../Context/peerReducer';
import Counter from './Counter';

export function EmptyRoomContainer() {
  return (
    <div className='RoomContainer'>
    </div>
  )
}

export function RoomContainer() {
  const {callEnded ,stream , peers , timeElapsed} = useContext(SocketContext);
  const [participants , setParticipants]=useState(false) ;
  const [callended , setCallended]=useState(false) ;


  useEffect(() => {
    // Vérifiez si `peers` a des valeurs
    if (Object.values(peers).length > 0) {
      setParticipants(true);
      console.log('>0' , Object.values(peers).length)

    } else {
      setParticipants(false);
      console.log('=0' , Object.values(peers).length)

    }
  }, [peers]);

  useEffect(() => {
    setCallended(callEnded) ;
   console.log('callended : ', callEnded)
  }, [callEnded]);
  return (
    <div className='RoomContainer'>
      <div className='counterdiv'>
      <Counter time={timeElapsed}></Counter>

      </div>
      <div className={(participants && !callEnded )? 'me':'video'}>
       <VideoPlayer stream={stream}/>
      </div>

     
        <div className={callended? 'videocancel' : 'video'}>
          {Object.values(peers as PeerState).map((peer) => (
            // Ensure each iteration returns a valid React element
            <div key={peer.id}>
              <VideoPlayer stream={peer.stream} />
            </div>
          ))}
        </div>
    
      <ControllBar/>

    </div>
  )
}
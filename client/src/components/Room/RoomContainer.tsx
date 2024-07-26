import './RoomContainer.css';
import ControllBar from './ControllBar/ControllBar';
import { VideoPlayer } from '../VideoPlayer';
import { useContext, useEffect, useState } from 'react';
import { CallContext } from '../../Context/CallContext';
import { PeerState } from '../../Context/peerReducer';

export function EmptyRoomContainer() {
  return (
    <div className='RoomContainer'>
    </div>
  )
}

export function RoomContainer() {
  const {stream , peers} = useContext(CallContext);
  const [participants , setParticipants]=useState(false) ;
  useEffect(() => {
    // Vérifiez si `peers` a des valeurs
    if (Object.values(peers).length > 0) {
      setParticipants(true);
    } else {
      setParticipants(false);
    }
  }, [peers]);

  return (
    <div className='RoomContainer'>
      <div className={participants? 'me':'video'}>
       <VideoPlayer stream={stream}/>
      </div>

      <div className='video'>
        {
          Object.values(peers as PeerState).map((peer) => (
            // Ensure each iteration returns a valid React element
            <VideoPlayer  stream={peer.stream} />
          ))
        }

      </div>
      <ControllBar/>

    </div>
  )
}
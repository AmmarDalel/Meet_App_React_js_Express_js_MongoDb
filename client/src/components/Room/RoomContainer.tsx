import './RoomContainer.css';
import ControllBar from './ControllBar/ControllBar';
import { VideoPlayer } from './VideoPlayer';

export function EmptyRoomContainer() {
  return (
    <div className='RoomContainer'>
    </div>
  )
}

export function RoomContainer() {
  return (
    <div className='RoomContainer'>

      <VideoPlayer/>
      <ControllBar/>

    </div>
  )
}
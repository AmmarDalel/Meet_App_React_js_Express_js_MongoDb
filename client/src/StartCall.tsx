import { EmptyRoomContainer } from './components/Room/RoomContainer'
import RightSidebar from './components/Rightbar/Sidebar'
import StartCallPanel from './components/Rightbar/StartCallPanel'

function StartCall() {
  return (
    <div className='appcontainer'> 
    <EmptyRoomContainer/>
    <RightSidebar>
        <StartCallPanel/>
    </RightSidebar>
    
  </div> 
  )
}

export default StartCall
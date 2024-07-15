import { EmptyRoomContainer } from './components/Room/RoomContainer'
import RightSidebar from './components/Rightbar/Sidebar'
import ErrorMessage from './components/Rightbar/ErrorMessage'

function IncorrectCode() {
  return (
    <div className='appcontainer'> 
     <EmptyRoomContainer/>
     <RightSidebar>
         <ErrorMessage/>
     </RightSidebar>
     
   </div> 
  )
}

export default IncorrectCode
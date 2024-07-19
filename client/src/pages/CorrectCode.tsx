import React from 'react'
import { EmptyRoomContainer } from '../components/Room/RoomContainer'
import RightSidebar from '../components/Rightbar/Sidebar'
import SuccessMessage from '../components/Rightbar/SuccessMessage'

function CorrectCode() {
  return (
    <div className='appcontainer'> 
     <EmptyRoomContainer/>
     <RightSidebar>
         <SuccessMessage/>
     </RightSidebar>
     
   </div> 
  )
}

export default CorrectCode
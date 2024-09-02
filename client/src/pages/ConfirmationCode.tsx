import EmptyRoomContainer from '../components/Room/EmptyRoomContainer'
import RightSidebar from '../components/Rightbar/Sidebar'
import CodeForm from '../components/Rightbar/CodeForm'

function ConfirmationCode() {
  return (
    <div className='appcontainer'> 
    
          <EmptyRoomContainer/>
            <RightSidebar>
                <CodeForm/>
            </RightSidebar>
          
        </div> 
  )
}

export default ConfirmationCode
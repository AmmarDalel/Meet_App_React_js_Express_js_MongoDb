import './RoomContainer.css'
import logo from '../../assets/logo-virtual-meeting.png'
function EmptyRoomContainer() {
  return (
    <div className='EmptyRoomContainer'>
      <div className='logoContainer'>
        <img  src={logo} id='logo'/>
      </div>
    </div>
  )
}

export default EmptyRoomContainer
import RightSidebar from '../components/Rightbar/Sidebar';
import EmptyRoomContainer from '../components/Room/EmptyRoomContainer';
import AuthForm from '../components/Rightbar/AuthForm';

function Authentificate() {
  return (
 
        <div className='appcontainer'> 
      
          <EmptyRoomContainer/>
          <RightSidebar>
              <AuthForm/>
          </RightSidebar>
          
        </div> 
 
  )
}

export default Authentificate
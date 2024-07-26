import '../components/Room/RoomContainer.css'
import {RoomContainer} from '../components/Room/RoomContainer'
import RightSidebar from '../components/Rightbar/Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Redux/Store'
import { setCallId } from '../Redux/features/user'
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode'
import SessionId from '../components/Rightbar/SessionId'
function Call() {
    const {id}=useParams<string>() ;
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    const usertoken = cookies.get('user');
    const userdata = jwtDecode(usertoken.token); 
    dispatch(setCallId(String(id)));
    
  return (
    <div className='appcontainer'> 
        <RoomContainer/>
        <RightSidebar > 
          {id?<SessionId roomId={id}/> :<></>}
        </RightSidebar>             
    </div>
  )
}

export default Call


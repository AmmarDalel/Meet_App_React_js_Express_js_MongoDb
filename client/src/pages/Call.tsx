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
import { useEffect } from 'react'
import { ParticipantsProvider } from '../Data/participants'
function Call() {
    const {id}=useParams<string>() ;
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    const usertoken = cookies.get('user');
    const userdata = jwtDecode(usertoken.token); 
    useEffect(() => {
      dispatch(setCallId(String(id)));
    }, [dispatch, id]);
    
  return (
    <div className='appcontainer'> 
        <RoomContainer/>
        <ParticipantsProvider>
          <RightSidebar > 
            {id?<SessionId roomId={id}/> :<></>}
          </RightSidebar>
        </ParticipantsProvider>        
    </div>
  )
}

export default Call


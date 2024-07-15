import React, { useContext, useEffect } from 'react'
import './components/Room/RoomContainer.css'
import {RoomContainer} from './components/Room/RoomContainer'
import RightSidebar from './components/Rightbar/Sidebar'
import { useParams } from 'react-router-dom'
import { CallContext } from './Context/CallContext'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './Redux/Store'
import { setCallId } from './Redux/features/user'
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode'
function Call() {
    const {id}=useParams() ;
    const {ws , me}=useContext(CallContext) ;
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    const usertoken = cookies.get('user');
    const userdata = jwtDecode(usertoken.token); 
    const userid = String(userdata.userid);
    dispatch(setCallId(String(id)));



    useEffect(() => {
        console.log('me : ',me)
        if(me) ws.emit('join-call', { callId: id, userId: userid, peerId: me._id });
        
    }, [id , me , ws]);
    
  return (
    <div className='appcontainer'> 
        <RoomContainer/>
        <RightSidebar />              
    </div>
  )
}

export default Call


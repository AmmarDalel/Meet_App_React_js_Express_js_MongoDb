import React , { useContext, useState } from 'react'
import InputComponent from './Input'; // Assurez-vous que le chemin vers InputComponent est correct
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './StartCallPanel.css';
import { CallContext } from '../../Context/CallContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store';
import { setCallId, setIsInRoom } from '../../Redux/features/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

function StartCallPanel() {
  const navigate=useNavigate() ;
    const [targetid, setTargetid] = useState('');
    const [CopySessionId,setCopySessionId]=useState('');
   // const userId=useSelector((state:RootState)=>state.user.id);
   
    const { ws  , me} = useContext(CallContext);
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    var usertoken=null ;
    var userdata=null ;
    var userId=null ;
    var email=null ;
    
    try{
      usertoken=cookies.get('user') ;
      userdata = jwtDecode(usertoken.token); // decode your token here
      //console.log('userdata : ',userdata)
      userId = String(userdata.userid);
      email=String(userdata.email);
    }
    catch(error){
      console.log(error) ;
    }
    /*-------------------------*/

    const handleCopy=()=>{
      navigator.clipboard.writeText(targetid);
      alert('copied');
    }
      const createRoom = async () => {
        console.log('user id to create room : ',userId , email)
        ws.emit('create-room' , { userId : userId ,peerId:me._id ,email :email}) ;
        //navigate(`/call/`)
       
      };

      const joinRoom=async () => {
        console.log('targetid : ',targetid)
        const roomId=targetid ;
       ws.emit('join-room',{roomId: roomId , peerId:me._id , email :email})
       ws.on('new user is joined the room',()=>{
        console.log('new user is joined the room')
      })
       // roomId=targetid ;
        navigate(`/call/${targetid}`) ;
      
      };


  return (
    <div style={{ padding: '16px' }}>
      <label className='label'>Session Id</label>
      <div className='sessionidcontainer'>
        <p >{}</p>
        <ContentCopyIcon style={{cursor:'pointer', width:'20px',height:'20px'}} onClick={()=>{handleCopy()}}/>
      </div>
    <InputComponent
      title='Target Id' 
      inputtype='text'
      value={targetid}
      changevalue={(e: React.ChangeEvent<HTMLInputElement>) => setTargetid(e.target.value)}

    />
        <Button  variant="outlined" sx={{
          marginTop:'75%',
          fontSize: '12px',
          borderRadius: '8px',
          width: '100%',
          height:'44px',
          textTransform: 'none', // Remove uppercase
          backgroundColor:'#2D8CFF',
          color:'white',
          border:'none'
        

        }}
        onClick={()=>{  (targetid!='')? joinRoom(): createRoom() }}
        >Start Call</Button>
    </div>
  )
}

export default StartCallPanel



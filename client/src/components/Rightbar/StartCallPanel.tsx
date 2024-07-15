import React , { useContext, useState } from 'react'
import InputComponent from './Input'; // Assurez-vous que le chemin vers InputComponent est correct
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './StartCallPanel.css';
import { CallContext } from '../../Context/CallContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

function StartCallPanel() {
    const [targetid, setTargetid] = useState('');
    const [CopySessionId,setCopySessionId]=useState('hello');
    const SessionId=useSelector((state:RootState)=>state.user.callId);

    const {ws} =useContext(CallContext) ;

    const handleCopy=()=>{
      navigator.clipboard.writeText(CopySessionId);
      alert('copied');
    }

    const StartCall=()=>{
      console.log('hello from start call')
      ws.emit('start-call') ;
    }
  return (
    <div style={{ padding: '16px' }}>
      <label className='label'>Session Id</label>
      <div className='sessionidcontainer'>
        <p >{SessionId}</p>
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
        onClick={()=>{StartCall()}}
        >Start Call</Button>
    </div>
  )
}

export default StartCallPanel
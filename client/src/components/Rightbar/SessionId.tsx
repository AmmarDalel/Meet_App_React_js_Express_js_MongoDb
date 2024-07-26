import ContentCopyIcon from '@mui/icons-material/ContentCopy';
interface SessionIdProps {
    roomId: string;
  }
  
function SessionId( {roomId}:SessionIdProps) {
    const handleCopy=()=>{
        navigator.clipboard.writeText(roomId);
        alert('copied');
      }
  return (
    <div style={{ padding: '16px' }}>
    <label className='label'>Session Id</label>
    <div className='sessionidcontainer'>
      <p >{roomId}</p>
      <ContentCopyIcon style={{cursor:'pointer', width:'20px',height:'20px'}} onClick={()=>{handleCopy()}}/>
    </div>
    </div>
  )
}

export default SessionId
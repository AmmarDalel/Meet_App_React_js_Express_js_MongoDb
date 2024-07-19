
import './SuccessMessage.css'
import './Form.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';




function SuccessMessage() {
 const userId = useSelector((state: RootState) => state.user.id.id);
  const navigate = useNavigate();

  const close=()=>{
   navigate(`/StartCall/${userId}`)
  }


  return (
    <>
     <div className='container1'>
      {     /* <CheckCircleIcon sx={{ fontSize: 40, color: '#2D8CFF' }}  />*/}  
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.0002 3.33325C10.8102 3.33325 3.3335 10.8099 3.3335 19.9999C3.3335 29.1899 10.8102 36.6666 20.0002 36.6666C29.1902 36.6666 36.6668 29.1899 36.6668 19.9999C36.6668 10.8099 29.1902 3.33325 20.0002 3.33325ZM27.1343 17.1341L18.801 25.4674C18.5568 25.7116 18.2368 25.8333 17.9168 25.8333C17.5968 25.8333 17.2768 25.7116 17.0327 25.4674L12.866 21.3008C12.3777 20.8124 12.3777 20.0216 12.866 19.5333C13.3543 19.0449 14.1452 19.0449 14.6335 19.5333L17.916 22.8158L25.3652 15.3666C25.8535 14.8783 26.6443 14.8783 27.1327 15.3666C27.621 15.8549 27.6218 16.6458 27.1343 17.1341Z" fill="#2D8CFF"/>
      </svg>

      <p className='message'>Congratulation,<br></br>
      you have succeed registration</p>
  
    </div>
    <div className='container2'>
      <Button  variant="outlined"   sx={{
          fontSize: '12px',
          borderRadius: '8px',
          width: '143px',
          height:'44px',
          textTransform: 'none', // Remove uppercase

        }}
        onClick={() => { close() }}
        >Change name</Button>
      <Button variant="contained" sx={{
          fontSize: '12px',
          borderRadius: '8px',
          width: '143px',
          height:'44px',
          textTransform: 'none', // Remove uppercase

        }} onClick={() => { close() }}>Close</Button>
    </div>
 
    </>
   
  );
}

export default SuccessMessage;

import './SuccessMessage.css'
import './Form.css';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store';
import {  setauthentificate} from '../../Redux/features/user';
import { useNavigate } from 'react-router-dom';


function ErrorMessage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const email = useSelector((state: RootState) => state.user.email);

    const ReSentCode=async()=>{
      
        try {
          dispatch(setauthentificate(false));
          const response = await fetch('http://localhost:5000/api/users/codesend/hello', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ email }),
          });
  
          //const data = await response.json();
  
          if (response.ok) {
            dispatch(setauthentificate(true)) ;
            navigate('/ConfirmationCode');

        } else {
            const errorData = await response.json();
            console.error('Error sending code:', errorData);
        }
         
        }catch(error){
          console.log(error) ;
        }
    }

    const TryAgain=()=>{
        navigate('/authentificate')

    }

  return (
    <>
    <div className='container1'>
     <ErrorIcon style={{ width:'40px', height:'40px'}}/>


     <p className='message'> Error,<br />
     Something went wrong during registration</p>
 
   </div>
   <div className='container2'>
     <Button  variant="outlined"   sx={{
         fontSize: '12px',
         borderRadius: '8px',
         width: '143px',
         height:'44px',
         textTransform: 'none', // Remove uppercase
         

       }}
       onClick={() => { TryAgain() }}

       >Try again</Button>
     <Button variant="contained" sx={{
         fontSize: '12px',
         borderRadius: '8px',
         width: '143px',
         height:'44px',
         textTransform: 'none', // Remove uppercase
        }}
        onClick={() => { ReSentCode() }}
        >Re-send code</Button>
   </div>

   </>  )
}

export default ErrorMessage
import './SuccessMessage.css'
import './Form.css';
import { Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/Store';
import { setCodeSent , setauthentificate} from '../../Redux/features/user';


function ErrorMessage() {
    const dispatch = useDispatch<AppDispatch>();

    const ReSentCode=()=>{
        dispatch(setCodeSent(true));
        dispatch(setauthentificate(false));
        console.log('try again')
    }

    const TryAgain=()=>{
        dispatch(setCodeSent(false));
        dispatch(setauthentificate(false));

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
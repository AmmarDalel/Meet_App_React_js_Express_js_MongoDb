import { useSelector } from 'react-redux';
import './Form.css'
import Login from './Login';
import SuccessErrorMessage from './SuccessErrorMessage';
import { RootState } from '../../Redux/Store';
import StartCallPanel from './StartCallPanel';



function Form() {
  const authentificate=useSelector((state:RootState)=>state.user.authentificate);
  const closesuccessmessage=useSelector((state:RootState)=>state.user.closesuccessmessage);
  //const closesuccessmessagefromHome=useSelector((state:RootState)=>state.user.closesuccessmessagefromHome);

  return (
    <>
      {!authentificate && <Login/>}  
      {authentificate && closesuccessmessage  && <SuccessErrorMessage/>} 
      {(authentificate && !closesuccessmessage)  && <StartCallPanel/> }
    </>
    ) 
}


export default Form ;
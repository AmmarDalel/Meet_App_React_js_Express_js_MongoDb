import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../Redux/Store';
import { setauthentificate, setcorrectCode } from '../../Redux/features/user';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function CodeForm() {
    const navigate = useNavigate();
    const [confirmationCode, setConfirmationCode] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    // Utiliser Redux pour récupérer les valeurs d'email et de fullname
    const email = useSelector((state: RootState) => state.user.email);
    const fullname = useSelector((state: RootState) => state.user.fullname);
    const id=useSelector((state:RootState)=>state.user.id) ;

    // Envoyer le code de confirmation au serveur
    const handleCodeSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/verifycode/confirmationcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    fullName: fullname,
                    email: email,
                    confirmationCode: confirmationCode
                })
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setcorrectCode(true));
                dispatch(setauthentificate(true));
                //dispatch(setclosesuccessmessagefromHome(false));
                console.log('Code correct');
                const token = data.token;
                const cookies = new Cookies(null, { path: '/' });
                cookies.set('user', {token},{maxAge:24 * 60 * 60}); //reste valable 24h
                navigate(`/ConfirmationCode/:${id}/CorrectCode`) ;

               
            } else {
                dispatch(setcorrectCode(false));
                dispatch(setauthentificate(true));
                console.error('Erreur d\'authentification');
                navigate('/ConfirmationCode/IncorrectCode') ;
                return ;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className='auth-form' >
            <div className='submitconfirmationcodecontainer'>
                <div className='confirmationcodecontainer'>
                    <label className='label'>Enter Code:</label>
                    <input
                        type='text'
                        id='codeconfirmation'
                        pattern='[0-9]{6}'
                        maxLength={6}
                        className='codeconfirmation'
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                </div>
            
                <div className='submitcontainer submitcontainerCode'>
                    <button className='submitbutton' onClick={(e)=>handleCodeSubmit(e)} >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CodeForm;

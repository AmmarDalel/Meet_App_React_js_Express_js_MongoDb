import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setclosesuccessmessagefromHome, setCodeSent, setEmailError, setIncorrectFullname, setRemplirChamp } from '../../Redux/features/user';
import InputComponent from './Input'; // Assurez-vous que le chemin vers InputComponent est correct
import type { AppDispatch, RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';


function AuthForm() {

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const emailError = useSelector((state: RootState) => state.user.emailError);
  const incorrectFullname = useSelector((state: RootState) => state.user.incorrectFullname);
  const remplirChamp = useSelector((state: RootState) => state.user.remplirChamp);

  const [id,setId]=useState('') ;
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  // Valider l'email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setEmailError('Email should be example@gmail.com'));
    } else {
      dispatch(setEmailError(''));
    }
  };

  // Envoyer email et fullname au serveur
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fullname && email) {
      try {
        // Appel API pour authentification
        const response = await fetch('http://localhost:5000/api/users/authent/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ fullName: fullname, email: email }),
        });

        const data = await response.json();

        if (data.message === 'Incorrect Full name !') {
          dispatch(setIncorrectFullname(true));
        }

        if (response.ok) {
          dispatch(setIncorrectFullname(false));
          dispatch(login({ id : data.user ,fullname: fullname, email: email }));
          dispatch(setCodeSent(true));
          dispatch(setclosesuccessmessagefromHome(false));
          navigate('/ConfirmationCode');

        } else {
          // Gérer les erreurs d'authentification
          console.error("Erreur d'authentification");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setRemplirChamp('All fields must be filled !'));
    }
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='submitdatacontainer'>
        <div style={{ padding: '16px' }}>
          <InputComponent
            title='Full name'
            inputtype='text'
            value={fullname}
            changevalue={(e: React.ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
          />
          <InputComponent
            title='Email'
            inputtype='email'
            value={email}
            changevalue={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        <div className='incorrectfullnamecontainer'>
          {emailError && <p className='error'>{emailError}</p>}
          {incorrectFullname && <p className='error'>Incorrect Full name !</p>}
          {remplirChamp && <p className='error'>{remplirChamp}</p>}
        </div>
        <div className='submitcontainer submitcontainerAuth'>
          <button type='submit' className='submitbutton'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AuthForm;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomContainer from './components/Room/RoomContainer';

import Cookies from 'universal-cookie';
import RightSidebar from './components/Rightbar/Sidebar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './Redux/Store';
import { setauthentificate, setclosesuccessmessage, setCodeSent } from './Redux/features/user';

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    const navigate = useNavigate();

    // verify user
  const handlVerify = async (userAccount:any) => {
   const fullname=userAccount.fullname ;
   const email=userAccount.email ;
    console.log('from handleVerify')
    if (fullname && email) {

      try {
        // Appel API pour authentification
        const response = await fetch('http://localhost:5000/api/users/verifyuser/getuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ fullName: fullname, email: email }),
        });

        const data = await response.json();

        if (data.message === 'User not found') {
            dispatch(setCodeSent(false));
            dispatch(setclosesuccessmessage(false));
            dispatch(setauthentificate(false));
            navigate('/authentificate');
        }

        if (response.ok) {
            dispatch(setCodeSent(true));
            dispatch(setclosesuccessmessage(true));
            dispatch(setauthentificate(true));
        } else {
          // Gérer les erreurs d'authentification
          console.error("Error");
        }
      } catch (error) {
        dispatch(setCodeSent(false));
        dispatch(setclosesuccessmessage(false));
        dispatch(setauthentificate(false));
        navigate('/authentificate');
      }
    } else {
        dispatch(setCodeSent(false));
        dispatch(setclosesuccessmessage(false));
        dispatch(setauthentificate(false));
        navigate('/authentificate');
    }
  };

    useEffect(() => {
        const userAccount = cookies.get('useraccount');
        
        if (!userAccount) {
            navigate('/authentificate');
        }
        else{
            handlVerify(userAccount) ;
        }
       
    }, [cookies , navigate]);

 
    return (
        <>
            <div className='appcontainer'> 
                <RoomContainer/>
                <RightSidebar/>              
            </div>
          

        </>
    );
}

export default Home;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {EmptyRoomContainer} from '../components/Room/RoomContainer';

import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/Store';
import { setauthentificate, setclosesuccessmessage, setCodeSent, setcorrectCode } from '../Redux/features/user';
import { jwtDecode } from 'jwt-decode';
import StartCall from './StartCall';

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const cookies = new Cookies();
    const usertoken=cookies.get('user') ;
    const navigate = useNavigate();

   /* useEffect(() => {
        try{
            const userAccount = cookies.get('user');

                if (!userAccount) {
                    navigate('/authentificate');
                }
                else{
                try{
                    const userdata = jwtDecode(usertoken.token); // decode your token here
                    const email = String(userdata.email);
                    const fullname = String(userdata.fullname);
                    const userid = String(userdata.userid);
                
                    if (fullname && email && userid) {
                            dispatch(setCodeSent(true));
                            dispatch(setclosesuccessmessage(false));
                            dispatch(setcorrectCode(true));
                            dispatch(setauthentificate(true));
                            dispatch(setclosesuccessmessagefromHome(true));
                           // navigate(`/${userid}/StartCall/`) ;


                    } else {
                        dispatch(setCodeSent(false));
                        dispatch(setcorrectCode(false));
                        dispatch(setclosesuccessmessage(false));
                        dispatch(setauthentificate(false));
                       // navigate('/authentificate');
                    }
                }catch(error){
                    dispatch(setCodeSent(false));
                    dispatch(setcorrectCode(false));
                    dispatch(setclosesuccessmessage(false));
                    dispatch(setauthentificate(false));
                   // navigate('/authentificate');
                }

            }
      
        
        }

        catch(error){
            console.log(error) ;
        }
       
    }, [cookies , navigate]);
*/
 
    return (
        <>
            <div className='appcontainer'> 
                <EmptyRoomContainer/>
                <StartCall/>
                        
            </div>
            
          

        </>
    );
}

export default Home;

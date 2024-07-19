import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import { RootState } from "../Redux/Store";
import { jwtDecode } from "jwt-decode";
import React from "react";

const Protected = () => {
  const cookies = new Cookies();
  const usertoken=cookies.get('user') ;
  const authentificate = useSelector((state: RootState) => state.user.authentificate);

  if( !authentificate && usertoken  )
    return <Outlet />  
  else if( authentificate && usertoken )
   {
    const userdata = jwtDecode(usertoken.token); // decode your token here
   
    const userid = String(userdata.userid);
    return <Navigate to={`/StartCall/${userid}`} />;
  }
  else return  <Navigate to="/authentificate" />;
};

export default Protected;
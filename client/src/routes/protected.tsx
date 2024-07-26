import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import { RootState } from "../Redux/Store";
import { jwtDecode } from "jwt-decode";

const Protected = () => {
  const cookies = new Cookies();
  const usertoken=cookies.get('user') ;
  const authentificate = useSelector((state: RootState) => state.user.authentificate);

  if(  usertoken  )
    return <Outlet />  
 
  else return  <Navigate to="/authentificate" />;
};

export default Protected;
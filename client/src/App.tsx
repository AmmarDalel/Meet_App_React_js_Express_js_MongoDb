import { useEffect } from 'react'
import './App.css'
import socketIO from 'socket.io-client' ;

import RightSidebar from './components/Rightbar/Sidebar';

const WS='localhost:5000' ;

function App() {

  useEffect(()=>{
    socketIO(WS);
  },[]);



  return (
    <>
        <div className='appcontainer'> 
          <RightSidebar/>


        </div>      
    </>
  )
}

export default App

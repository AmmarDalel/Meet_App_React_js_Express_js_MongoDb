import { useEffect } from 'react'
import './App.css'
import socketIO from 'socket.io-client' ;
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentificate from './Authentificate';
import Home from './Home';

const WS='localhost:5000' ;

function App() {

  useEffect(()=>{
    socketIO(WS);
  },[]);



  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}  >
        <Router>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/authentificate" element={<Authentificate />} />
            </Routes>
        </Router> 
      </Provider> 
     </CookiesProvider>   

        
  )
}

export default App

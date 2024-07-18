import { useEffect } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentificate from './Authentificate';
import Home from './Home';
import Call from './Call';

import ConfirmationCode from './ConfirmationCode';
import CorrectCode from './CorrectCode';
import IncorrectCode from './IncorrectCode';
import StartCall from './StartCall';
import Room from './Room';
function App() {
 

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}  >
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/authentificate" element={<Authentificate />} />
              <Route path='/ConfirmationCode' element={<ConfirmationCode/>}/>
              <Route path='/ConfirmationCode/:userid/CorrectCode' element={<CorrectCode/>}/>
              <Route path='/ConfirmationCode/IncorrectCode' element={<IncorrectCode/>}/>
              <Route path='/:userid/StartCall/' element={<StartCall/>}/>
              <Route path="/call/:id" element={<Call />} />
              <Route path='/call/:callId' element={<Room/>}/>
            </Routes>
      </Provider> 
     </CookiesProvider>   

        
  )
}

export default App

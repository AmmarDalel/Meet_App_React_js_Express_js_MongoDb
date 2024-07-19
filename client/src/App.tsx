import './App.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { CookiesProvider } from 'react-cookie';

import {   Routes, Route } from 'react-router-dom';


import ConfirmationCode from './pages/ConfirmationCode';
import CorrectCode from './pages/CorrectCode';
import IncorrectCode from './pages/IncorrectCode';
import StartCall from './pages/StartCall';
import Room from './pages/Room';
import Protected from './routes/protected';
import Home from './pages/Home';
import Authentificate from './pages/Authentificate';
import Call from './pages/Call';

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Protected />}>
              <Route index element={<Home />} />
              <Route path="/call/:id" element={<Call />} />
              <Route path="/call/:callId" element={<Room />} />

              {/* All other routes that you want to protect will go inside here */}
            </Route>
            <Route path="/StartCall/:userid/" element={<StartCall />} />

            <Route path="/ConfirmationCode/:userid/CorrectCode" element={<CorrectCode />} />
            <Route path="/authentificate" element={<Authentificate />} />
            <Route path="/ConfirmationCode" element={<ConfirmationCode />} />
            <Route path="/ConfirmationCode/IncorrectCode" element={<IncorrectCode />} />
             
          </Routes>
      </Provider>
    </CookiesProvider>
  );
}


export default App

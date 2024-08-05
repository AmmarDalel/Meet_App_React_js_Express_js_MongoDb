import './App.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { CookiesProvider } from 'react-cookie';
import {   Routes, Route } from 'react-router-dom';
import ConfirmationCode from './pages/ConfirmationCode';
import CorrectCode from './pages/CorrectCode';
import IncorrectCode from './pages/IncorrectCode';
import StartCall from './pages/StartCall';
import Protected from './routes/protected' ;
import Home from './pages/Home';
import Authentificate from './pages/Authentificate';
import Call from './pages/Call';
import { RoomProvider } from './Context/SocketIo';
import LeaveCall from './pages/LeaveCall';
function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Protected />}>
              <Route index element={<Home />} />
              <Route path="/call/:id" element={
                <RoomProvider>
                  <Call /> 
                </RoomProvider>
              } />
              <Route path="/StartCall/:userid/" element={
                  <StartCall />
                } />
              {/* All other routes that you want to protect will go inside here */}
            </Route>
            <Route path="/ConfirmationCode/:userid/CorrectCode" element={<CorrectCode />} />
            <Route path="/authentificate" element={<Authentificate />} />
            <Route path="/ConfirmationCode" element={<ConfirmationCode />} />
            <Route path="/ConfirmationCode/IncorrectCode" element={<IncorrectCode />} />
            <Route path="/call/:id/leavecall" element={<LeaveCall />} />

          </Routes>
      </Provider>
    </CookiesProvider>
  );
}


export default App

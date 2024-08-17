import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { CookiesProvider } from 'react-cookie';
import { CallProvider } from './Context/CallContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { RoomProvider } from './Context/SocketIo.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <Provider store={store}  >
          <BrowserRouter>
          <CallProvider>
            <App />
          </CallProvider>

          </BrowserRouter>
          </Provider> 
        </CookiesProvider> 
</React.StrictMode>,
)

import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './Contextos/AuthContext.jsx';
import HerramientasContextProvider from './Contextos/ModuleContexts/HerramientasContext.jsx';
import DigitalesContextProvider from './Contextos/ModuleContexts/DigitalesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <AuthContextProvider>
         <HerramientasContextProvider>
            <DigitalesContextProvider>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </DigitalesContextProvider>
         </HerramientasContextProvider>
      </AuthContextProvider>
   </React.StrictMode>,
)

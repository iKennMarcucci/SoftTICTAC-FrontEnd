import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './Contextos/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <AuthContextProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </AuthContextProvider>
   </React.StrictMode>,
)

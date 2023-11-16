import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./Componentes/Navbar"
import Footer from "./Componentes/Footer"
import Home from "./Componentes/Home/Home"
import Auth from "./Componentes/Auth/Auth"
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes"
import { useAuth } from "./Contextos/AuthContext"
import Digitales from "./Componentes/Modulos/Digitales/Digitales"
import Herramientas from "./Componentes/Modulos/Herramientas/Herramientas"
import Control from "./ComponentesPrivados/Home/Control"
import Dashboard from "./ComponentesPrivados/Dashboard"
import { RecoilRoot } from 'recoil';

function App() {

   const { isAuthenticated } = useAuth()

   return (
      <>
         <RecoilRoot>
            <Navbar />
            <Dashboard />
            <Routes>
               <Route path={'/'} element={<Home />} />
               <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
               <Route path='/modulo/contenidos-digitales' element={<Digitales />} />
               <Route path='/modulo/herramientas-pedagogicas' element={<Herramientas />} />


               <Route element={<ProtectedRoutes />}>
                  <Route path='/controlpanel' element={<Control />} />
               </Route>


               <Route path={'*'} element={'No encontrado'} />
            </Routes>
            <Footer />
         </RecoilRoot>
      </>
   )
}

export default App

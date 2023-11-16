import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./Componentes/Navbar"
import Footer from "./Componentes/Footer"
import Home from "./Componentes/Home/Home"
import Auth from "./Componentes/Auth/Auth"
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes"
import { useAuth } from "./Contextos/AuthContext"
import Digitales from "./Componentes/Modulos/Digitales/Digitales"
import Herramientas from "./Componentes/Modulos/Herramientas/Herramientas"

function App() {

   const { isAuthenticated } = useAuth()

   return (
      <>
         <Navbar />
         <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
            <Route path='/modulo/contenidos-digitales' element={<Digitales />} />
            <Route path='/modulo/herramientas-pedagogicas' element={<Herramientas />} />

            <Route element={<ProtectedRoutes />}>
               <Route path='/controlpanel' element={""} />
            </Route>

            <Route path={'*'} element={'No encontrado'} />
         </Routes>
         <Footer />
      </>
   )
}

export default App

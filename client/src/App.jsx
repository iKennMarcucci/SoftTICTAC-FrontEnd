import { Route, Routes } from "react-router-dom"
import Navbar from "./Componentes/Navbar"
import Footer from "./Componentes/Footer"
import Home from "./Componentes/Home/Home"

function App() {

   return (
      <>
         <Navbar />
         <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={''} element={''} />

            <Route path={'*'} element={'No encontrado'} />
         </Routes>
         <Footer />
      </>
   )
}

export default App

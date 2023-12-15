import { Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Auth from "./Componentes/Auth/Auth";
import Footer from "./Componentes/Footer";
import Home from "./Componentes/Home/Home";
import Digitales from "./Componentes/Modulos/Digitales/Digitales";
import Herramientas from "./Componentes/Modulos/Herramientas/Herramientas";
import Navbar from "./Componentes/Navbar";
import Dashboard from "./ComponentesPrivados/Dashboard";
import Control from "./ComponentesPrivados/Home/Control";
import { useAuth } from "./Contextos/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import HerramientasControl from "./ComponentesPrivados/Modulos/Herramientas/HerramientasControl";
import DigitalesControl from "./ComponentesPrivados/Modulos/Digitales/DigitalesControl";
import HerramientasContextProvider from "./Contextos/ModuleContexts/HerramientasContext";
import DigitalesContextProvider from "./Contextos/ModuleContexts/DigitalesContext";
import { ProyectosAulaControl } from "./ComponentesPrivados/Modulos/Proyectos/ProyectosAulaControl";
import { CreateProyectoAulaControl } from "./ComponentesPrivados/Modulos/Proyectos/CreateProyectoAulaControl";
import { ProyectosAula } from "./Componentes/Modulos/ProyectosAula/ProyectosAula";
import { DetailsProyectoAula } from "./Componentes/Modulos/ProyectosAula/DetailsProyectoAula";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <RecoilRoot>
      <Navbar />
      <Dashboard />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
        />
        <Route
          path="/modulo/contenidos-digitales"
          element={
            <DigitalesContextProvider>
              <Digitales />
            </DigitalesContextProvider>
          }
        />
        <Route
          path="/modulo/herramientas-pedagogicas"
          element={
            <HerramientasContextProvider>
              <Herramientas />
            </HerramientasContextProvider>
          }
        />
        <Route path="/modulo/proyectos-aula" element={<ProyectosAula />} />
        <Route
          path="/modulo/proyectos-aula/:id"
          element={<DetailsProyectoAula />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/controlpanel" element={<Control />}>
            <Route
              path="herramientas"
              element={
                <HerramientasContextProvider>
                  <HerramientasControl />
                </HerramientasContextProvider>
              }
            />
            <Route
              path="contenidos-digitales"
              element={
                <DigitalesContextProvider>
                  <DigitalesControl />
                </DigitalesContextProvider>
              }
            />
            <Route path="proyectos-aula" element={<ProyectosAulaControl />} />

            <Route
              path="proyectos-aula/crear"
              element={<CreateProyectoAulaControl />}
            />
            <Route
              path="proyectos-aula/:id"
              element={<CreateProyectoAulaControl />}
            />
          </Route>
        </Route>

        <Route path={"*"} element={"No encontrado"} />
      </Routes>
      <Footer />
    </RecoilRoot>
  );
}

export default App;

import { createContext, useContext, useState, useEffect } from 'react';
import img_2 from '../../../public/Logos/SingleLogo.webp';
import { getContenidosRequest, sendContenidosRequest } from '../../Api/Peticiones/request.axios';

const DigitalesContext = createContext();

export const useDigitales = () => {
   return useContext(DigitalesContext);
};

const DigitalesContextProvider = ({ children }) => {

   const poblaciones = [
      {
         id: 1,
         poblacion: "Basica Primaria",
      },
      {
         id: 2,
         poblacion: "Básica Secundaria",
      },
      {
         id: 3,
         poblacion: "Media",
      },
   ]

   const ejes = [
      {
         id: 1,
         eje: "Emprendimiento",
      },
      {
         id: 2,
         eje: "Sexualidad",
      },
      {
         id: 3,
         eje: "Medio Ambiente",
      },
      {
         id: 4,
         eje: "Relaciones Sociales",
      },
      {
         id: 5,
         eje: "TICS",
      },
   ]

   const estructura = [
      {
         id: 1,
         titulo: "Nombre del Primer Contenido Digital",
         descripcion: "Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[0],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 2,
         titulo: "Nombre del Segundo Contenido Digital",
         descripcion: "Soy la descripción del Segundo Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[1],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 3,
         titulo: "Nombre del Tercer Contenido Digital",
         descripcion: "Soy la descripción del Tercer Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[2],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 4,
         titulo: "Nombre del Cuarto Contenido Digital",
         descripcion: "Soy la descripción del Cuarto Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[3],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 5,
         titulo: "Nombre del Quinto Contenido Digital",
         descripcion: "Soy la descripción del Quinto Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[4],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 6,
         titulo: "Nombre del Sexto Contenido Digital",
         descripcion: "Soy la descripción del Sexto Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[0],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 7,
         titulo: "Nombre del Septimo Contenido Digital",
         descripcion: "Soy la descripción del Septimo Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[1],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 8,
         titulo: "Nombre del Octavo Contenido Digital",
         descripcion: "Soy la descripción del Octavo Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[2],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 9,
         titulo: "Nombre del Noveno Contenido Digital",
         descripcion: "Soy la descripción del Noveno Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[3],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
   ]

   const [digitales, setDigitales] = useState(null)

   const getDigitales = async () => {
      const res = await getContenidosRequest()
      setDigitales(estructura)
   }

   const sendContenidos = async (body) => {
      try {
         console.log("body", body);
         const token = JSON.parse(localStorage.getItem('access'))
         if (token) {
            const res = await sendContenidosRequest(body, token)
            await getDigitales()
            return { status: 200 }
         }
         return { status: 400 }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      getDigitales()
   }, [])

   const value = {
      digitales,
      sendContenidos
   };

   return (
      <DigitalesContext.Provider value={value}>
         {children}
      </DigitalesContext.Provider>
   );
};

export default DigitalesContextProvider

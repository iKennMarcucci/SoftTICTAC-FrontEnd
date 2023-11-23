import { createContext, useContext, useState, useEffect } from 'react';

const HerramientasContext = createContext();

export const useHerramienta = () => {
   return useContext(HerramientasContext);
};

const HerramientasContextProvider = ({ children }) => {
   // Ejemplo de estructura de backend (SOLO DEL BACKEND SE OBTIENE "ESTRUCTURA")
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
   const competencias = [
      {
         id: 1,
         compe: "Participa activamente en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad.",
      },
      {
         id: 2,
         compe: "Participa activamente en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad.",
      },
   ]
   const recursos = [
      {
         id: 1,
         recurso: "Proyector",
      },
      {
         id: 2,
         recurso: "Parlantes",
      },
      {
         id: 3,
         recurso: "Lapiceros y Marcadores",
      },
      {
         id: 4,
         recurso: "Hojas y Carteleras",
      },
   ]
   const textoDesarrollo = "El taller se desarrolla a través de las siguientes actividades que se describen a continuación:"

   const estructura = [
      {
         id: 1,
         titulo: "Las Tecnologías y Yo",
         poblacion: poblaciones[0],
         eje: ejes[0],
         tema: "Solidaridad",
         objetivo: [
            {
               id: 1,
               obj: "Fomentar el reconocimiento del cuerpo fisico."
            },
            {
               id: 2,
               obj: "Conocer las diferencias físicas entre niños y niñas."
            },
         ],
         competencias: [
            competencias[0],
            competencias[1]
         ],
         momentos: {
            presentacion: "El docente da la bienvenida a niños y niñas y les habla de la importancia de la solidaridad. Menciona que van a aprender la canción 'La solidaridad'.",
            desarrollo: textoDesarrollo,
            cierre: "El encuentro finaliza sugiriendo a los niños y niñas que compartan la canción, entonándola para su familia.",
         },
         procesos: [
            {
               id: 1,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
            {
               id: 2,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
            {
               id: 3,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
         ],
         recomendaciones: [
            {
               id: 1,
               recomendacion: "La canción la pueden presentar los niños en una izada de bandera."
            },
            {
               id: 2,
               recomendacion: "Se puede reforzar el aprendizaje de la melodía con los padres, pidiendoles que la escuchen en el hogar."
            },
         ],
         publico: true,
      },
      {
         id: 2,
         titulo: "Las Tecnologías y Yo",
         poblacion: poblaciones[0],
         eje: ejes[0],
         tema: "Solidaridad",
         objetivo: [
            {
               id: 1,
               obj: "Fomentar el reconocimiento del cuerpo fisico."
            },
            {
               id: 2,
               obj: "Conocer las diferencias físicas entre niños y niñas."
            },
         ],
         competencias: [
            competencias[0],
            competencias[1]
         ],
         momentos: {
            presentacion: "El docente da la bienvenida a niños y niñas y les habla de la importancia de la solidaridad. Menciona que van a aprender la canción 'La solidaridad'.",
            desarrollo: textoDesarrollo,
            cierre: "El encuentro finaliza sugiriendo a los niños y niñas que compartan la canción, entonándola para su familia.",
         },
         procesos: [
            {
               id: 1,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
            {
               id: 2,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
            {
               id: 3,
               proceso: "Se escucha la canción “La solidaridad: canción infantil para reforzar valores” con los estudiantes y se reitera hasta que ellos empiecen a repetir la letra. Se habla de la importancia de la solidaridad y cómo esta canción tiene algunos elementos que permiten valorar si somos solidarios.",
               recursos: [
                  recursos[0],
                  recursos[3]
               ],
               tiempoMilis: 1800000
            },
         ],
         recomendaciones: [
            {
               id: 1,
               recomendacion: "La canción la pueden presentar los niños en una izada de bandera."
            },
            {
               id: 2,
               recomendacion: "Se puede reforzar el aprendizaje de la melodía con los padres, pidiendoles que la escuchen en el hogar."
            },
         ],
         publico: true,
      },
   ]

   const [herramientas, setHerramientas] = useState(null)

   const getHerramientas = () => {
      // Logica para la traída del backend
      setHerramientas(estructura)
   }

   useEffect(() => {
      getHerramientas()
   }, [])

   const value = {
      herramientas
   };

   return (
      <HerramientasContext.Provider value={value}>
         {children}
      </HerramientasContext.Provider>
   );
};

export default HerramientasContextProvider

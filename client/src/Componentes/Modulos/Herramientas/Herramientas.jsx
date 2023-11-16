import React from 'react'

function Herramientas() {

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

   // Las competencias ya existen segun Janeth
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

   const calcularTiempo = (tiempoMilis) => {
      var horas = Math.floor(tiempoMilis / (1000 * 60 * 60));

      var minutos = Math.floor((tiempoMilis % (1000 * 60 * 60)) / (1000 * 60));

      if (horas > 0) {
         if (horas === 1) {
            return `${horas} hora y ${minutos} minutos`
         }
         return `${horas} horas y ${minutos} minutos`
      }
      return `${minutos} minutos`
   }

   const calcularDuracionTotal = (proceso) => {
      let res = 0
      for (let i = 0; i < proceso.length; i++) {
         res += proceso[i].tiempoMilis;
      }
      return calcularTiempo(res)
   }

   return estructura ? (
      <>
         <main className='container mx-auto mt-10'>
            <h2 className='text-2xl font-medium max-sm:mx-2'>
               Herramientas Pedagógicas
            </h2>
            <hr className='border-stone-400 max-sm:mx-2' />
            <section className='container mx-auto mt-10 grid grid-cols-12 justify-items-center'>
               {
                  estructura.map((item, index) => item.publico && (
                     <div key={index} className='max-sm:-translate-y-32 max-sm:scale-90 col-span-6 max-xl:col-span-12 border-delgado rounded-md p-4 m-2'>
                        <div>
                           <h4 className='font-medium text-center text-2xl mb-4'>Herramienta {item.id} - {item.titulo}</h4>
                           <table>
                              <tbody>


                                 <tr>
                                    <td className='border-delgado truncate px-4 text-center font-normal'>Población Objetivo</td>
                                    <td className='border-delgado px-4 text-justify'>{item.poblacion.poblacion}</td>
                                 </tr>

                                 <tr>
                                    <td className='border-delgado px-4 text-center font-normal'>Tema</td>
                                    <td className='border-delgado px-4 text-justify'>{item.tema}</td>
                                 </tr>

                                 <tr className='border-delgado'>
                                    <td className='border-delgado px-4 text-center font-normal'>Objetivos</td>
                                    <td className='flex flex-col px-4 text-justify'>
                                       {
                                          item.objetivo.map((obj, id) => (
                                             <p key={id}>• {obj.obj}</p>
                                          ))
                                       }
                                    </td>
                                 </tr>

                                 <tr className='border-delgado'>
                                    <td className='border-delgado px-4 text-center font-normal'>Competencias</td>
                                    <td className='flex flex-col px-4 text-justify'>
                                       {
                                          item.competencias.map((compe, id) => (
                                             <p key={id}>• {compe.compe}</p>
                                          ))
                                       }
                                    </td>
                                 </tr>
                              </tbody>
                           </table>

                           <div className='my-4 space-y-2'>
                              Momentos para desarrollar:
                              <div>
                                 <h5 className='font-normal'>• Primer Momento - Presentación:</h5>
                                 <p className='text-justify px-4'>{item.momentos.presentacion}</p>
                              </div>
                              <div>
                                 <h5 className='font-normal'>• Segundo Momento - Desarrollo:</h5>
                                 <p className='text-justify px-4'>{item.momentos.desarrollo}</p>
                              </div>
                           </div>


                           <table className='w-full'>
                              <thead>
                                 <tr>
                                    <th className='border-delgado w-7/12'>Proceso</th>
                                    <th className='border-delgado'>Recurso</th>
                                    <th className='border-delgado'>Tiempo</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    item.procesos.map((proceso, id) => (
                                       <tr className='border-delgado' key={id}>
                                          <td className='border-delgado px-2 text-justify'>{proceso.proceso}</td>
                                          <td className='text-center'>
                                             {
                                                proceso.recursos.map((rec, id) => (
                                                   <p key={id}>• {rec.recurso}</p>
                                                ))
                                             }
                                          </td>
                                          <td className='border-delgado text-center'>{calcularTiempo(proceso.tiempoMilis)}</td>
                                       </tr>
                                    ))
                                 }
                              </tbody>
                           </table>


                           <div>
                              <h5 className='font-normal'>• Tercer Momento - Cierre:</h5>
                              <p className='text-justify px-4'>{item.momentos.cierre}</p>
                           </div>

                           <div className='flex justify-center'>
                              <h5 className='font-normal'>Duración:&nbsp;</h5>
                              <p className='text-justify'>{calcularDuracionTotal(item.procesos)}</p>
                           </div>

                           <table className='w-full'>
                              <tbody>
                                 <tr className='border-delgado'>
                                    <td className='border-delgado px-2'>Recomendaciones</td>
                                    <td className='px-2 text-justify'>
                                       {
                                          item.recomendaciones.map((reco, id) => (
                                             <p key={id}>• {reco.recomendacion}</p>
                                          ))
                                       }
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )
                  )
               }
            </section>
         </main >
      </>
   ) : (
      <>
         <p>No se ha encontrado ninguna Herramienta Pedagógica</p>
      </>
   )
}

export default Herramientas
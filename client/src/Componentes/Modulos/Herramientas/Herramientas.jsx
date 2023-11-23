import React from 'react'
import { useHerramienta } from '../../../Contextos/ModuleContexts/HerramientasContext';

function Herramientas() {

   const { herramientas } = useHerramienta()

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

   return herramientas ? (
      <>
         <main className='container mx-auto mt-10'>
            <h2 className='text-2xl font-medium max-sm:mx-2'>
               Herramientas Pedagógicas
            </h2>
            <hr className='border-stone-400 max-sm:mx-2' />
            <section className='container mx-auto mt-10 grid grid-cols-12 justify-items-center'>
               {
                  herramientas.map((item, index) => item.publico && (
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
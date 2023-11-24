import React from 'react'

function MoreInfo({ item, closeModal }) {

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

   return (
      <div className="fixed inset-0 overflow-y-auto">
         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
               className="fixed inset-0 transition-opacity"
               onClick={closeModal}
            >
               <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>

            <span
               className="hidden sm:inline-block sm:align-middle sm:h-screen"
               aria-hidden="true"
            >
               &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl sm:w-full">
               {/* Contenido del modal */}
               <h4 className='font-medium text-center text-2xl my-4'>Herramienta {item.id} - {item.titulo}</h4>
               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 whitespace-normal overflow-y-auto max-h-modal">
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


                  <table className='w-full text-center'>
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

               {/* Botones del modal */}
               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 hover:bg-blue-600 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={closeModal}
                  >
                     Cerrar
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MoreInfo
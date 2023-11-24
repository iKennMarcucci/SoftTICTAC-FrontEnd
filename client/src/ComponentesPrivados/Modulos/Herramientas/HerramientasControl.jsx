import React, { useState } from 'react'
import { useHerramienta } from '../../../Contextos/ModuleContexts/HerramientasContext'
import MoreInfo from './Comp/MoreInfo';
import Modal from './Comp/Modal';

function HerramientasControl() {

   const { herramientas } = useHerramienta()

   const [modalOpen, setModalOpen] = useState(false);
   const [modalAbierto, setModalAbierto] = useState(null);

   const openModal = (index) => {
      setModalOpen(true);
      setModalAbierto(index);
   };

   const closeModal = () => {
      setModalOpen(false);
   };

   const [isOpen, setIsOpen] = useState(false);

   const openModalSubmit = () => {
      setIsOpen(true);
   };

   const closeModalSubmit = () => {
      setIsOpen(false);
   };

   return (
      <>
         <div className='flex justify-between'>
            <h2 className='text-2xl font-medium max-sm:mx-2'>
               Herramientas Pedagógicas
            </h2>
            {/* el button lo que hará es sacar un modal con el form de una herramienta */}
            <button onClick={() => openModalSubmit()} className=' rounded-md font-normal px-2 bg-blue-100 hover:bg-blue-300'>
               Crear una Herramienta
            </button>
         </div>
         <Modal isOpen={isOpen} closeModal={closeModalSubmit} />
         <hr className='border-stone-400 max-sm:mx-2 mt-2 mb-4' />
         {
            herramientas ?
               (
                  <section className='grid grid-cols-12 gap-4'>
                     {
                        herramientas.map((item, index) => (
                           <div key={index} className='col-span-6 border-delgado p-2 flex flex-col items-center'>
                              <h4 className='font-medium text-center text-2xl'>{`Herramienta ${item.id} - ${item.titulo}`}</h4>
                              <div className='m-2 p-2'>
                                 <div className='grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t'>
                                    <div className='col-span-1 text-center'>
                                       <h5 className='font-normal'>Población Objetivo</h5>
                                    </div>
                                    <div className='col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l'>
                                       <p>{item.poblacion.poblacion}</p>
                                    </div>
                                 </div>
                                 <div className='grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t'>
                                    <div className='col-span-1 text-center'>
                                       <h5 className='font-normal'>Tema</h5>
                                    </div>
                                    <div className='col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l'>
                                       <p>{item.tema}</p>
                                    </div>
                                 </div>
                                 <div className='grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t'>
                                    <div className='col-span-1 text-center'>
                                       <h5 className='font-normal'>Objetivos</h5>
                                    </div>
                                    <div className='col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l'>
                                       {
                                          item.objetivo.map((obj, id) => (
                                             <p key={id}>• {obj.obj}</p>
                                          ))
                                       }
                                    </div>
                                 </div>
                                 <div className='grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-y'>
                                    <div className='col-span-1 text-center'>
                                       <h5 className='font-normal'>Competencias</h5>
                                    </div>
                                    <div className='col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l'>
                                       {
                                          item.competencias.map((compe, id) => (
                                             <p key={id}>• {compe.compe}</p>
                                          ))
                                       }
                                    </div>
                                 </div>
                              </div>
                              <button onClick={() => openModal(index)} className='text-white font-medium px-20 text-center cursor-pointer hover:bg-blue-500 bg-blue-600 mb-2 rounded-md py-1'>
                                 Ver más
                              </button>

                              {
                                 modalOpen && modalAbierto === index && (
                                    <MoreInfo key={index} id={index} item={item} closeModal={closeModal} />
                                 )
                              }


                           </div>
                        )
                        )
                     }
                  </section>
               ) : (
                  <>
                     <p className='text-center text-xl mt-4'>No existen Herramientas Pedagógicas creadas. ¡Crea una nueva!</p>
                  </>
               )
         }
      </>
   )
}

export default HerramientasControl
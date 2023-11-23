import React, { useState } from "react";
import { useDigitales } from "../../../Contextos/ModuleContexts/DigitalesContext";
import Modal from "./Comp/Modal";

function DigitalesControl() {
   const { digitales } = useDigitales();

   const [isOpen, setIsOpen] = useState(false);

   const openModal = () => {
      setIsOpen(true);
   };

   const closeModal = () => {
      setIsOpen(false);
   };

   return (
      <>
         <div className="flex justify-between">
            <h2 className="text-2xl font-medium max-sm:mx-2">
               Contenidos Digitales
            </h2>
            {/* el button lo que hará es sacar un modal con el form de un contenido digital */}
            <button
               onClick={openModal}
               className="rounded-md font-normal px-2 bg-blue-100 hover:bg-blue-300"
            >
               Crear un Contenido Digital
            </button>
         </div>
         <Modal isOpen={isOpen} closeModal={closeModal} />
         <hr className="border-stone-400 max-sm:mx-2 mt-2 mb-4" />
         {
            digitales ? (
               <section className="grid grid-cols-12 gap-4">
                  {digitales.map((item, index) => (
                     <div
                        key={index}
                        className="max-sm:w-72 border-delgado rounded-md p-4 w-60 col-span-2 max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-4 max-xl:col-span-3 max-2xl:col-span-3 mb-3 flex flex-col justify-between"
                     >
                        <div className="">
                           <div className="flex text-stone-500 text-xs">
                              <p className="font-light">Población:&nbsp;</p>
                              {item.poblacion.poblacion}
                           </div>
                           <div className="h-52 w-full overflow-hidden mb-4 bg-blue-50 p-4 rounded-lg">
                              <img
                                 src={item.imagenReferencia}
                                 alt={item.titulo}
                                 className="w-full h-full object-contain"
                              />
                           </div>
                           <div className="text-center">
                              <h2
                                 className="text-xl font-normal line-clamp-2"
                                 title={item.titulo}
                              >
                                 {item.titulo}
                              </h2>
                              <p
                                 className="text-xs mt-2 line-clamp-3"
                                 title={item.descripcion}
                              >
                                 {item.descripcion}
                              </p>
                           </div>
                        </div>
                        <a
                           href="https://github.com/iKennMarcucci"
                           target="_blank"
                           className="text-white font-medium text-center cursor-pointer bg-blue-300 hover:bg-blue-400 mt-4 rounded-md py-1"
                        >
                           Ver
                        </a>
                     </div>
                  ))}
               </section>
            ) : (
               <>
                  <p className="text-center text-xl mt-4">
                     No existen Contenidos Digitales creados. ¡Crea uno nuevo!
                  </p>
               </>
            )
         }
      </>
   );
}

export default DigitalesControl;

// SoftTICTAC 22/11/2023  6:30 pm

// - Falta la creación de Contenidos Digitales.

// - Falta la creación de Herramientas Pedagógicas.

// - Falta integración con Backend.

// - Falta Organizar funcionalidades en el Sidebar.

//    • Lider PPT:
//       --> Peticiones (Contenidos Digitales y Herramientas a Aprobar)

//    • Docente:
//       --> Crear Herramientas y Contenidos Digitales (Manejar Borradores en LocalStorage)
//       --> Mis Peticiones (Pendientes, Aceptadas y Rechazadas)
//       --> Mis Correcciones (Herramientas y/o Contenidos Digitales rechazados con descripciones)

//    • Administrativos:
//       --> Gestionar roles de un usuario

// - Responsive

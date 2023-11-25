import React, { useState } from 'react'
import Select from 'react-select';
import { useDigitales } from '../../../../Contextos/ModuleContexts/DigitalesContext';
import Alert from '../../../../Alertas/Alert';

function Modal({ isOpen, closeModal }) {
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedName, setSelectedName] = useState("");
   const [selectedEje, setSelectedEje] = useState('');
   const [estadoCheckbox, setEstadoCheckbox] = useState(false);
   const [alert, setAlert] = useState(null);

   const handleCheckboxChange = () => {
      setEstadoCheckbox(!estadoCheckbox);
   };

   const ejes = [
      {
         value: 1,
         label: "Emprendimiento",
         competencias: [
            {
               value: 1,
               label: "Participa activamente en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad."
            },
            {
               value: 2,
               label: "Capacidad de comunicarse constructivamente."
            },
            {
               value: 3,
               label: "Conoce y aplica las normas de tránsito y seguridad vial."
            }
         ]
      },
      {
         value: 2,
         label: "Sexualidad",
         competencias: [
            {
               value: 1,
               label: "Comprende los aspectos de la sexualidad humana, sus transiciones e implicaciones en la vida cotidiana."
            },
            {
               value: 2,
               label: "Identifica la diversidad que existe en los seres humanos y sus formas de expresarla."
            },
            {
               value: 3,
               label: "Toma decisiones centradas en el enfoque de derechos sexuales y reproductivos."
            }
         ]
      },
      {
         value: 3,
         label: "Medio Ambiente",
         competencias: [
            {
               value: 1,
               label: "Comprende los procesos de cuidado y protección del medio ambiente."
            },
            {
               value: 2,
               label: "Cuida y protege el medio ambiente."
            },
            {
               value: 3,
               label: "Promueve en su comunidad el cuidado y protección del medio ambiente."
            }
         ]
      },
      {
         value: 4,
         label: "Relaciones Sociales",
         competencias: [
            {
               value: 1,
               label: "Desarrolla pensamiento emprendedor en el ser, sentir, pensar y actuar."
            },
            {
               value: 2,
               label: "Desarrolla hábitos y valores emprendedores que orienten el comportamiento para el éxito personal."
            },
            {
               value: 3,
               label: "Tiene capacidad para entender el entorno socioeconómico en su contexto."
            }
         ]
      },
      {
         value: 5,
         label: "TICS",
         competencias: [
            {
               value: 1,
               label: "Comprende que las TIC facilitan responder a problemas de su entorno y se deben utilizar de manera responsable."
            },
            {
               value: 2,
               label: "Integra las TIC en el desarrollo de las actividades académicas y cotidianas para facilitar y agilizar los procesos operativos en los diferentes contextos."
            },
            {
               value: 3,
               label: "Construye soluciones a problemas del contexto usando las TIC."
            }
         ]
      },
   ]

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedName(file.name);
   };

   const [selectedOption, setSelectedOption] = useState('');
   const [URLInput, setURLInput] = useState(false);

   const options = [
      {
         value: 1,
         label: "Basica Primaria",
      },
      {
         value: 2,
         label: "Básica Secundaria",
      },
      {
         value: 3,
         label: "Media",
      },
   ];

   const { sendContenidos } = useDigitales()

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const data = {
            id_linea: selectedEje.value,
            nombre: event.target.titulo.value,
            descripcion: event.target.desc.value,
            id_poblacion: JSON.stringify(selectedOption.map((option) => ({
               id: option.value,
            }))),
            visibilidad: estadoCheckbox,
         };

         if (URLInput) {
            data.url = event.target.url.value
         } else {
            data.archivo = selectedFile
         }

         const response = await sendContenidos(data)
         console.log(response);
         if (response.status === 200) {
            setAlert({
               title: 'Contenido Digital Creado',
               desc: 'Has creado un contenido digital. Espera a que el Líder PPT lo revise y decida su publicación, o te proporcione retroalimentación.',
               bg_color: 'bg-green-100',
               border_color: 'border-green-500',
               text_color: 'text-green-900',
               svg_color: 'text-green-500',
               bar_color: 'bg-green-500',
            })
         }

      } catch (error) {
         console.error(error);
      }
   };

   const customStyles = {
      menuList: (provided) => ({
         ...provided,
         maxHeight: '200px',
      }),
      control: (provided) => ({
         ...provided,
         backgroundColor: '#eff6ff',
      }),
   };


   return isOpen && (
      <div className="fixed inset-0 overflow-y-auto">
         {
            alert && (
               <Alert
                  msg={{
                     title: alert.title,
                     desc: alert.desc,
                     bg_color: alert.bg_color,
                     border_color: alert.border_color,
                     text_color: alert.text_color,
                     svg_color: alert.svg_color,
                     bar_color: alert.bar_color,
                  }}
                  onClick={() => setAlert(null)}
               />
            )
         }
         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <>
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
            </>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl sm:w-full">
               {/* Contenido del modal */}
               <h4 className='font-medium text-center text-2xl my-4'>Crear Contenido Digital</h4>
               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto flex flex-col" id='Modal'>
                  <div className="radio-input">
                     <label className='p-1 px-5 max-sm:px-2'>
                        <input type="radio" id="value-1" name="value-radio" value="value-1" className="hidden" defaultChecked={URLInput}
                           onClick={(e) => setURLInput(true)} />
                        <span className='flex font-normal'>
                           <svg
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                           </svg>
                           <p className='max-sm:hidden ml-2'>URL</p>
                        </span>
                     </label>
                     <label className='p-1 px-5 max-sm:px-2'>
                        <input type="radio" id="value-2" name="value-radio" value="value-2" className="hidden" defaultChecked={!URLInput}
                           onClick={(e) => setURLInput(false)} />
                        <span className='flex font-normal'>
                           <svg
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                           </svg>
                           <p className='max-sm:hidden ml-2'>Archivo</p>
                        </span>
                     </label>
                  </div>

                  <form onSubmit={handleSubmit} className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col mx-6 my-5">
                     <div className='space-y-4 max-w-md w-full'>

                        <div>
                           {
                              URLInput ?
                                 <>
                                    <label htmlFor="url" className="block text-sm">URL</label>
                                    <input type="url" name="url" id="url" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50" required
                                       placeholder='https://www.ejemplo.com' />
                                 </>
                                 :
                                 <>
                                    <div className="bg-white p-4 rounded-2xl border-dashed border-2 flex flex-col items-center relative">
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-20 h-20">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                       </svg>

                                       <h3>{selectedName || "Arrastra y suelta archivos"}</h3>
                                       <p className="text-gray-500 text-sm mt-2">Soporta archivos: PNG, PDF, JPG</p>

                                       <input
                                          type="file"
                                          onChange={handleFileChange}
                                          className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-0 cursor-pointer z-10"
                                       />
                                    </div>
                                 </>
                           }
                        </div>
                        <div>
                           <label htmlFor="eje" className="block text-sm">Eje</label>
                           <Select
                              defaultValue={selectedEje}
                              onChange={setSelectedEje}
                              options={ejes}
                              placeholder="Elige un Eje"
                              menuPortalTarget={document.body}
                              id='eje'
                              styles={customStyles}
                           />
                        </div>
                        <div>
                           <label htmlFor="titulo" className="block text-sm">Título</label>
                           <input type="text" name="titulo" id="titulo" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50" required
                              placeholder='Escribe el título' />
                        </div>
                        <div>
                           <label htmlFor="desc" className="block text-sm">Descripción</label>
                           <input type="text" name="desc" id="desc" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50" required
                              placeholder='Escribe la descripción' />
                        </div>
                        <div>
                           <label htmlFor="poblacion" className="block text-sm">Población</label>
                           <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={options}
                              placeholder="Elige una población"
                              styles={customStyles}
                              isMulti
                           />
                        </div>

                        <div>
                           <label htmlFor='estado' className="block text-sm">Estado</label>
                           <label className="cyberpunk-checkbox-label">
                              <input
                                 type="checkbox"
                                 className="cyberpunk-checkbox"
                                 id='estado'
                                 name='estado'
                                 checked={estadoCheckbox}
                                 onChange={handleCheckboxChange}
                              />
                              Público
                           </label>
                        </div>

                        <div className='text-center'>
                           <button type="submit" className='hover:bg-blue-400 bg-blue-500 w-full text-white font-medium py-2 rounded-lg max-sm:mb-8'>
                              Enviar
                           </button>
                        </div>
                     </div>
                  </form>
               </div>

               {/* Botones del modal */}
               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-blue-500 bg-blue-600 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={closeModal}
                  >
                     Cerrar
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Modal
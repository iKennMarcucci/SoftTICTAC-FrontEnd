import React, { useState } from 'react'
import Select from 'react-select'

function Modal({ isOpen, closeModal }) {
   const [selectedOption, setSelectedOption] = useState('');
   const [selectedCompe, setSelectedCompe] = useState('');
   const [selectedEje, setSelectedEje] = useState('');
   const [estadoCheckbox, setEstadoCheckbox] = useState(false);
   const [nuevoRecurso, setNuevoRecurso] = useState('');
   const [recursos, setRecursos] = useState([
      {
         value: 1,
         label: "Crayones, Colores y Marcadores",
      },
      {
         value: 2,
         label: "Pliego de Cartulina",
      },
      {
         value: 3,
         label: "Pegante y Tijeras",
      },
      {
         value: 4,
         label: "Periódicos y Revistas",
      },
      {
         value: 5,
         label: "Plastilina",
      },
      {
         value: 6,
         label: "Pinceles y Pinturas",
      },
      {
         value: 7,
         label: "Papel Seda",
      },
      {
         value: 8,
         label: "Proyector y Sonido",
      },
      {
         value: 9,
         label: "Computadora Portatil",
      },
      {
         value: 10,
         label: "Palitos de Helado",
      },
   ]);

   const handleCheckboxChange = () => {
      setEstadoCheckbox(!estadoCheckbox);
   };

   const handleRecursoChange = (event) => {
      setNuevoRecurso(event.target.value);
   };

   const handleAgregarRecurso = () => {
      if (nuevoRecurso.trim() !== '') {
         // Verificar si el recurso ya está en la lista para evitar duplicados
         if (!recursos.some((recurso) => recurso.label === nuevoRecurso)) {
            setRecursos([...recursos, { label: nuevoRecurso }]);
            setNuevoRecurso('');
         } else {
            alert('El recurso ya está en la lista.');
         }
      } else {
         alert('Por favor, ingresa un nombre de recurso válido.');
      }
   };

   const [filas, setFilas] = useState([
      {
         proceso: '',
         recurso: '',
         tiempo: '',
      },
   ]);

   const handleAgregarFila = () => {
      setFilas([...filas, { proceso: '', recurso: '', tiempo: '' }]);
   };

   const handleEliminarFila = () => {
      if (filas.length > 1) {
         const nuevasFilas = [...filas];
         nuevasFilas.pop(); // Elimina la última fila
         setFilas(nuevasFilas);
      }
   };

   const handleSelectMinutosChange = (index, selectedMinutos) => {
      const nuevasFilas = [...filas];
      nuevasFilas[index].tiempo = selectedMinutos;
      setFilas(nuevasFilas);
   };

   const handleSelectRecursoChange = (index, selectedOption) => {
      const nuevasFilas = [...filas];
      nuevasFilas[index].recurso = selectedOption;
      setFilas(nuevasFilas);
   };

   const handleInputChange = (index, campo, valor) => {
      const nuevasFilas = [...filas];
      nuevasFilas[index][campo] = valor;
      setFilas(nuevasFilas);
   };

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

   const tiempoOptions = [
      {
         value: 1,
         label: "5",
      },
      {
         value: 2,
         label: "10",
      },
      {
         value: 3,
         label: "15",
      },
      {
         value: 4,
         label: "20",
      },
      {
         value: 5,
         label: "25",
      },
      {
         value: 6,
         label: "30",
      },
   ];

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         console.log(event);
         console.log(filas);
         const data = {
            titulo: event.target.nombre.value,
            poblacion: selectedOption,
            eje: selectedEje,
            tema: event.target.tema.value,
            objetivo: event.target.objetivo.value,
            competencias: selectedCompe,
            momentos: {
               presentacion: event.target.presentacion.value,
               desarrollo: filas,
               cierre: event.target.cierre.value,
            },
            publico: estadoCheckbox,
         }
         console.log(data);
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

   const customStyles2 = {
      menuList: (provided) => ({
         ...provided,
         maxHeight: '200px',
      }),
      control: (provided) => ({
         ...provided,
         backgroundColor: '#eff6ff',
         width: '220px'
      }),
   };

   const NoOptionsMessage = () => (
      <h5 className='text-gray-400 select-none cursor-not-allowed w-full text-center'>
         Elige un Eje Transversal Primero
      </h5>
   );

   return isOpen && (
      <div className="fixed inset-0 overflow-y-auto">
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl sm:w-full">
               {/* Contenido del modal */}
               <div className='py-4 shadow-lg mb-0.5'>
                  <h4 className='font-medium text-center text-2xl'>Crear Herramienta Pedagógica</h4>
               </div>

               <div className="px-4 pb-4 overflow-y-auto max-h-modal flex flex-col">
                  <form onSubmit={handleSubmit} className="flex items-center flex-col mx-6">
                     <h3 className='max-w-3xl w-full mt-4'>General</h3>
                     <hr className='border-delgado-b max-w-3xl w-full mb-4' />
                     <div className='space-y-4 max-w-2xl w-full mb-4'>
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
                           <label htmlFor="nombre" className="block text-sm">Nombre de la Herramienta</label>
                           <input type="text" name="nombre" id="nombre" className="border-delgado text-sm rounded-md w-full p-2.5 bg-blue-50" required
                              placeholder='Escribe el nombre de la herramienta' />
                        </div>
                        <div>
                           <label htmlFor="poblacion" className="block text-sm">Población Objetivo</label>
                           <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={options}
                              placeholder="Elige una población"
                              menuPortalTarget={document.body}
                              id='poblacion'
                              styles={customStyles}
                              isMulti
                           />
                        </div>
                        <div>
                           <label htmlFor="tema" className="block text-sm">Tema</label>
                           <input type="text" name="tema" id="tema" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50" required
                              placeholder='Escribe el tema' />
                        </div>
                        <div>
                           <label htmlFor="objetivo" className="block text-sm">Objetivo</label>
                           <input type="text" name="objetivo" id="objetivo" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50" required
                              placeholder='Escribe el objetivo a alcanzar' />
                        </div>
                        <div>
                           <label htmlFor="compe" className="block text-sm">Competencias</label>
                           <Select
                              defaultValue={selectedCompe}
                              onChange={setSelectedCompe}
                              options={selectedEje.competencias}
                              placeholder="Elige las competencias a desarrollar"
                              menuPortalTarget={document.body}
                              id='compe'
                              styles={customStyles}
                              isMulti
                              components={{
                                 NoOptionsMessage,
                              }}
                           />
                        </div>
                     </div>

                     <h3 className='max-w-3xl w-full'>Momentos para desarrollar</h3>
                     <hr className='border-delgado-b max-w-3xl w-full mb-4' />
                     <div className='space-y-4 max-w-2xl w-full mb-4'>
                        <div>
                           <label htmlFor="presentacion" className="block text-sm font-normal">Primer Momento (Presentación):</label>
                           <textarea name="presentacion" id="presentacion" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50 min-h-[100px] resize-none" required
                              placeholder='Escribe como se desarrollará la presentación de la herramienta' />
                        </div>

                        <div>
                           <label htmlFor="desarrollo" className="block text-sm font-normal">Segundo Momento (Desarrollo):</label>
                           <p className='mb-4'>El taller se desarrolla a través de las siguientes actividades que se describen a continuación:</p>

                           <div className='mb-2'>
                              <label htmlFor="recursoxdd" className="block text-sm font-normal">Nombre del Recurso</label>
                              <div className='grid grid-cols-12 gap-2'>
                                 <input
                                    type="text"
                                    name="recursoxdd"
                                    id="recursoxdd"
                                    className="col-span-9 border-delgado text-sm rounded-md w-full p-2.5 bg-blue-50"
                                    placeholder='Escribe el recurso a utilizar'
                                    value={nuevoRecurso}
                                    onChange={handleRecursoChange}
                                 />
                                 <button
                                    type="button"
                                    className='col-span-3 font-normal hover:bg-blue-500 bg-blue-600 text-white border-delgado rounded-md'
                                    onClick={handleAgregarRecurso}
                                 >
                                    Añadir Recurso
                                 </button>
                              </div>
                           </div>

                           <table className='text-center w-full'>
                              <thead>
                                 <tr>
                                    <th className='border-delgado w-6/12'>Proceso</th>
                                    <th className='border-delgado'>Recurso</th>
                                    <th className='border-delgado'>Tiempo (min)</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {filas.map((fila, index) => (
                                    <tr key={index} className='border-delgado'>
                                       <td className='border-delgado px-2 pt-2 text-justify'>
                                          <textarea
                                             name="proceso"
                                             value={fila.proceso}
                                             onChange={(e) => handleInputChange(index, 'proceso', e.target.value)}
                                             className="text-sm rounded-lg w-full p-2.5 bg-blue-50 min-h-[100px] resize-none border-delgado"
                                             required
                                             placeholder='Escribe cuales son los procesos de desarrollo de la herramienta'
                                          />
                                       </td>
                                       <td className='text-start px-2 border-delgado-r'>
                                          <Select
                                             value={fila.recurso}
                                             onChange={(selectedOption) => handleSelectRecursoChange(index, selectedOption)}
                                             options={recursos}
                                             isSearchable={false}
                                             placeholder="Recursos..."
                                             id={`recursos-${index}`}
                                             styles={customStyles2}
                                             isMulti
                                          />
                                       </td>
                                       <td className='text-start px-2'>
                                          <Select
                                             value={fila.tiempo}
                                             onChange={(selectedMinutos) => handleSelectMinutosChange(index, selectedMinutos)}
                                             options={tiempoOptions}
                                             isSearchable={false}
                                             placeholder="Min"
                                             id={`minutos-${index}`}
                                             styles={customStyles}
                                          />
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                           <div className='flex justify-center'>
                              <svg onClick={handleAgregarFila} className="w-10 h-10 cursor-pointer stroke-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <svg onClick={handleEliminarFila} className="w-10 h-10 cursor-pointer stroke-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </div>
                        </div>

                        <div>
                           <label htmlFor="cierre" className="block text-sm font-normal">Tercer Momento (Cierre):</label>
                           <textarea name="cierre" id="cierre" className="border-delgado text-sm rounded-lg w-full p-2.5 bg-blue-50 min-h-[100px] resize-none" required
                              placeholder='Escribe como se cerrará el desarrollo de la herramienta' />
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
                     </div>

                     <div className='text-center max-w-md w-full'>
                        <button type="submit" className='hover:bg-blue-500 bg-blue-600 w-full text-white font-medium py-2 rounded-lg max-sm:mb-8'>
                           Enviar
                        </button>
                     </div>
                  </form>
               </div>

               {/* Botones del modal */}
               <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-blue-500 bg-blue-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Modal
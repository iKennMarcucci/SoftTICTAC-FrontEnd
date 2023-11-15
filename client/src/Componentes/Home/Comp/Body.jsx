import React, { useState } from 'react'
import Elecciones from './BodyComp/Elecciones'

function Body() {

   const [eleccion, setEleccion] = useState(1)

   return (
      <>
         <section>
            <h2 className='text-2xl font-medium'>
               Modelo TIC TAC
            </h2>
            <hr className='border-stone-400' />
            <div className='flex mt-4 space-x-4'>
               <input
                  defaultChecked
                  id='radio1'
                  type='radio'
                  name='radioxd'
                  onClick={(e) => setEleccion(1)}
                  className='hidden'
               />

               <label
                  className={`cursor-pointer font-normal px-2 py-1.5 rounded-md hover:bg-blue-200 
                  ${eleccion === 1 ? 'bg-blue-300' : 'bg-blue-100'}`}
                  htmlFor='radio1'
               >
                  Nuestro Modelo
               </label>

               <input
                  id='radio2'
                  type='radio'
                  name='radioxd'
                  onClick={(e) => setEleccion(2)}
                  className='hidden'
               />

               <label
                  className={`cursor-pointer font-normal px-2 py-1.5 rounded-md hover:bg-blue-200 
                  ${eleccion === 2 ? 'bg-blue-300' : 'bg-blue-100'}`}
                  htmlFor='radio2'
               >
                  Ejes Transversales
               </label>

               <input
                  id='radio3'
                  type='radio'
                  name='radioxd'
                  onClick={(e) => setEleccion(3)}
                  className='hidden'
               />

               <label
                  className={`cursor-pointer font-normal px-2 py-1.5 rounded-md hover:bg-blue-200 
                  ${eleccion === 3 ? 'bg-blue-300' : 'bg-blue-100'}`}
                  htmlFor='radio3'
               >
                  Competencias
               </label>
            </div>
            {
               <Elecciones eleccion={eleccion} />
            }
         </section>
      </>
   )
}

export default Body
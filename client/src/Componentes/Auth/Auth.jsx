import React from 'react'
import Login from './Comp/Login'
import { Link } from 'react-router-dom'
import img from '../../../public/Logos/LogoFull.webp'

function Auth() {
   return (
      <>
         <div className='h-screen w-full'>
            <div className="grid grid-cols-2 max-md:grid-cols-1 w-full h-full">
               <div className="col-span-1 bg-blue-100 max-md:col-span-3">
                  <div className="h-full flex items-center justify-center rounded-2xl">
                     <div className="flex flex-col items-center px-4 text-center">
                        <Link to={'/'} className='mb-2'>
                           <img src={img} alt="Logo" className='w-64 max-md:w-48' />
                        </Link>
                        <p className="font-medium text-2xl">Bienvenido a SoftTICTAC</p>
                        <p className='text-sm italic mt-2'>Enseñar es sembrar semillas de sabiduría con amor, cultivando mentes que florecerán en la luz del conocimiento y la inspiración.</p>
                     </div>
                  </div>
               </div>
               <Login />
            </div>
         </div>
      </>
   )
}

export default Auth
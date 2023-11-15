import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoFull from '../../public/Logos/LogoFull.webp'

function Navbar() {
   const location = useLocation()
   const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup'

   const [cursorEnter, setcursorEnter] = useState(false);

   const toggleCursorEnter = () => {
      setcursorEnter(true);
   };

   return showNavbar && (
      <>
         <nav className='bg-blue-100 sticky w-full h-24 flex items-center px-10 space-x-10 z-50'>
            <Link to={'/'}>
               <img src={LogoFull} alt="Logo" width={150} />
            </Link>
            <ul className='flex h-full space-x-4 max-md:hidden'>
               <li className='px-2 flex items-center h-full'>
                  <Link to={'/'} className='h-full flex items-center font-medium hover:text-blue-500'>
                     Modelo TIC TAC
                  </Link>
               </li>
               <li className='px-2 flex items-center h-full'
                  onMouseEnter={toggleCursorEnter} onMouseLeave={() => setcursorEnter(false)}>
                  <div className='h-full flex items-center font-medium cursor-pointer'>
                     Contenidos <p className='pl-0.5'>▾</p>
                  </div>
               </li>
               <li className='px-2 flex items-center h-full'>
                  <Link to={'/'} className='h-full flex items-center font-medium hover:text-blue-500'>
                     Estadísticas
                  </Link>
               </li>
               <li className='px-2 flex items-center h-full'>
                  <Link to={'/'} className='h-full flex items-center font-medium hover:text-blue-500'>
                     Prueba
                  </Link>
               </li>
            </ul>
         </nav >
         {
            cursorEnter &&
            <>
               <nav className='w-full bg-blue-100 absolute top-24 border-blue-200 border-t-2 px-10 flex justify-center py-5 z-50 max-md:hidden'
                  onMouseEnter={toggleCursorEnter}
                  onMouseLeave={() => setcursorEnter(false)}
               >
                  <ul className='flex'>
                     <li className='px-4'>
                        <Link to="/" className="hover:text-blue-500">
                           Herramientas Pedagógicas
                        </Link>
                     </li>
                     <li className='px-4'>
                        <Link to="/" className="hover:text-blue-500">
                           Contenidos Digitales
                        </Link>
                     </li>
                     <li className='px-4'>
                        <Link to="/" className="hover:text-blue-500">
                           Planes de Trabajo
                        </Link>
                     </li>
                     <li className='px-4'>
                        <Link to="/" className="hover:text-blue-500">
                           Proyectos de Aula
                        </Link>
                     </li>
                  </ul>
               </nav>
            </>
         }
      </>
   )
}

export default Navbar
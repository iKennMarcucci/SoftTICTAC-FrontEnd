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
         <nav className='bg-blue-100 sticky top-0 w-full h-24 flex items-center justify-between px-10 space-x-10 z-50'>
            <div className='flex h-full items-center'>
               <Link to={'/'} className='max-lg:mr-0 mr-10'>
                  <img src={LogoFull} alt="Logo" width={150} />
               </Link>
               <ul className='flex h-full space-x-4 max-lg:hidden'>
                  <li className='px-2 flex items-center h-full'>
                     <Link to={'/'} className='h-full flex items-center font-medium hover:text-blue-500'>
                        Modelo TIC TAC
                     </Link>
                  </li>
                  <li className='px-2 flex items-center h-full'
                     onMouseEnter={toggleCursorEnter} onMouseLeave={() => setcursorEnter(false)}>
                     <div className='h-full flex items-center font-medium cursor-pointer'>
                        Módulos <p className='pl-0.5'>▾</p>
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
            </div>


            {/* 
               PARA EL LOGIN BETWEEN los LI y el logo
               <div>

               </div> 
            */}


            <div className='lg:hidden'>
               <label class="hamburger">
                  <input type="checkbox" />
                  <svg viewBox="0 0 32 32">
                     <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                     <path class="line" d="M7 16 27 16"></path>
                  </svg>
               </label>
            </div>
         </nav >
         {
            cursorEnter &&
            <>
               <nav className='w-full bg-blue-100 fixed top-24 border-blue-200 border-t-2 px-10 flex justify-center py-5 z-50 max-lg:hidden'
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
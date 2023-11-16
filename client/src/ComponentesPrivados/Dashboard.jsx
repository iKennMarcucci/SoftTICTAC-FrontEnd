import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoFull from '../../public/Logos/LogoFull.webp'
import Escudo from '../../public/Logos/IENSM.webp'
import userImage from '../../public/User/user.webp'
import { useAuth } from '../Contextos/AuthContext'
import { useRecoilState } from 'recoil';
import { isOpenState } from '../Contextos/RecoilState';

function Dashboard() {
   const location = useLocation()
   const navigate = useNavigate()
   const showDashboard = location.pathname.startsWith('/controlpanel');
   const [isOpen, setIsOpen] = useRecoilState(isOpenState);
   const [crearAccordionOpen, setCrearAccordionOpen] = useState(false);
   const [menuClicked, setMenuClicked] = useState(false);
   const menuButtonRef = useRef(null);
   const menuRef = useRef(null);

   const { logout } = useAuth();

   const cerrarSesion = async () => {
      const res = await logout()
      if (res.status === 200) {
         navigate('/login');
      }
   }

   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   const toggleCrearAccordion = () => {
      setCrearAccordionOpen(!crearAccordionOpen);
   };

   const toggleMenu = () => {
      setMenuClicked(!menuClicked);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(event.target)
         ) {
            setMenuClicked(false);
         }
      };

      // Agregar el event listener al documento
      document.addEventListener('mousedown', handleClickOutside);

      // Limpiar el event listener cuando el componente se desmonta
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [menuRef, menuButtonRef]);

   return showDashboard && (
      <>
         <div className="bg-blue-100 p-4 flex justify-between items-center">
            <div className='flex items-center space-x-6'>
               <div className='scale-75'>
                  <input id="checkbox" type="checkbox" onClick={toggleSidebar} />
                  <label className="toggle" htmlFor="checkbox">
                     <div id="bar1" className="bars"></div>
                     <div id="bar2" className="bars"></div>
                     <div id="bar3" className="bars"></div>
                  </label>
               </div>

               <Link to={'/'}>
                  <img src={LogoFull} alt="Logo" width={120} />
               </Link>
            </div>
            <div className='flex items-center'>
               <h5 className='italic font-medium'>Líder PPT</h5>
               <div className="relative ml-3">
                  <button
                     onClick={toggleMenu}
                     ref={menuButtonRef}
                     type="button"
                     className="relative flex rounded-full bg-rose-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-gray-800"
                     id="user-menu-button"
                     aria-expanded={menuClicked ? 'true' : 'false'}
                     aria-haspopup="true"
                  >
                     <span className="absolute -inset-1.5"></span>
                     <span className="sr-only">Abrir Menu</span>
                     <img
                        className="h-8 w-8 rounded-full"
                        src={userImage}
                        alt=""
                     />
                  </button>
                  {
                     menuClicked &&
                     <div
                        className="absolute right-0 z-10 mt-2 whitespace-nowrap origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                        ref={menuRef}
                     >
                        <Link to="/profile" className="flex px-4 py-2 text-sm not-italic font-normal text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                           </svg>
                           <p className='ml-1.5'>Mi Perfil</p>
                        </Link>
                        <div onClick={cerrarSesion} className="cursor-pointer flex px-4 py-2 text-sm not-italic font-normal text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                           </svg>
                           <p className='ml-1.5'>Cerrar Sesión</p>
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>
         <div className="flex">
            <div className={`fixed h-full bg-blue-100 border-t-2 border-blue-200 ${isOpen ? 'w-64' : 'w-28'} transition-all duration-300`}>
               <Link to={'/controlpanel'} className='flex justify-center'>
                  <img src={Escudo} alt="Logo" width={100} />
               </Link>
               <div className='p-4 w-full'>
                  <input type="checkbox" id="hola" name='hola' hidden />
                  <label
                     className={`cursor-pointer mb-1 flex items-center rounded-md justify-between px-2 hover:bg-blue-300 select-none ${crearAccordionOpen && 'bg-blue-300'}`}
                     htmlFor='hola'
                     onClick={toggleCrearAccordion}
                  >
                     <p className='font-medium'>Crear</p>
                     {
                        crearAccordionOpen ? (
                           <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="currentColor" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 10.8Z" />
                           </svg>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z" />
                           </svg>
                        )
                     }
                  </label>

                  {
                     crearAccordionOpen && (
                        <ul>
                           <li className="cursor-pointer rounded-md hover:font-light mb-1 px-2 hover:bg-blue-300">
                              <Link to={'/controlpanel/#'}>
                                 Herramientas Pedagógicas
                              </Link>
                           </li>
                           <li className="cursor-pointer rounded-md hover:font-light mb-1 px-2 hover:bg-blue-300">
                              <Link to={'/controlpanel/#'}>
                                 Contenidos Digitales
                              </Link>
                           </li>
                           <li className="cursor-pointer rounded-md hover:font-light mb-1 px-2 hover:bg-blue-300">
                              <Link to={'/controlpanel/#'}>
                                 Proyectos de Aula
                              </Link>
                           </li>
                           <li className="cursor-pointer rounded-md hover:font-light mb-1 px-2 hover:bg-blue-300">
                              <Link to={'/controlpanel/#'}>
                                 Planes de Trabajo
                              </Link>
                           </li>
                           <li className="cursor-pointer rounded-md hover:font-light mb-1 px-2 hover:bg-blue-300">
                              <Link to={'/controlpanel/#'}>
                                 Estadísticas
                              </Link>
                           </li>
                        </ul>
                     )
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default Dashboard
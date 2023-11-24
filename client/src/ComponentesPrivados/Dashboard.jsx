import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoFull from '../../public/Logos/LogoFull.webp'
import Escudo from '../../public/Logos/IENSM.webp'
import { useAuth } from '../Contextos/AuthContext'
import { useRecoilState } from 'recoil';
import { isOpenState } from '../Contextos/RecoilState';

function Dashboard() {
   const location = useLocation()
   const navigate = useNavigate()
   const showDashboard = location.pathname.startsWith('/controlpanel');
   const selectedHerramientas = location.pathname.startsWith('/controlpanel/herramientas');
   const selectedDigitales = location.pathname.startsWith('/controlpanel/contenidos-digitales');
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
         <div className="bg-blue-100 p-4 flex justify-between items-center fixed w-full">
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
               <h5 className='italic font-medium  max-sm:hidden'>Líder PPT</h5>
               <div className="relative ml-3">
                  <button className='relative flex w-8 h-8 p-1 justify-center items-center gap-2.5 rounded-full bg-blue-700'
                     onClick={toggleMenu}
                     ref={menuButtonRef}
                     aria-expanded={menuClicked ? 'true' : 'false'}
                     aria-haspopup="true"
                     id="user-menu-button"
                  >
                     <svg viewBox="0 0 24 24" strokeWidth={1} className="w-5 h-5 stroke-white fill-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                     </svg>
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
            <div className={`fixed top-24 h-full bg-blue-100 border-t-2 border-blue-200 ${isOpen ? 'w-72' : 'w-36 max-sm:w-0'} transition-all duration-300`}>
               <Link to={'/controlpanel'} className='flex justify-center'>
                  <img src={Escudo} alt="Logo" width={100} />
               </Link>
               <div className={`p-4 w-full ${!isOpen && 'max-sm:scale-0'}`}>
                  <input type="checkbox" id="hola" name='hola' hidden />
                  <label
                     className={`cursor-pointer mb-1 flex items-center rounded-md justify-between px-2 hover:bg-blue-300 select-none ${crearAccordionOpen && 'bg-blue-600 text-white'}`}
                     onClick={toggleCrearAccordion}
                  >
                     <p className={`font-medium py-1`}>Módulos</p>
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
                           <Link id='herramientas' to={'/controlpanel/herramientas'} className={`flex w-full items-center ${!isOpen && "justify-center"}`}>
                              <li className={`${selectedHerramientas && 'bg-blue-300'} flex w-full cursor-pointer rounded-md mb-1 px-2 hover:bg-blue-300 py-1 ${!isOpen && "justify-center"}`}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                 </svg>

                                 <p className={`ml-2 truncate
                                 ${isOpen ?
                                       'transition-all opacity-100 duration-500'
                                       :
                                       'transition-all w-0 h-0 opacity-0 duration-100'
                                    }`}>
                                    Herramientas Pedagógicas
                                 </p>
                              </li>
                           </Link>
                           <Link id='contenidos' to={'/controlpanel/contenidos-digitales'} className={`flex w-full items-center ${!isOpen && "justify-center"}`}>
                              <li className={`${selectedDigitales && 'bg-blue-300'} flex w-full cursor-pointer rounded-md mb-1 px-2 hover:bg-blue-300 py-1 ${!isOpen && "justify-center"}`}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                                 </svg>

                                 <p className={`ml-2 truncate
                                 ${isOpen ?
                                       'transition-all opacity-100 duration-500'
                                       :
                                       'transition-all w-0 h-0 opacity-0 duration-100'
                                    }`}>
                                    Contenidos Digitales
                                 </p>
                              </li>
                           </Link>
                           <Link id='proy-aula' to={'/controlpanel/#'} className={`flex w-full  items-center ${!isOpen && "justify-center"}`}>
                              <li className={`flex w-full cursor-pointer rounded-md mb-1 px-2 hover:bg-blue-300 py-1 ${!isOpen && "justify-center"}`}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                 </svg>

                                 <p className={`ml-2 truncate
                                 ${isOpen ?
                                       'transition-all opacity-100 duration-500'
                                       :
                                       'transition-all w-0 h-0 opacity-0 duration-100'
                                    }`}>
                                    Proyectos de Aula
                                 </p>
                              </li>
                           </Link>
                           <Link id='plan-trabajo' to={'/controlpanel/#'} className={`flex w-full items-center ${!isOpen && "justify-center"}`}>
                              <li className={`flex w-full cursor-pointer rounded-md mb-1 px-2 hover:bg-blue-300 py-1 ${!isOpen && "justify-center"}`}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                 </svg>

                                 <p className={`ml-2 truncate
                                 ${isOpen ?
                                       'transition-all opacity-100 duration-500'
                                       :
                                       'transition-all w-0 h-0 opacity-0 duration-100'
                                    }`}>
                                    Planes de Trabajo
                                 </p>
                              </li>
                           </Link>
                           <Link id='estadisticas' to={'/controlpanel/#'} className={`flex w-full items-center ${!isOpen && "justify-center"}`}>
                              <li className={`flex w-full cursor-pointer rounded-md mb-1 px-2 hover:bg-blue-300 py-1 ${!isOpen && "justify-center"}`}>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                 </svg>

                                 <p className={`ml-2 truncate
                                 ${isOpen ?
                                       'transition-all opacity-100 duration-500'
                                       :
                                       'transition-all w-0 h-0 opacity-0 duration-100'
                                    }`}>
                                    Estadísticas
                                 </p>
                              </li>
                           </Link>
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
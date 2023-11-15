import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import img from '../../public/Logos/LogoFull.webp'

function Footer() {
   const location = useLocation()
   const showFooter = location.pathname !== '/login'

   return showFooter && (
      <>
         <footer className="mt-10 rounded-lg shadow bg-blue-100">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
               <div className="sm:flex sm:items-center sm:justify-between">
                  <Link to={"/"} className="flex justify-center items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                     <img src={img} className="h-24" alt="Flowbite Logo" />
                  </Link>
                  <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-800 sm:mb-0">
                     <li>
                        <Link to={"/"} className="hover:underline me-4 md:me-6">Inicio</Link>
                     </li>
                     <li>
                        <Link to={"#"} className="hover:underline me-4 md:me-6">Términos y Condiciones</Link>
                     </li>
                     <li>
                        <Link to={"#"} className="hover:underline me-4 md:me-6">Políticas de Privacidad</Link>
                     </li>
                     <li>
                        <Link to={"#"} className="hover:underline">Contacto</Link>
                     </li>
                  </ul>
               </div>
               <hr className="my-6 sm:mx-auto border-gray-400 lg:my-8" />
               <span className="block text-sm text-gray-500 text-center"><a target='_blank' href="https://github.com/iKennMarcucci" className="hover:underline">iDigital Page</a> © 2023. Todos los derechos reservados.</span>
            </div>
         </footer>
      </>
   )
}

export default Footer
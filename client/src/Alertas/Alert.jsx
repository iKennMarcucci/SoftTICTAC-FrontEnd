import React, { useEffect, useState } from 'react'

function Alert({ msg, onClick }) {

   setTimeout(() => {
      onClick()
   }, 6000)

   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const intervalId = setInterval(() => {
         setProgress((prevProgress) => {
            if (prevProgress < 100) {
               return prevProgress + 20;
            } else {
               clearInterval(intervalId);
               return 100;
            }
         });
      }, 1000);

      return () => clearInterval(intervalId);
   }, []);

   return (
      <>

         {/* 

            Variables del Alert
               • title
               • desc
               • bg_color
               • border_color
               • text_color
               • svg_color
               • bar_color
         
            Colores para personalizar

               • success:
                  - msg.bg_color:      bg-teal-100
                  - msg.border_color:  border-teal-500
                  - msg.text_color:    text-teal-900
                  - msg.svg_color:     text-teal-500
                  - msg.bar_color:     bg-teal-500

               • danger:
                  - msg.bg_color:      bg-red-100
                  - msg.border_color:  border-red-500
                  - msg.text_color:    text-red-900
                  - msg.svg_color:     text-red-500
                  - msg.bar_color:     bg-red-500

               • warning:
                  - msg.bg_color:      bg-yellow-100
                  - msg.border_color:  border-yellow-500
                  - msg.text_color:    text-yellow-900
                  - msg.svg_color:     text-yellow-500
                  - msg.bar_color:     bg-yellow-500
         
         */}

         <div className='fixed top-5 left-5 right-5 max-w-md font-dmsans z-50' onClick={onClick}>
            <div className={`${msg.bg_color} border-t-4 ${msg.border_color} rounded-b ${msg.text_color} px-4 py-3 shadow-md flex flex-col justify-between`} role="alert">
               <div className="flex">
                  <div className="py-1">
                     <svg
                        className={`fill-current h-6 w-6 ${msg.svg_color} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                     </svg>
                  </div>
                  <div>
                     <p className="font-sans font-bold">{msg.title}</p>
                     <p className="text-sm">{msg.desc}</p>
                  </div>
               </div>
               <div className={`flex h-2 mt-2.5 overflow-hidden text-xs`}>
                  <div
                     style={{ width: `${progress}%` }}
                     className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
                        ${msg.bar_color} transition-width duration-1000 ease-in-out`}
                  />
               </div>
            </div>
         </div >
      </>
   )
}

export default Alert
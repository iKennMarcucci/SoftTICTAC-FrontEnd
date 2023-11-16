import React from 'react'
import img_2 from '../../../../public/Logos/SingleLogo.webp'

function Digitales() {

   const poblaciones = [
      {
         id: 1,
         poblacion: "Basica Primaria",
      },
      {
         id: 2,
         poblacion: "Básica Secundaria",
      },
      {
         id: 3,
         poblacion: "Media",
      },
   ]

   const ejes = [
      {
         id: 1,
         eje: "Emprendimiento",
      },
      {
         id: 2,
         eje: "Sexualidad",
      },
      {
         id: 3,
         eje: "Medio Ambiente",
      },
      {
         id: 4,
         eje: "Relaciones Sociales",
      },
      {
         id: 5,
         eje: "TICS",
      },
   ]

   const estructura = [
      {
         id: 1,
         titulo: "Nombre del Primer Contenido Digital",
         descripcion: "Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital Soy la descripción del Primer Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[0],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 2,
         titulo: "Nombre del Segundo Contenido Digital",
         descripcion: "Soy la descripción del Segundo Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[1],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 3,
         titulo: "Nombre del Tercer Contenido Digital",
         descripcion: "Soy la descripción del Tercer Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[2],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 4,
         titulo: "Nombre del Cuarto Contenido Digital",
         descripcion: "Soy la descripción del Cuarto Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[3],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 5,
         titulo: "Nombre del Quinto Contenido Digital",
         descripcion: "Soy la descripción del Quinto Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[4],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 6,
         titulo: "Nombre del Sexto Contenido Digital",
         descripcion: "Soy la descripción del Sexto Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[0],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 7,
         titulo: "Nombre del Septimo Contenido Digital",
         descripcion: "Soy la descripción del Septimo Contenido Digital",
         poblacion: poblaciones[0],
         eje: ejes[1],
         publico: true,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 8,
         titulo: "Nombre del Octavo Contenido Digital",
         descripcion: "Soy la descripción del Octavo Contenido Digital",
         poblacion: poblaciones[1],
         eje: ejes[2],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
      {
         id: 9,
         titulo: "Nombre del Noveno Contenido Digital",
         descripcion: "Soy la descripción del Noveno Contenido Digital",
         poblacion: poblaciones[2],
         eje: ejes[3],
         publico: false,
         imagenReferencia: img_2,
         url: ""
      },
   ]

   return estructura ? (
      <>
         <main className='container mx-auto mt-10'>
            <h2 className='text-2xl font-medium max-sm:mx-2'>
               Contenidos Digitales
            </h2>
            <hr className='border-stone-400 max-sm:mx-2' />
            <section className='container mx-auto mt-10 grid grid-cols-12 justify-items-center'>
               {
                  estructura.map((item, index) => item.publico && (
                     <>
                        <div key={index} className='max-sm:w-72 border-delgado rounded-md p-4 w-60 col-span-2 max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-4 max-xl:col-span-3 max-2xl:col-span-3 mb-3 flex flex-col justify-between'>
                           <div>
                              <div className='flex text-stone-500 text-xs'>
                                 <p className='font-light'>Población:&nbsp;</p>
                                 {item.poblacion.poblacion}
                              </div>
                              <div className='h-52 w-full overflow-hidden mb-4 bg-blue-50 p-4 rounded-lg'>
                                 <img src={item.imagenReferencia} alt={item.titulo} className='w-full h-full object-contain' />
                              </div>
                              <div className='text-center'>
                                 <h2 className='text-xl font-normal line-clamp-2' title={item.titulo}>{item.titulo}</h2>
                                 <p className='text-xs mt-2 line-clamp-3' title={item.descripcion}>{item.descripcion}</p>
                              </div>
                           </div>
                           <a href='https://github.com/iKennMarcucci' target='_blank' className='text-center cursor-pointer bg-blue-300 hover:bg-blue-400 mt-4 rounded-md py-1'>
                              Ver
                           </a>
                        </div>
                     </>
                  )
                  )
               }
            </section>
         </main>
      </>
   ) : (
      <>
         <p>No se ha encontrado ningún Contenido Digital</p>
      </>
   )
}

export default Digitales
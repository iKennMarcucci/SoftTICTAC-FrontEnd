import React from 'react'
import Carousel from './Comp/Carousel'
import Body from './Comp/Body'

function Home() {
   return (
      <>
         <main className='container mx-auto mt-10 space-y-10'>
            <Carousel />
            <Body />
         </main>
      </>
   )
}

export default Home
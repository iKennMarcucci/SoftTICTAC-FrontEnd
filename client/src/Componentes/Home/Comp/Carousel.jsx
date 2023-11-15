import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import img_1 from '../../../../public/Carousel/img_1.webp';
import img_2 from '../../../../public/Carousel/img_2.webp';
import img_3 from '../../../../public/Carousel/img_3.webp';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Carousel() {
   const imgCarousel = [
      { key: 1, url: img_1 },
      { key: 2, url: img_2 },
      { key: 3, url: img_3 },
   ]
   return (
      <>
         <section className='flex justify-center items-center mx-80 max-xl:mx-2 max-lg:mx-2 max-sm:mx-2'>
            <OwlCarousel className='owl-theme' items={1} autoplay loop dots={false}>
               {
                  imgCarousel.map((item) => (
                     <div key={item.key}>
                        <img src={item.url} alt={`Item ${item.key}`} />
                     </div>
                  ))
               }
            </OwlCarousel>
         </section>
      </>
   )
}
export default Carousel
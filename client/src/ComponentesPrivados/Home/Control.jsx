import React from 'react'
import { useRecoilValue } from 'recoil';
import { isOpenState } from '../../Contextos/RecoilState';
import { useLocation } from 'react-router-dom';
import HerramientasControl from '../Modulos/Herramientas/HerramientasControl';
import DigitalesControl from '../Modulos/Digitales/DigitalesControl';

function Control() {
   const isOpen = useRecoilValue(isOpenState);
   const location = useLocation()
   const showHerramientas = location.pathname.startsWith('/controlpanel/herramientas');
   const showDigitales = location.pathname.startsWith('/controlpanel/contenidos-digitales');
   return (
      <div className={`mt-24 flex-1 transition-all duration-300 ${isOpen ? 'ml-72' : 'ml-36 max-sm:ml-0'}`}>
         <div className="p-4">
            {
               showHerramientas ?
                  (
                     <HerramientasControl />
                  ) : showDigitales && (
                     <DigitalesControl />
                  )
            }
         </div>
      </div>
   );
};

export default Control
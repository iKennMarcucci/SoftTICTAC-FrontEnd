import React from 'react'
import { useRecoilValue } from 'recoil';
import { isOpenState } from '../../Contextos/RecoilState';

function Control() {
   const isOpen = useRecoilValue(isOpenState);
   return (
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-28'}`}>
         <div className="p-4">
            <h1>Contenido principal</h1>
         </div>
      </div>
   );
};

export default Control
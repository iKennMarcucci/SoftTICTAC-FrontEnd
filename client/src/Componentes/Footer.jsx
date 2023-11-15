import React from 'react'
import { useLocation } from 'react-router-dom'

function Footer() {
   const location = useLocation()
   const showFooter = location.pathname === '/login' || location.pathname === '/signup'

   return showFooter && (
      <>

      </>
   )
}

export default Footer
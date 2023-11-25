import { useState } from "react";
import { useAuth } from "../../../Contextos/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

   const { login } = useAuth();
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      username: "",
      password: "",
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const data = {
            "username": formData.username,
            "password": formData.password
         }
         const res = await login(data)
         if (res.status === 200) {
            // navigate('/')
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormData({
         ...formData,
         [name]: value,
      });
   };

   return (
      <>
         <form onSubmit={handleSubmit} className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col mx-6 my-5">
            <div className='text-center mb-2'>
               <h1 className='font-normal text-4xl'>
                  Iniciar Sesion
               </h1>
            </div>
            <div className='space-y-4 max-w-md w-full'>
               <div>
                  <label htmlFor="username" className="block text-sm">Email</label>
                  <input type="email" name="username" id="username" className="text-sm rounded-lg w-full p-2.5 bg-gray-100" required
                     onChange={handleChange} value={formData.username} />
               </div>
               <div>
                  <label htmlFor="password" className="block text-sm">Contraseña</label>
                  <input type="password" name="password" id="password"
                     className="text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 bg-gray-100" required
                     onChange={handleChange} value={formData.password} />
               </div>
               <div className='text-center'>
                  <button type="submit" className='hover:bg-blue-500 bg-blue-600 font-medium w-full text-white py-2 rounded-lg max-sm:mb-8'>
                     Ingresar
                  </button>
               </div>
            </div>
         </form>
      </>
   )
}

export default Login
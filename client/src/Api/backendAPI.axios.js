import axios from "axios";
import { endpoints } from "../Endpoints/Endpoints";

export const backendAPI = axios.create({
   baseURL: endpoints.URL_API,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   }
});
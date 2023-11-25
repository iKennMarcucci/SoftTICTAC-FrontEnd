import { backendAPI } from "../backendAPI.axios";
import { endpoints } from "../../Endpoints/Endpoints";

// Contenidos Digitales
export const getContenidosRequest = () => backendAPI.get(endpoints.PUBLIC_CONTENIDOS)

export const sendContenidosRequest = (body, token) => backendAPI.post(endpoints.CREATE_CONTENIDOS, body, {
   headers: { Authorization: `Bearer ${token}` },
});

// Herramientas Pedagógicas
export const getHerramientasRequest = () => backendAPI.get(endpoints.PUBLIC_HERRAMIENTAS)

export const sendHerramientasRequest = (body, token) => backendAPI.post(endpoints.CREATE_CONTENIDOS, body, {
   headers: { Authorization: `Bearer ${token}` },
});

// Items Shared
export const getEjesRequest = () => backendAPI.get(endpoints.GET_EJES)

export const getPoblacionesRequest = () => backendAPI.get(endpoints.GET_POBLACIONES)

// Auth
export const loginRequest = (body) => backendAPI.post(endpoints.LOGIN, body)

export const validateTokenRequest = (token) => backendAPI.get(endpoints.PROFILE, {
   headers: { Authorization: `Bearer ${token}` },
});
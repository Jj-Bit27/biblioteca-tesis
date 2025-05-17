import axios from "./axios";

/* Funcion para obtener todos los registros */
export const getsRegistrosRequest = async () =>
  axios.get(`/registros/gets`);

/* Funcion para obtener un registro en especifico*/
export const getRegistroRequest = async (id) => axios.get(`/registros/get/${id}`);

/* Funcion para verificar el token de un usuario */
export const addRegistroRequest = async (data) => axios.post(`/registros/add`, data);
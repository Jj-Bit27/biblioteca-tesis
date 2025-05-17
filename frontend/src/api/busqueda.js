import axios from "./axios";

/* Funcion para pedir al servidor todos los entregados */
export const getsLibrosRequest = async (filtro, seleccion, busqueda) => axios.get(`busqueda/libro?filtro=${filtro}&opcion=${seleccion}&titulo=${encodeURIComponent(
  busqueda
)}`);
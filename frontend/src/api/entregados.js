import axios from "./axios";

/* Funcion para pedir al servidor todos los entregados */
export const getsEntregadosRequest = async () => axios.get(`/entregados/gets`);

/* Funcion para pedir al servidor un entregado en especifico */
export const getEntregadoRequest = async (id) => axios.get(`/entregados/get/${id}`);

/* Funcion para agregar mediante el servidor un entregado */
export const addEntregadoRequest = async (data) => axios.post(`/enregados/add`, data);

/* Funcion para editar mediante el servidor un entregado */
export const editEntregadoRequest = async (data) => axios.put(`/enregados/edit/${data.id}`, data);

/* Funcion para eliminar mediante el servidor un entregadod */
export const deleteEntregadoRequest = async (id) => axios.delete(`/enregados/delete/${id}`);
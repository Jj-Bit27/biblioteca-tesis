import axios from "./axios";

/* Funcion para añadir un alumno */
export const addAlumnoRequest = async (data) =>
  axios.post(`/add/alumno`, data);

/* Funcion para añadir un libro */
export const addLibroRequest = async (data) =>
  axios.post(`/add/libro`, data);

/* Funcion para añadir una categoria */
export const addCategoriaRequest = async (data) =>
  axios.post(`/add/categoria`, data);

/* Funcion para añadir un editorial */
export const addEditorialRequest = async (data) =>
  axios.post(`/add/editorial`, data);

/* Funcion para añadir un autor */
export const addAutorRequest = async (data) =>
  axios.post(`/add/autor`, data);
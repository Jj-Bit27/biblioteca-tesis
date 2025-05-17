import axios from "./axios";

/* Funcion para obtener todos los alumnos */
export const getsAlumnosRequest = async () =>
  axios.get(`/get/alumnos`);

/* Funcion para obtener un alumno en especifico */
export const getAlumnoRequest = async (id) =>
  axios.get(`/get/alumno/${id}`);

/* Funcion para obtener todos los libros */
export const getsLibrosRequest = async () =>
  axios.get(`/get/libros`);

/* Funcion para obtener un libro en especifico */
export const getLibroRequest = async (id) =>
  axios.get(`/get/libro/${id}`);

/* Funcion para obtener todas las categorias */
export const getsCategoriasRequest = async () =>
  axios.get(`/get/categorias`);

/* Funcion para obtener una categoria en especifico */
export const getCategoriaRequest = async (id) =>
  axios.get(`/get/categoria/${id}`);

/* Funcion para obtener todos los editoriales */
export const getsEditorialesRequest = async () =>
  axios.get(`/get/editoriales`);

/* Funcion para obtener un editorial en especifico */
export const getEditorialRequest = async (id) =>
  axios.get(`/get/editorial/${id}`);

/* Funcion para obtener todos los autores */
export const getsAutoresRequest = async () =>
  axios.get(`/get/autores`);

/* Funcion para obtener un autor en especifico */
export const getAutorRequest = async (id) =>
  axios.get(`/get/autor/${id}`);
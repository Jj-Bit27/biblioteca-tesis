import { addLibroRequest } from "../../api/añadir.js";
import {
  getsCategoriasRequest,
  getsAutoresRequest,
  getsEditorialesRequest,
  getsLibrosRequest,
} from "../../api/obtener.js";
import LibrosForm from "../../components/Formularios/LibrosForm.jsx";
import BookList from "../../components/Listados/BookList.jsx";
import { useState, useEffect } from "react";

export default function AgregarLibros() {
  // Estados de datos de formulario
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [libros, setLibros] = useState([]);

  const [autorSeleccionado, setAutorSeleccionado] = useState("");
  const [editorialSeleccionada, setEditorialSeleccionada] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const [titulo, setTitulo] = useState("");
  const [existencias, setExistencias] = useState("");
  const [paginas, setPaginas] = useState("");

  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");

  // Obtener autores, editoriales y categorías
  const fetchApi = async () => {
    try {
      const { data: responseAutores } = await getsAutoresRequest();
      const { data: responseEditoriales } = await getsEditorialesRequest();
      const { data: responseCategorias } = await getsCategoriasRequest();
      const { data: responseLibros } = await getsLibrosRequest();

      if (
        !responseAutores ||
        !responseEditoriales ||
        !responseCategorias ||
        !responseLibros
      ) {
        throw new Error("Error al obtener los datos");
      }

      setAutores(responseAutores.result);
      setEditoriales(responseEditoriales.result);
      setCategorias(responseCategorias.result);
      setLibros(responseLibros.result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoLibro = {
      titulo,
      id_autor: parseInt(autorSeleccionado),
      id_editorial: parseInt(editorialSeleccionada),
      id_categoria: parseInt(categoriaSeleccionada),
      existencias: parseInt(existencias),
      num_paginas: parseInt(paginas),
    };

    try {
      const { data } = await addLibroRequest(nuevoLibro);

      if (data) {
        setNotificacion("true");
        setError("");
        resetForm();
        setLibros((prev) => [data, ...prev]);
      } else {
        setNotificacion("error");
        setError("Error al guardar el libro");
      }
    } catch (error) {
      console.error("Error al guardar el libro:", error.response.data.message);
      setNotificacion("");
      setError("No se pudo conectar al servidor.");
    } finally {
      setTimeout(() => setNotificacion(""), 3000);
    }
  };

  // Limpiar campos
  const resetForm = () => {
    setTitulo("");
    setAutorSeleccionado("");
    setEditorialSeleccionada("");
    setCategoriaSeleccionada("");
    setExistencias("");
    setPaginas("");
  };

  return (
    <div>
      <div className="mt-24">
        <LibrosForm
          handleSubmit={handleSubmit}
          autores={autores}
          editoriales={editoriales}
          categorias={categorias}
          autorSeleccionado={autorSeleccionado}
          setAutorSeleccionado={setAutorSeleccionado}
          editorialSeleccionada={editorialSeleccionada}
          setEditorialSeleccionada={setEditorialSeleccionada}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          titulo={titulo}
          setTitulo={setTitulo}
          existencias={existencias}
          setExistencias={setExistencias}
          paginas={paginas}
          setPaginas={setPaginas}
          notificacion={notificacion}
          error={error}
        />
        <div className="flex justify-around items-center mb-4 mt-5">
          <button
            onClick={() => logout()}
            className="bg-slate-800 text-white p-2 rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
        <BookList
          libros={libros}
          autores={autores}
          editoriales={editoriales}
          categorias={categorias}
        />
      </div>
    </div>
  );
}

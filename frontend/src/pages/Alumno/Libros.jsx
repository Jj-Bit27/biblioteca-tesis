import React from "react";
import BookList from "../../components/Listados/BookList.jsx";
import { useEffect, useState } from "react";
import { getsLibrosRequest } from "../../api/obtener.js";

function InventarioLibros() {
  const [libros, setLibros] = useState([]);

  // Obtener autores, editoriales y categorías
  const fetchApi = async () => {
    try {
      const { data: responseLibros } = await getsLibrosRequest();

      if (!responseLibros) {
        throw new Error("Error al obtener los datos");
      }
      setLibros(responseLibros.result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-6 mt-9 text-center text-black">
        Inventario de Libros
      </h1>
      <ul className="space-y-4">
        <BookList libros={libros} />
      </ul>
    </div>
  );
}

export default InventarioLibros;

import React from "react";
import CategList from "../../components/Listados/CategList.jsx";
import { getsCategoriasRequest } from "../../api/obtener.js";
import { useEffect, useState } from "react";

function InventarioLibros() {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const { data } = await getsCategoriasRequest();

      if (!data) {
        throw new Error("Error al obtener las categorias");
      }

      const categoriasData = data.result || data;
      setCategorias(categoriasData);
    } catch (error) {
      console.error(
        "Error al obtener las categorias:",
        error.response.data.message
      );
      setError(
        "Error al cargar la lista de categorias: " + error.response.data.message
      );
    }
  };

  // Efecto para recargar la lista cuando cambia forceRefresh NUEVO
  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">
        Categorias existentes de libros
      </h1>
      <ul className="space-y-4">
        <CategList categorias={categorias} />
      </ul>
    </div>
  );
}

export default InventarioLibros;

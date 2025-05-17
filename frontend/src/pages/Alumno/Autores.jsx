import React from "react";
import AutorsList from "../../components/Listados/AutorList.jsx";
import { getsAutoresRequest } from "../../api/obtener.js";
import { useEffect, useState } from "react";

function InventarioAutores() {
  const [autores, setAutores] = useState([]);

  const fetchAutores = async () => {
    try {
      const { data } = await getsAutoresRequest();

      if (!data) {
        throw new Error("Error al obtener los autores");
      }

      const autoresData = data.result || data;
      setAutores(autoresData);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
      setError("Error al cargar la lista de alumnos: " + error.message);
    }
  };

  // Efecto para recargar la lista cuando cambia forceRefresh NUEVO
  useEffect(() => {
    fetchAutores();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">
        Autores de tus libros
      </h1>
      <ul className="space-y-4">
        <AutorsList autores={autores} />
      </ul>
    </div>
  );
}

export default InventarioAutores;

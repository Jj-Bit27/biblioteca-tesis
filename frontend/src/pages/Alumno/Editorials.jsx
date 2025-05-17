import React from "react";
import EditorialesList from "../../components/Listados/EditorialsList.jsx";
import { useState, useEffect } from "react";
import { getsEditorialesRequest } from "../../api/obtener.js";

function EditorialesPage() {
  const [editoriales, setEditoriales] = useState([]);

  const fetchEditoriales = async () => {
    try {
      const { data } = await getsEditorialesRequest();

      if (!data) {
        throw new Error("Error al obtener los editoriales ");
      }

      const editorialesData = data.result || data;
      setEditoriales(editorialesData);
    } catch (error) {
      console.error("Error al obtener alumnos:", error.rsponse.data.message);
      setError(
        "Error al cargar la lista de alumnos: " + error.response.data.message
      );
    }
  };

  // Efecto para recargar la lista cuando cambia forceRefresh NUEVO
  useEffect(() => {
    fetchEditoriales();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">
        Editoriales existentes
      </h1>
      <ul className="space-y-4">
        <EditorialesList editoriales={editoriales} />
      </ul>
    </div>
  );
}

export default EditorialesPage;

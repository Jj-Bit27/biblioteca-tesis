import EditorialesForm from "../../components/Formularios/EditorialesForm.jsx";
import { useState, useEffect } from "react";
import { getsEditorialesRequest } from "../../api/obtener.js";
import { addEditorialRequest } from "../../api/añadir.js";
import EditorialesList from "../../components/Listados/EditorialsList.jsx";

export default function AgregarEditoriales() {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");
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

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaEditorial = { nombre };

    try {
      const { data } = await addEditorialRequest(nuevaEditorial);

      if (data) {
        setNotificacion("true");
        setError("");
        resetForm();
        setEditoriales((prev) => [data, ...prev]);
      } else {
        setNotificacion("error");
        setError("Error al guardar la editorial");
      }
    } catch (error) {
      console.error(
        "Error al guardar la editorial:",
        error.response.data.message
      );
      setNotificacion("error");
      setError("No se pudo conectar al servidor.");
    }
  };

  // Resetear campos
  const resetForm = () => {
    setNombre("");
  };

  return (
    <div>
      <div className="mt-24">
        <EditorialesForm
          handleSubmit={handleSubmit}
          editorialSeleccionada={nombre}
          setEditorialSeleccionada={setNombre}
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
        <EditorialesList editoriales={editoriales} />
      </div>
    </div>
  );
}

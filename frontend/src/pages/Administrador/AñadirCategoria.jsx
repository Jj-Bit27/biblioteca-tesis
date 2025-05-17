import CategoriasForm from "../../components/Formularios/CategoriasForm.jsx";
import { useState, useEffect } from "react";
import CategList from "../../components/Listados/CategList.jsx";
import { getsCategoriasRequest } from "../../api/obtener.js";
import { addCategoriaRequest } from "../../api/añadir.js";

export default function AgregarCategorias() {
  /* Estados para los datos del formulario */
  const [nombre, setNombre] = useState("");
  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");
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

  /* Función para enviar los datos */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construcción del objeto a enviar
    const nuevaCategoria = { nombre };

    try {
      const { data } = await addCategoriaRequest(nuevaCategoria);

      // Manejo de respuestas
      if (data) {
        setNotificacion("true");
        setNombre(""); // Limpia el campo
        setCategorias((prev) => [data, ...prev]);
      } else {
        setNotificacion("error");
        setError("Error al guardar la categoría");
      }
    } catch (error) {
      console.error(
        "Error al guardar la categoría:",
        error.response.data.message
      );
      setNotificacion("error");
      setError("No se pudo conectar al servidor.");
    }

    // Ocultar notificación después de 3 segundos
    setTimeout(() => setNotificacion(""), 3000);
  };

  return (
    <div>
      <div className="mt-24">
        <CategoriasForm
          handleSubmit={handleSubmit}
          categoriaSeleccionada={nombre}
          setCategoriaSeleccionada={setNombre}
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
        <CategList categorias={categorias} />
      </div>
    </div>
  );
}

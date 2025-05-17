import AutoresForm from "../../components/Formularios/AutoresForm.jsx";
import { useState } from "react";
import AutorsList from "../../components/Listados/AutorList.jsx";
import { useEffect } from "react";
import { getsAutoresRequest } from "../../api/obtener.js";
import { addAutorRequest } from "../../api/añadir.js";

export default function AgregarAutores() {
  /* Estados para los datos del formulario */
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");
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

  /* Función para enviar los datos */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoAutor = { nombre, apellido };

    try {
      const { data } = await addAutorRequest(nuevoAutor);

      // Manejo de respuestas
      if (data) {
        setNotificacion("true");
        setNombre(""); // Limpia el campo
        setApellido(""); // Limpia el campo
        setAutores((prev) => [data, ...prev]);
      } else {
        setNotificacion("error");
        setError("Error al guardar al autor");
      }
    } catch (error) {
      console.error("Error al guardar al autor:", error.response.data.message);
      setNotificacion("error");
      setError("No se pudo conectar al servidor.");
    }

    // Ocultar notificación después de 3 segundos
    setTimeout(() => setNotificacion(""), 3000);
  };

  return (
    <div>
      <div className="mt-24">
        <AutoresForm
          handleSubmit={handleSubmit}
          Nombre={nombre}
          setNombre={setNombre}
          Apellido={apellido}
          setApellido={setApellido}
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
        <AutorsList autores={autores} />
      </div>
    </div>
  );
}

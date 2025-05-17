import AlumnosForm from "../../components/Formularios/Alumnosform.jsx";
import AlumnosList from "../../components/Listados/AlumnosList.jsx";
import { useState, useEffect } from "react";
import { getsAlumnosRequest } from "../../api/obtener.js";
import { addAlumnoRequest } from "../../api/añadir.js";

export default function AgregarAlumnos() {
  // Estados
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [grado, setGrado] = useState("");
  const [grupo, setGrupo] = useState("");
  const [numControl, setNumControl] = useState("");
  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  // Obtener alumnos desde la API MODIFICADO
  const fetchAlumnos = async () => {
    try {
      const { data } = await getsAlumnosRequest();

      if (!data) {
        throw new Error("Error al obtener los alumnos");
      }

      const alumnosData = data.result || data;
      setAlumnos(alumnosData);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
      setError("Error al cargar la lista de alumnos: " + error.message);
    }
  };

  // Efecto para recargar la lista cuando cambia forceRefresh NUEVO
  useEffect(() => {
    fetchAlumnos();
  }, []);

  // Agregar alumno a la API MODIFICADO
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoAlumno = {
      nombre,
      apellido,
      grado: parseInt(grado),
      grupo,
      num_control: parseInt(numControl),
    };

    try {
      const { data } = await addAlumnoRequest(nuevoAlumno);

      if (data) {
        setNotificacion("true");
        resetForm();
        setAlumnos((prev) => [data, ...prev]);
      } else {
        setNotificacion("error");
        setError(data.message || "Error al guardar el alumno");
      }
    } catch (error) {
      setNotificacion("error");
      setError("Error al guardar el alumno: " + error.response.data.message);
      console.error("Error:", error.response.data.message);
    }
  };

  // Resetear formulario NUEVO CREO
  const resetForm = () => {
    setNombre("");
    setApellido("");
    setGrado("");
    setGrupo("");
    setNumControl("");
  };

  return (
    <div>
      <div className="mt-24">
        <AlumnosForm
          handleSubmit={handleSubmit}
          nombre={nombre}
          setNombre={setNombre}
          apellido={apellido}
          setApellido={setApellido}
          grado={grado}
          setGrado={setGrado}
          grupo={grupo}
          setGrupo={setGrupo}
          numControl={numControl}
          setNumControl={setNumControl}
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
        {/* Pasar los alumnos como prop NUEVO EN NOFETCH*/}
        <AlumnosList alumnos={alumnos} />
      </div>
    </div>
  );
}

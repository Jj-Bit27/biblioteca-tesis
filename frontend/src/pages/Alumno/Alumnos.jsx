import { useState, useEffect } from "react";
import AlumnosList from "../../components/Listados/AlumnosList.jsx";
import { getsAlumnosRequest } from "../../api/obtener.js";

function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);

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

  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">
        Alumnos Registrados
      </h1>
      <ul className="space-y-4">
        <AlumnosList alumnos={alumnos} />
      </ul>
    </div>
  );
}

export default AlumnosPage;

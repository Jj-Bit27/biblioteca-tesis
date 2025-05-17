import { useState, useEffect } from "react";
import RegistroForm from "../../components/Formularios/RegistroForm.jsx";
import RegisterList from "../../components/Listados/RegisterList.jsx";
import { getsAlumnosRequest, getsLibrosRequest } from "../../api/obtener.js";
import {
  addRegistroRequest,
  getsRegistrosRequest,
} from "../../api/registros.js";
import { useAuth } from "../../lib/authContext.jsx";

export default function AgregarRegistros() {
  // Estados del formulario
  const [idAlumno, setIdAlumno] = useState("");
  const [idLibro, setIdLibro] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTermino, setFechaTermino] = useState("");
  const { logout } = useAuth();

  // Datos desde la API
  const [alumnos, setAlumnos] = useState([]);
  const [libros, setLibros] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  // Obtener datos para dropdown
  const fetchApi = async () => {
    try {
      const { data: responseAlumnos } = await getsAlumnosRequest();
      const { data: responseLibros } = await getsLibrosRequest();
      const { data: responseRegistros } = await getsRegistrosRequest();

      if (!responseAlumnos || !responseLibros || !responseRegistros) {
        throw new Error("Error al obtener los datos");
      }

      setAlumnos(responseAlumnos.result);
      setLibros(responseLibros.result);
      setRegistros(responseRegistros.result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Guardar nuevo registro
  const guardarRegistro = async (e) => {
    e.preventDefault();

    const nuevoRegistro = {
      id_alumno: idAlumno,
      id_libro: idLibro,
      inicio: fechaInicio,
      fin: fechaTermino,
    };

    try {
      const { data } = await addRegistroRequest(nuevoRegistro);

      if (data) {
        setNotification("true");
        setError("");
        resetForm();

        const alumno = alumnos.find(
          (a) => a.id === Number(nuevoRegistro.id_alumno)
        );
        const libro = libros.find(
          (l) => l.id === Number(nuevoRegistro.id_libro)
        );

        const datetimeFormat = (dateString) => {
          const date = new Date(dateString);
          return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        };

        const prestamoFormateado = {
          id: data.id,
          alumno: alumno?.nombre || "Desconocido",
          libro: libro?.titulo || "Desconocido",
          inicio: datetimeFormat(nuevoRegistro.fecha_inicio),
          fin: datetimeFormat(nuevoRegistro.fecha_fin),
        };

        setRegistros((prev) => [prestamoFormateado, ...prev]);
      } else {
        setNotification("error");
        setError("Error al guardar el registro");
      }
    } catch (error) {
      console.error("Error al guardar el registro:", error);
      setNotification("error");
      setError("No se pudo conectar al servidor.");
    } finally {
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Limpiar campos del formulario
  const resetForm = () => {
    setIdAlumno("");
    setIdLibro("");
    setFechaInicio("");
    setFechaTermino("");
  };

  return (
    <div>
      <div className="mt-24">
        <RegistroForm
          idAlumno={idAlumno}
          idLibro={idLibro}
          setIdAlumno={setIdAlumno}
          setIdLibro={setIdLibro}
          setFechaInicio={setFechaInicio}
          setFechaTermino={setFechaTermino}
          alumnos={alumnos}
          libros={libros}
          guardarRegistro={guardarRegistro}
          notification={notification}
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
        <RegisterList registros={registros} />
      </div>
    </div>
  );
}

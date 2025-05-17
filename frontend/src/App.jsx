/* Bibliotecas */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Otros archivos */
import Layout from "./components/Navegacion/Layout.jsx";
import { AuthProvider } from "./lib/authContext.jsx";
import { ProtectedRoute } from "./lib/routes.jsx";

/* Páginas */
import AgregarRegistros from "./pages/Administrador/AñadirRegistro.jsx";
import AgregarLibros from "./pages/Administrador/AñadirLibro.jsx";
import AgregarCategorias from "./pages/Administrador/AñadirCategoria.jsx";
import AgregarEditoriales from "./pages/Administrador/AñadirEditorial.jsx";
import AgregarAutores from "./pages/Administrador/AñadirAutor.jsx";
import AgregarAlumnos from "./pages/Administrador/AñadirAlumno.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

import RegistrosPage from "./pages/Alumno/Registros.jsx";
import Inventario from "./pages/Alumno/Inventario.jsx";
import InventarioLibros from "./pages/Alumno/Libros.jsx";
import Categorias from "./pages/Alumno/Categorias.jsx";
import Editoriales from "./pages/Alumno/Editorials.jsx";
import Autores from "./pages/Alumno/Autores.jsx";
import Alumnos from "./pages/Alumno/Alumnos.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/libros" element={<InventarioLibros />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/editoriales" element={<Editoriales />} />
            <Route path="/autores" element={<Autores />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/agregar-autores" element={<AgregarAutores />} />
              <Route path="/agregar-alumnos" element={<AgregarAlumnos />} />
              <Route
                path="/agregar-editoriales"
                element={<AgregarEditoriales />}
              />
              <Route
                path="/agregar-categorias"
                element={<AgregarCategorias />}
              />
              <Route path="/agregar-libro" element={<AgregarLibros />} />
              <Route path="/agregar-registro" element={<AgregarRegistros />} />
              <Route path="/registros" element={<RegistrosPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

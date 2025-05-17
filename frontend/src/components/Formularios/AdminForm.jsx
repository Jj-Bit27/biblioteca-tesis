import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/authContext";

export default function PasswordForm() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { usuario: usuario, password };
    signin(data);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/[0.005] bg-[#f7f7f7] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Acceso a la página
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="usuario"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Usuario de administrador:
            </label>
            <input
              type="text"
              id="usuario"
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Correo o nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="clave"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Clave de administrador:
            </label>
            <input
              type="password"
              id="clave"
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Clave de 6 dígitos"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-slate-500 text-white font-semibold rounded-md hover:bg-slate-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

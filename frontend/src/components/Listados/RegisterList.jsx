import React from "react";
import { useState } from "react";

import { Pagination } from "../TablePagination/Pagination";

const RegistrosListPage = ({ registros: registrosProp }) => {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = registrosProp ? registrosProp.length / porPagina : 0;

  if (!registrosProp || registrosProp.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">
          No hay registros disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {registrosProp
        .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((registro) => (
          <li
            key={registro.id}
            className="flex items-center justify-between py-4"
          >
            {/* Nombre del alumno */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {registro.alumno}
              </span>
              <span className="text-sm text-gray-600">{registro.libro}</span>
            </div>

            {/* Fechas */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Inicio: {new Date(registro.inicio).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Fin: {new Date(registro.fin).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}

      <Pagination
        pagina={pagina}
        setPagina={setPagina}
        maximo={maximo}
        className="justify-center"
      />
    </div>
  );
};

export default RegistrosListPage;

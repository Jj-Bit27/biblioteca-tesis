import React, { useState } from "react";
import { Pagination } from "../TablePagination/Pagination";

const EditorialesList = ({ editoriales }) => {
  // Estados para paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = editoriales ? Math.ceil(editoriales.length / porPagina) : 0;

  if (!editoriales || editoriales.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">
          No hay editoriales registradas.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {editoriales
        .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((editorial) => (
          <div
            key={editorial.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            <div className="text-left w-2/3">
              <h2 className="text-lg font-semibold text-gray-800">
                {editorial.nombre}
              </h2>
            </div>
          </div>
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

export default EditorialesList;

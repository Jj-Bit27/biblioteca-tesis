import React, { useState, useEffect } from "react";
import { Pagination } from "../TablePagination/Pagination";

const LibrosListPage = ({ libros, autores, editoriales, categorias }) => {
  // Estados para paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = libros ? Math.ceil(libros.length / porPagina) : 0;

  if (!libros || libros.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay libros registrados.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {libros
        .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((libro) => (
          <div
            key={libro.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            <div className="text-left w-2/3">
              <h2 className="text-lg font-semibold text-gray-800">
                {libro.titulo}
              </h2>
              <p className="text-sm text-gray-500">Autor: {libro.autor}</p>
              <p className="text-sm text-gray-500">
                Editorial: {libro.editorial}
              </p>
              <p className="text-sm text-gray-500">
                Categoría: {libro.categoria}
              </p>
              <p className="text-sm text-gray-500">
                Existencias: {libro.existencias}
              </p>
              <p className="text-sm text-gray-500">Páginas: {libro.paginas}</p>
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

export default LibrosListPage;

import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showInfo = true,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay muchas páginas, mostrar un rango inteligente
      if (currentPage <= 3) {
        // Páginas iniciales
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Páginas finales
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Páginas intermedias
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      {/* Información de elementos */}
      {showInfo && (
        <div className="d-flex align-items-center py-2">
          <span className="text-muted font-weight-bold mr-2">
            Mostrando {startItem} a {endItem} de {totalItems} elementos
          </span>
          {showItemsPerPage && (
            <div className="d-flex align-items-center ml-4">
              <span className="text-muted font-weight-bold mr-2">
                Elementos por página:
              </span>
              <select
                className="form-control form-control-sm w-auto"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Controles de paginación */}
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          {/* Botón Primera página */}
          <button
            className="btn btn-icon btn-sm btn-light mr-2"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="Primera página"
          >
            <FirstPage style={{ fontSize: 18 }} />
          </button>

          {/* Botón Página anterior */}
          <button
            className="btn btn-icon btn-sm btn-light mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Página anterior"
          >
            <NavigateBefore style={{ fontSize: 18 }} />
          </button>

          {/* Números de página */}
          <div className="d-flex align-items-center">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-muted">...</span>
                ) : (
                  <button
                    className={`btn btn-sm mr-1 ${
                      page === currentPage ? "btn-primary" : "btn-light-primary"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Botón Página siguiente */}
          <button
            className="btn btn-icon btn-sm btn-light ml-2 mr-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Página siguiente"
          >
            <NavigateNext style={{ fontSize: 18 }} />
          </button>

          {/* Botón Última página */}
          <button
            className="btn btn-icon btn-sm btn-light"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Última página"
          >
            <LastPage style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import { Delete, Search } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { deleteRelacion } from "../../../../_redux/patronosRelaciones/relacionesActions";
import { useFetchRelaciones } from "../../../../hooks";

const RelacionesListado = ({ refreshTrigger }) => {
  const dispatch = useDispatch();
  const [relaciones, loading, actionsLoading] = useFetchRelaciones();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) {
    return <LayoutSplashScreen />;
  }

  // Filtrar relaciones por búsqueda
  const filteredRelaciones =
    relaciones?.filter(
      (relacion) =>
        relacion.nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
        relacion.razonSocial?.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRelaciones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRelaciones.length / itemsPerPage);

  const handleDelete = async (relacionId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta relación?")
    ) {
      try {
        await dispatch(deleteRelacion(relacionId));
      } catch (error) {
        console.error("Error al eliminar relación:", error);
      }
    }
  };

  return (
    <div className="card card-custom">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">Relaciones Patrono - Cliente</h3>
        </div>
        <div className="card-toolbar">
          <div className="input-icon">
            <input
              type="text"
              className="form-control form-control-solid"
              placeholder="Buscar por nombre o razón social..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span>
              <Search style={{ color: "#7E8299" }} />
            </span>
          </div>
        </div>
      </div>

      <div className="card-body">
        {filteredRelaciones.length === 0 ? (
          <div className="d-flex flex-column align-items-center py-10">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron relaciones
            </h3>
            <p className="text-muted font-weight-bold">
              {searchText
                ? "Intenta ajustar tu búsqueda"
                : "Aún no hay relaciones creadas"}
            </p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">ID</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Nombre</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Razón Social</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((relacion) => (
                    <tr key={relacion.id} className="border-bottom">
                      <td className="pl-7">
                        <span className="text-dark font-weight-bolder">
                          {relacion.id}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {relacion.nombre}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {relacion.razonSocial}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => handleDelete(relacion.id)}
                            className="btn btn-sm btn-light-danger"
                            disabled={actionsLoading}
                            title="Eliminar relación"
                          >
                            {actionsLoading ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <Delete />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-5">
                <div className="d-flex align-items-center">
                  <span className="text-muted font-weight-bold mr-4">
                    Mostrando {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, filteredRelaciones.length)} de{" "}
                    {filteredRelaciones.length} relaciones
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-icon btn-sm btn-light mr-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="text-dark font-weight-bold mx-3">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    className="btn btn-icon btn-sm btn-light ml-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RelacionesListado;

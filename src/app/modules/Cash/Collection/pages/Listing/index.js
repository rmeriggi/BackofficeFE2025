import {
  AccountBalance,
  Add,
  CloudDownload,
  FilterList,
  Folder,
  GridOn,
  InsertDriveFile,
  List,
  MoreVert,
  Print,
  Refresh,
  Search,
  Settings,
  Share,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { channelsadapter } from "../../../../../adapters/channelsAdapter";
import { useFetchCombos } from "../../../../../hooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useLoading } from "../../../../../hooks/useLoading";
import { useChannels } from "../../../../Credits/Collections/utils/apiHook";
import { collectionsAdapter } from "../../adapters/collectionsAdapter";
import { getListCollection } from "../../utils/service";

function Listing() {
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [collections, setCollections] = useState([]);
  const { loading, enableLoading, disableLoading } = useLoading(false);
  const [viewMode, setViewMode] = useState("table");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroEntidad, setFiltroEntidad] = useState("todos");
  const [filtroMoneda, setFiltroMoneda] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const isMounted = useIsMountedRef();
  const [channels] = useChannels(isMounted);
  const channelsAdapted = channelsadapter(channels);

  const fetchCollections = async () => {
    enableLoading();
    try {
      const CURRENT_MONTH = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

      const req = {
        idCurrency: 0,
        idEntity: 0,
        fromDate: CURRENT_MONTH.toISOString(),
        toDate: new Date().toISOString(),
        idModule: 0,
        idProduct: 0,
        idPaymentChannel: 0,
      };

      const response = await getListCollection(req);
      const adapted = collectionsAdapter(response);
      setCollections(adapted);
    } catch (error) {
      setCollections([]);
    } finally {
      disableLoading();
    }
  };

  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    fetchCollections();
  };

  // Filtrar cobranzas
  const collectionsFiltradas = collections.filter((collection) => {
    // Filtro por tipo
    const coincideTipo =
      filtroTipo === "todos" || filtroTipo === collection.type?.toLowerCase();

    // Filtro por estado
    const coincideEstado =
      filtroEstado === "todos" ||
      filtroEstado === collection.status?.toLowerCase();

    // Filtro por entidad
    const coincideEntidad =
      filtroEntidad === "todos" ||
      filtroEntidad === collection.entity?.toLowerCase();

    // Filtro por moneda
    const coincideMoneda =
      filtroMoneda === "todos" ||
      filtroMoneda === collection.currency?.toLowerCase();

    // Filtro por búsqueda
    const coincideBusqueda =
      (collection.id?.toString() || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      (collection.entity || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      (collection.type || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (collection.status || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      (collection.amount?.toString() || "").includes(busqueda);

    return (
      coincideTipo &&
      coincideEstado &&
      coincideEntidad &&
      coincideMoneda &&
      coincideBusqueda
    );
  });

  // Calcular estadísticas
  const totalCollections = collectionsFiltradas.length;
  const totalAmount = collectionsFiltradas.reduce(
    (sum, c) => sum + (c.amount || 0),
    0
  );
  const totalPending = collectionsFiltradas.filter(
    (c) => c.status === "Pendiente"
  ).length;
  const totalCompleted = collectionsFiltradas.filter(
    (c) => c.status === "Completado"
  ).length;

  // Obtener colores según el estado
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completado":
        return "#0BB783";
      case "pendiente":
        return "#FFA800";
      case "cancelado":
        return "#F64E60";
      case "en proceso":
        return "#3699FF";
      default:
        return "#7E8299";
    }
  };

  // Obtener icono según el tipo
  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "transferencia":
        return <AccountBalance style={{ fontSize: 30, color: "#3699FF" }} />;
      case "pago":
        return <CloudDownload style={{ fontSize: 30, color: "#0BB783" }} />;
      case "deposito":
        return <Folder style={{ fontSize: 30, color: "#8950FC" }} />;
      case "retiro":
        return <Settings style={{ fontSize: 30, color: "#FFA800" }} />;
      default:
        return <InsertDriveFile style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Lógica de paginación
  const totalItems = collectionsFiltradas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const collectionsPaginadas = collectionsFiltradas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Obtener tipos y estados únicos para los filtros
  const tiposUnicos = [
    ...new Set(collections.map((c) => c.type).filter(Boolean)),
  ];
  const estadosUnicos = [
    ...new Set(collections.map((c) => c.status).filter(Boolean)),
  ];
  const entidadesUnicas = [
    ...new Set(collections.map((c) => c.entity).filter(Boolean)),
  ];
  const monedasUnicas = [
    ...new Set(collections.map((c) => c.currency).filter(Boolean)),
  ];

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Cobranzas
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Gestión y seguimiento de cobranzas y pagos
              </p>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() => setShowFilters(!showFilters)}
                title="Mostrar/Ocultar filtros"
              >
                <FilterList />
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "table" ? "cards" : "table")
                }
                title={viewMode === "table" ? "Vista cards" : "Vista tabla"}
              >
                {viewMode === "table" ? <GridOn /> : <List />}
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleRefresh}
                disabled={loading}
              >
                <Refresh
                  className={loading ? "spinner-border spinner-border-sm" : ""}
                />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Share />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Print />
              </button>
              <button className="btn btn-light btn-icon">
                <Settings />
              </button>
            </div>
          </div>

          {/* Métricas */}
          <div className="row mb-6">
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {totalCollections}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Total Cobranzas
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  ${totalAmount.toLocaleString()}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Monto Total
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {totalPending}
                </div>
                <div className="text-white-75 font-weight-bold">Pendientes</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {totalCompleted}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Completadas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card card-custom gutter-b mb-8">
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <div className="row mb-6">
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">
                    Tipo de Cobranza
                  </label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                  >
                    <option value="todos">Todos los tipos</option>
                    {tiposUnicos.map((tipo) => (
                      <option key={tipo} value={tipo.toLowerCase()}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Estado</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="todos">Todos los estados</option>
                    {estadosUnicos.map((estado) => (
                      <option key={estado} value={estado.toLowerCase()}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Entidad</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroEntidad}
                    onChange={(e) => setFiltroEntidad(e.target.value)}
                  >
                    <option value="todos">Todas las entidades</option>
                    {entidadesUnicas.map((entidad) => (
                      <option key={entidad} value={entidad.toLowerCase()}>
                        {entidad}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Moneda</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroMoneda}
                    onChange={(e) => setFiltroMoneda(e.target.value)}
                  >
                    <option value="todos">Todas las monedas</option>
                    {monedasUnicas.map((moneda) => (
                      <option key={moneda} value={moneda.toLowerCase()}>
                        {moneda}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center">
              <div className="input-icon input-icon-right flex-grow-1 mr-4">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar por ID, entidad, tipo o estado..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
              <button className="btn btn-light-primary font-weight-bold">
                <CloudDownload className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold ml-2">
                <Add className="mr-2" />
                Nueva Cobranza
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Separación visual */}
      <div className="mb-8"></div>

      {/* Listado de cobranzas */}
      {loading ? (
        <div className="d-flex justify-content-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : viewMode === "cards" ? (
        <div className="row">
          {collectionsPaginadas.length > 0 ? (
            collectionsPaginadas.map((collection, index) => (
              <div
                key={index}
                className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
              >
                <div
                  className={`card card-custom gutter-b shadow-sm ${
                    collection.status === "Pendiente"
                      ? "border-left-warning"
                      : "border-left-primary"
                  }`}
                  style={{ borderLeftWidth: "4px" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-5">
                          <span className="symbol-label">
                            {getTypeIcon(collection.type)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-dark font-weight-bolder mb-0 text-break">
                            {collection.id || `Cobranza ${index + 1}`}
                          </h4>
                          <span className="text-muted font-weight-bold">
                            ID: {collection.id || index + 1} |{" "}
                            {collection.type?.toUpperCase() || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="dropdown dropdown-inline">
                        <button
                          className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <MoreVert style={{ color: "#B5B5C3" }} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                          <ul className="navi navi-hover">
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Ver detalles</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Editar</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Eliminar</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="d-flex align-items-center mr-10 mb-2">
                          <div className="mr-2">
                            <span className="text-dark font-weight-bolder">
                              Entidad:
                            </span>
                            <span className="text-muted ml-2">
                              {collection.entity || "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mr-10 mb-2">
                          <div className="mr-2">
                            <span className="text-dark font-weight-bolder">
                              Moneda:
                            </span>
                            <span className="text-muted ml-2">
                              {collection.currency || "USD"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Monto
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            ${collection.amount?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Fecha
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            {collection.date || new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getStatusColor(collection.status),
                          }}
                        >
                          <span className="text-white d-flex align-items-center">
                            <div
                              className="bg-white mr-2 rounded-circle"
                              style={{ width: 8, height: 8 }}
                            ></div>
                            {collection.status?.toUpperCase() || "N/A"}
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="text-muted font-weight-bold mr-2">
                          Canal:
                        </span>
                        <span className="text-info font-weight-bolder">
                          {collection.channel || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                    <button className="btn btn-primary font-weight-bold">
                      <CloudDownload className="mr-2" />
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="card card-custom gutter-b">
                <div className="card-body d-flex flex-column align-items-center py-20">
                  <div className="symbol symbol-100 symbol-light-primary mb-5">
                    <span className="symbol-label">
                      <Search style={{ fontSize: 50, color: "#3699FF" }} />
                    </span>
                  </div>
                  <h3 className="text-dark font-weight-bolder mb-2">
                    No se encontraron cobranzas
                  </h3>
                  <p className="text-muted font-weight-bold mb-10">
                    No hay cobranzas que coincidan con los filtros aplicados
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card card-custom gutter-b">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">Cobranza</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tipo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Monto</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Fecha</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Estado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Entidad</span>
                    </th>
                    <th className="text-right pr-7">
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collectionsPaginadas.length > 0 ? (
                    collectionsPaginadas.map((collection, index) => (
                      <tr key={index} className="border-bottom">
                        <td className="pl-7">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                {getTypeIcon(collection.type)}
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="text-dark font-weight-bolder">
                                  {collection.id || `Cobranza ${index + 1}`}
                                </span>
                              </div>
                              <span className="text-muted font-weight-bold">
                                ID: {collection.id || index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{
                              backgroundColor: getStatusColor(collection.type),
                            }}
                          >
                            <span className="text-white font-weight-bold">
                              {collection.type?.toUpperCase() || "N/A"}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            ${collection.amount?.toLocaleString() || "0"}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {collection.date || new Date().toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{
                              backgroundColor: getStatusColor(
                                collection.status
                              ),
                            }}
                          >
                            <span className="text-white font-weight-bold">
                              {collection.status?.toUpperCase() || "N/A"}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {collection.entity || "N/A"}
                          </span>
                        </td>
                        <td className="text-right pr-7">
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-icon btn-light btn-sm">
                              <MoreVert style={{ fontSize: 16 }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <div className="symbol symbol-100 symbol-light-primary mb-5">
                          <span className="symbol-label">
                            <Search
                              style={{ fontSize: 50, color: "#3699FF" }}
                            />
                          </span>
                        </div>
                        <h4 className="text-dark font-weight-bolder mb-2">
                          No se encontraron cobranzas
                        </h4>
                        <p className="text-muted font-weight-bold">
                          No hay cobranzas que coincidan con los filtros
                          aplicados
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Paginación */}
      {totalItems > 0 && (
        <div className="card card-custom mt-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span className="text-muted font-weight-bold mr-4">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)}{" "}
                  de {totalItems} resultados
                </span>
                <select
                  className="form-control form-control-solid w-100px"
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-muted font-weight-bold ml-2">
                  por página
                </span>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-icon btn-light btn-sm mr-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="ki ki-bold-arrow-back icon-xs"></i>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <button
                      key={page}
                      className={`btn btn-icon btn-sm mr-2 ${
                        page === currentPage ? "btn-primary" : "btn-light"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  className="btn btn-icon btn-light btn-sm ml-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="ki ki-bold-arrow-next icon-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;

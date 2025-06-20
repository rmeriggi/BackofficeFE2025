import DateFnsUtils from "@date-io/date-fns";
import { colors, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Edit, FilterList, GridOn, List, Search } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { es } from "date-fns/locale";
import { isEqual } from "lodash";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchClients } from "../../../../../hooks";
import { useClientsContext } from "../../context/ClientsContext";
import {
  ClientStatusCssClasses,
  ClientStatusTitles,
  filterSearch,
} from "../../context/ContextHelper";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const prepareFilter = (queryParams, values) => {
  const { searchText, status, from, to } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.name = searchText;
  filter.lastName = searchText;
  filter.email = searchText;
  filter.passport = searchText;
  filter.account = searchText;
  filter.status = status > 0 ? status : "";
  filter.from = from;
  filter.to = to;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export default function ClientsListing() {
  const history = useHistory();
  const [clients, loading] = useFetchClients();
  const values = useClientsContext();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    searchText: "",
    status: 0,
    from: null,
    to: null,
  });

  if (!clients || loading) {
    return <LayoutSplashScreen />;
  }

  // Filtros y búsqueda
  const filteredData = filterSearch(clients, values.queryParams.filter);

  function formatearFechaArgentina(fechaISO) {
    const opciones = { timeZone: "America/Argentina/Buenos_Aires" };
    const fecha = new Date(fechaISO);

    const fechaLocal = new Date(fecha.toLocaleString("en-US", opciones));
    const dia = String(fechaLocal.getDate()).padStart(2, "0");
    const mes = String(fechaLocal.getMonth() + 1).padStart(2, "0");
    const anio = fechaLocal.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }

  // Paginación
  const itemsPerPage = values.size;
  const currentPage = values.pageNumber;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Helpers visuales
  const getStatusColor = (status) => {
    const statusClass = ClientStatusCssClasses[status];
    switch (statusClass) {
      case "success":
        return "#1BC5BD";
      case "danger":
        return "#F64E60";
      case "warning":
        return "#FFA800";
      case "info":
        return "#3699FF";
      default:
        return "#3699FF";
    }
  };

  const getStatusLabel = (status) => {
    return ClientStatusTitles[status] || "Desconocido";
  };

  // Configuración de filtros
  const statuses = ClientStatusTitles;
  const formatedStatus = statuses.map((status, index) => {
    return {
      id: index,
      status,
    };
  });
  formatedStatus.shift();

  const applyFilter = () => {
    const newQueryParams = prepareFilter(values.queryParams, localFilters);
    if (!isEqual(newQueryParams, values.queryParams)) {
      values.setPageNumber(1);
      newQueryParams.pageNumber = 1;
      values.setQueryParams(newQueryParams);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchText: "",
      status: 0,
      from: null,
      to: null,
    };
    setLocalFilters(clearedFilters);

    const newQueryParams = prepareFilter(values.queryParams, clearedFilters);
    values.setPageNumber(1);
    newQueryParams.pageNumber = 1;
    values.setQueryParams(newQueryParams);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado y acciones */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Clientes
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Gestión y monitoreo de clientes
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
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
            >
              {viewMode === "grid" ? <List /> : <GridOn />}
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card card-custom gutter-b mb-8">
          <div className="card-body bg-light-info pt-6 pb-4 px-8">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-3">
                <div className="input-icon input-icon-right">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Buscar por nombre, email, CUIT, cuenta..."
                    value={localFilters.searchText}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        searchText: e.target.value,
                      })
                    }
                  />
                  <span>
                    <Search style={{ color: "#7E8299" }} />
                  </span>
                </div>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control form-control-solid"
                  value={localFilters.status}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      status: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0}>Todos los estados</option>
                  {formatedStatus.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-2">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      size="small"
                      disableFuture
                      inputVariant="outlined"
                      label="Desde"
                      format="dd/MM/yyyy"
                      value={localFilters.from}
                      cancelLabel="cancelar"
                      onChange={(date) =>
                        setLocalFilters({ ...localFilters, from: date })
                      }
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-lg-2">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      size="small"
                      disableFuture
                      inputVariant="outlined"
                      label="Hasta"
                      format="dd/MM/yyyy"
                      value={localFilters.to}
                      cancelLabel="cancelar"
                      onChange={(date) =>
                        setLocalFilters({ ...localFilters, to: date })
                      }
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-lg-3">
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-primary font-weight-bold mr-2"
                    onClick={applyFilter}
                  >
                    Aplicar Filtros
                  </button>
                  <button
                    type="button"
                    className="btn btn-light-primary font-weight-bold"
                    onClick={clearFilters}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listado de registros */}
      {viewMode === "grid" ? (
        <div className="row">
          {currentItems.map((client) => (
            <div
              key={client.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm border-left-primary`}
                style={{
                  borderLeft: `4px solid ${getStatusColor(client.status)}`,
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {client.name} {client.lastName}
                      </h4>
                      <span className="text-muted font-weight-bold">
                        {client.account} | {client.email}
                      </span>
                    </div>
                    <div>
                      <span
                        className="label label-lg label-inline"
                        style={{
                          backgroundColor: getStatusColor(client.status),
                        }}
                      >
                        <span className="text-white font-weight-bold">
                          {getStatusLabel(client.status)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="d-flex align-items-center flex-wrap">
                      {/* <div className="d-flex align-items-center mr-10 mb-2">
                        <span className="text-dark font-weight-bolder mr-2">
                          CUIT:
                        </span>
                        <span className="text-muted">{client.passport}</span>
                      </div> */}
                      <div className="d-flex align-items-center mr-10 mb-2">
                        <span className="text-dark font-weight-bolder mr-2">
                          Canal:
                        </span>
                        <span className="text-muted">{client.origen}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          CUIT
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {client.passport}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Fecha Alta
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {formatearFechaArgentina(client.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <span
                        className="label label-lg label-inline"
                        style={{
                          backgroundColor: getStatusColor(client.status),
                        }}
                      >
                        <span className="text-white d-flex align-items-center">
                          <div
                            className="bg-white mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          {getStatusLabel(client.status)}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={() =>
                          history.push(`/clients/clients/edit/${client.id}`)
                        }
                        className="btn btn-sm btn-light-warning"
                      >
                        <Edit />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card card-custom gutter-b">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">Cliente</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Email</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Cuenta</span>
                    </th>
                    <th>
                      <span className="text-dark-75">CUIT</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Estado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((client) => (
                    <tr key={client.id} className="border-bottom">
                      <td className="pl-7">
                        <span className="text-dark font-weight-bolder">
                          {client.name} {client.lastName}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {client.email}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {client.account}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {client.passport}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getStatusColor(client.status),
                          }}
                        >
                          <span className="text-white font-weight-bold">
                            {getStatusLabel(client.status)}
                          </span>
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() =>
                              history.push(`/clients/clients/edit/${client.id}`)
                            }
                            className="btn btn-sm btn-light-warning"
                          >
                            <Edit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sin resultados */}
      {filteredData.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron clientes
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={clearFilters}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Paginación */}
      {filteredData.length > 0 && (
        <div className="card card-custom mt-8">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="text-muted font-weight-bold mr-4">
                Mostrando {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredData.length)} de{" "}
                {filteredData.length} clientes
              </span>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-icon btn-sm btn-light mr-2"
                disabled={currentPage === 1}
                onClick={() => values.setPageNumber(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="text-dark font-weight-bold mx-3">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="btn btn-icon btn-sm btn-light ml-2"
                disabled={currentPage === totalPages}
                onClick={() => values.setPageNumber(currentPage + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

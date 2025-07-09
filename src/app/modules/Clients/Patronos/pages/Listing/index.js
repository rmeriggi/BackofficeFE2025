import DateFnsUtils from "@date-io/date-fns";
import { colors, createMuiTheme, ThemeProvider } from "@material-ui/core";
import {
  Add,
  Edit,
  FilterList,
  GridOn,
  List,
  Search,
} from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { es } from "date-fns/locale";
import { isEqual } from "lodash";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchPatronos } from "../../../../../hooks";
import NuevoPatronoModal from "../../components/NuevoPatronoModal";
import {
  filterSearch,
  PatronoStatusCssClasses,
  PatronoStatusTitles,
} from "../../context/ContextHelper";
import { usePatronosContext } from "../../context/PatronosContext";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const prepareFilter = (queryParams, values) => {
  const { searchText, status, from, to } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.nombre = searchText;
  filter.codigo = searchText;
  filter.referencia = searchText;
  filter.estado = status > 0 ? status : "";
  filter.from = from;
  filter.to = to;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export default function PatronosListing() {
  const history = useHistory();
  const [patronos, loading] = useFetchPatronos();
  const values = usePatronosContext();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [localFilters, setLocalFilters] = useState({
    searchText: "",
    status: 0,
    from: null,
    to: null,
  });

  if (!patronos || loading) {
    return <LayoutSplashScreen />;
  }

  // Filtros y búsqueda
  const filteredData = filterSearch(patronos, values.queryParams.filter);

  function formatearFechaArgentina(timeStamp) {
    if (!timeStamp) return "";
    const fecha = new Date(timeStamp);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();

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
  const getStatusColor = (estado) => {
    const statusClass = PatronoStatusCssClasses[estado];
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

  const getStatusLabel = (estado) => {
    return PatronoStatusTitles[estado] || "Desconocido";
  };

  // Configuración de filtros
  const statuses = PatronoStatusTitles;
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

  const handleModalSuccess = (message) => {
    setSuccessMessage(message);
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="container-fluid">
      {/* Encabezado y acciones */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
              Patronos
            </h1>
            <p className="text-white-75 font-size-lg mb-0">
              Gestión de empleadores y empresas
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
            <button
              className="btn btn-success btn-icon"
              onClick={() => setShowModal(true)}
              title="Crear nuevo patrono"
            >
              <Add />
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="alert alert-success mb-8" role="alert">
          <div className="alert-text">
            <strong>¡Éxito!</strong> {successMessage}
          </div>
        </div>
      )}

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
                    placeholder="Buscar por nombre, código, referencia..."
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
          {currentItems.map((patrono) => (
            <div
              key={patrono.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm border-left-primary`}
                style={{
                  borderLeft: `4px solid ${getStatusColor(patrono.estado)}`,
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {patrono.nombre}
                      </h4>
                      <span className="text-muted font-weight-bold">
                        Código: {patrono.codigo}
                      </span>
                    </div>
                    <div>
                      <span
                        className="label label-lg label-inline"
                        style={{
                          backgroundColor: getStatusColor(patrono.estado),
                        }}
                      >
                        <span className="text-white font-weight-bold">
                          {getStatusLabel(patrono.estado)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Referencia
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {patrono.referencia}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Fecha Alta
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {formatearFechaArgentina(patrono.timeStamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <span
                        className="label label-lg label-inline"
                        style={{
                          backgroundColor: getStatusColor(patrono.estado),
                        }}
                      >
                        <span className="text-white d-flex align-items-center">
                          <div
                            className="bg-white mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          {getStatusLabel(patrono.estado)}
                        </span>
                      </span>
                    </div>
                    <div className="d-flex">
                      <button
                        /*  onClick={() =>
                          history.push(`/clients/patronos/edit/${patrono.id}`)
                        } */
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
                      <span className="text-dark-75">Patrono</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Código</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Referencia</span>
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
                  {currentItems.map((patrono) => (
                    <tr key={patrono.id} className="border-bottom">
                      <td className="pl-7">
                        <span className="text-dark font-weight-bolder">
                          {patrono.nombre}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {patrono.codigo}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {patrono.referencia}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getStatusColor(patrono.estado),
                          }}
                        >
                          <span className="text-white font-weight-bold">
                            {getStatusLabel(patrono.estado)}
                          </span>
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() =>
                              history.push(
                                `/clients/patronos/edit/${patrono.id}`
                              )
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
              No se encontraron patronos
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
                {filteredData.length} patronos
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

      {/* Modal para crear nuevo patrono */}
      <NuevoPatronoModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

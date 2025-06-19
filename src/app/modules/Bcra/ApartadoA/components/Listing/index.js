/* eslint-disable jsx-a11y/anchor-is-valid */
import DateFnsUtils from "@date-io/date-fns";
import { colors, createMuiTheme } from "@material-ui/core";
import {
  AccountBalance,
  Add,
  BarChart,
  CalendarToday,
  CloudDownload,
  Description,
  Edit,
  ExpandMore,
  FilterList,
  GridOn,
  List,
  MonetizationOn,
  MoreVert,
  PieChart,
  Print,
  Refresh,
  Search,
  Settings,
  Share,
  Star,
  TrendingUp,
  Visibility,
} from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { getDate, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useMemo, useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import Pagination from "../../../../../components/Pagination";
import { formatAmountReport } from "../../../../../utils/formatData";
import { getSectionA } from "../../utils/service";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const today = new Date();
const tomorrow = today.setDate(today.getDate() + 1);

// Función para validar fechas (similar a setDatesValues)
const validateAndSetDate = (newDate, otherDate, setDateFunction, type) => {
  if (
    newDate instanceof Date &&
    !isNaN(newDate.valueOf()) &&
    newDate <= tomorrow
  ) {
    if (type === "from" && newDate <= otherDate) {
      setDateFunction(newDate);
    } else if (type === "to" && newDate >= otherDate) {
      setDateFunction(newDate);
    } else if (type === "from") {
      setDateFunction(newDate);
      if (newDate > otherDate) {
        setDateFunction(newDate);
      }
    } else if (type === "to") {
      setDateFunction(newDate);
      if (newDate < otherDate) {
        setDateFunction(newDate);
      }
    }
  }
};

export default function Listing() {
  const [sectionAList, setSectionAList] = useState({ sectionA: [] });
  const [, /* reportData */ setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [registroExpandido, setRegistroExpandido] = useState(null);
  const [fechaDesde, setFechaDesde] = useState(new Date());
  const [fechaHasta, setFechaHasta] = useState(new Date());

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Carga inicial del mes actual
  useEffect(() => {
    const cargarMesActual = async () => {
      setIsLoading(true);
      try {
        const today = new Date();
        const fromDay = getDate(today);
        const fromYear = getYear(today);
        const fromMonth = getMonth(today) + 1;

        const dataValues = {
          fromYear,
          fromMonth,
          fromDay,
          toYear: fromYear,
          toMonth: fromMonth,
          toDay: fromDay,
        };

        const response = await getSectionA(dataValues);
        setSectionAList(response);
        setFechaDesde(today);
        setFechaHasta(today);
      } catch (error) {
        console.error("Error cargando datos del mes actual:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarMesActual();
  }, []);

  // Procesar datos para el reporte
  const processedData = useMemo(() => {
    if (!sectionAList?.sectionA) return [];

    const toReport = formatAmountReport(sectionAList.sectionA);
    setReportData(toReport);

    return toReport.map((item, index) => ({
      id: item.id || index + 1,
      año: item.year || "",
      mes: item.month || "",
      día: item.day || "",
      código: item.code || "",
      concepto: item.concept || "",
      cantidad: item.quantity || 0,
      cbu: item.cbu || "",
      saldo: item.amount || 0,
      // Datos enriquecidos para el nuevo diseño
      tipo: getTipoConcepto(item.concept),
      categoria: getCategoriaConcepto(item.concept),
      prioridad: Math.random() > 0.7 ? "Alta" : "Normal",
      destacado: Math.random() > 0.8,
      estado: "Activo",
      ultimaModificacion: new Date().toLocaleDateString(),
      ...item,
    }));
  }, [sectionAList]);

  const registrosFiltrados = processedData.filter((r) => {
    const coincideTipo =
      filtroActivo === "todos" ||
      (filtroActivo === "destacados" && r.destacado) ||
      filtroActivo === r.tipo.toLowerCase();

    const coincideBusqueda =
      r.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.código.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.cbu.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.id.toString().includes(busqueda);

    return coincideTipo && coincideBusqueda;
  });

  // Lógica de paginación
  const totalItems = registrosFiltrados.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const registrosPaginados = registrosFiltrados.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filtroActivo, busqueda]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll al top de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular refresh
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const toggleExpandirRegistro = (id) => {
    if (registroExpandido === id) {
      setRegistroExpandido(null);
    } else {
      setRegistroExpandido(id);
    }
  };

  const handleBuscar = async () => {
    setIsLoading(true);
    try {
      const fromDay = getDate(fechaDesde);
      const fromYear = getYear(fechaDesde);
      const fromMonth = getMonth(fechaDesde) + 1;
      const toYear = getYear(fechaHasta);
      const toMonth = getMonth(fechaHasta) + 1;
      const toDay = getDate(fechaHasta);

      const dataValues = {
        fromYear,
        fromMonth,
        fromDay,
        toYear,
        toMonth,
        toDay,
      };

      const response = await getSectionA(dataValues);
      setSectionAList(response);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error buscando datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular estadísticas
  const totalRegistros = processedData.length;
  const totalDestacados = processedData.filter((r) => r.destacado).length;
  const saldoTotal = processedData.reduce((sum, r) => sum + (r.saldo || 0), 0);
  const cantidadTotal = processedData.reduce(
    (sum, r) => sum + (r.cantidad || 0),
    0
  );
  const tiposConcepto = [...new Set(processedData.map((r) => r.tipo))];

  // Contar por tipo
  const conteoTipos = tiposConcepto.map((tipo) => ({
    tipo,
    cantidad: processedData.filter((r) => r.tipo === tipo).length,
  }));

  // Obtener colores según el tipo
  const getTipoColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "cuentas":
        return "#3699FF";
      case "fondos":
        return "#0BB783";
      case "saldos":
        return "#FFA800";
      case "cantidad":
        return "#8950FC";
      case "sumatoria":
        return "#1BC5BD";
      default:
        return "#7E8299";
    }
  };

  // Obtener icono según el tipo
  const getTipoIcono = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "cuentas":
        return <AccountBalance style={{ fontSize: 30, color: "#3699FF" }} />;
      case "fondos":
        return <PieChart style={{ fontSize: 30, color: "#0BB783" }} />;
      case "saldos":
        return <MonetizationOn style={{ fontSize: 30, color: "#FFA800" }} />;
      case "cantidad":
        return <BarChart style={{ fontSize: 30, color: "#8950FC" }} />;
      case "sumatoria":
        return <TrendingUp style={{ fontSize: 30, color: "#1BC5BD" }} />;
      default:
        return <Description style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Obtener icono de categoría
  /*   const getCategoriaIcono = (categoria) => {
    switch (categoria.toLowerCase()) {
      case "pago":
        return <Payment style={{ fontSize: 18, color: "#0BB783" }} />;
      case "inversion":
        return <TrendingUp style={{ fontSize: 18, color: "#3699FF" }} />;
      case "financiero":
        return <AccountBalance style={{ fontSize: 18, color: "#FFA800" }} />;
      case "operativo":
        return <Settings style={{ fontSize: 18, color: "#8950FC" }} />;
      default:
        return <Business style={{ fontSize: 18, color: "#7E8299" }} />;
    }
  }; */

  if (isLoading && processedData.length === 0) {
    return <LayoutSplashScreen />;
  }

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Apartado A - BCRA
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Gestión y análisis de datos regulatorios del Banco Central
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-6">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-white bg-opacity-20">
                    <CalendarToday style={{ color: "#fff" }} />
                  </span>
                </div>
                <div>
                  <div className="text-white-75 font-size-sm">
                    Última actualización
                  </div>
                  <div className="text-white font-weight-bold">
                    {lastUpdate.toLocaleTimeString("es-AR")}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <Refresh
                  className={
                    isLoading ? "spinner-border spinner-border-sm" : ""
                  }
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
        </div>
      </div>

      {/* Estadísticas y filtros */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Registros Disponibles
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Explora y analiza los datos del Apartado A
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <CloudDownload className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" />
                Nuevo Registro
              </button>
            </div>
          </div>
        </div>

        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <BarChart style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Registros Totales
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalRegistros}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <MonetizationOn style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Saldo Total
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${saldoTotal.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <TrendingUp style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Cantidad Total
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {cantidadTotal.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <Star style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Registros Destacados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalDestacados}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap">
            {/* Filtros */}
            <div className="d-flex align-items-center mr-10 mb-4">
              <span className="text-dark font-weight-bold mr-4">
                Filtrar por:
              </span>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "todos" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("todos")}
                >
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "destacados" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("destacados")}
                >
                  <input type="radio" name="options" /> Destacados
                </label>
                {tiposConcepto.slice(0, 3).map((tipo) => (
                  <label
                    key={tipo}
                    className={`btn btn-outline-secondary font-weight-bold ${
                      filtroActivo === tipo.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setFiltroActivo(tipo.toLowerCase())}
                  >
                    <input type="radio" name="options" /> {tipo}
                  </label>
                ))}
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar concepto, código o CBU..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
              >
                {viewMode === "grid" ? <List /> : <GridOn />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterList />
              </button>
            </div>
          </div>

          {/* Filtros de fecha */}
          <div className="d-flex align-items-center flex-wrap mt-4">
            <div className="d-flex align-items-center mr-6 mb-4">
              <span className="text-dark font-weight-bold mr-4">
                Fecha Desde:
              </span>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    size="small"
                    inputVariant="outlined"
                    label="Fecha Desde"
                    format="dd/MM/yyyy"
                    value={fechaDesde}
                    cancelLabel="cancelar"
                    onChange={(date) => {
                      if (
                        date instanceof Date &&
                        !isNaN(date.valueOf()) &&
                        date <= tomorrow
                      ) {
                        validateAndSetDate(
                          date,
                          fechaHasta,
                          setFechaDesde,
                          "from"
                        );
                      }
                    }}
                    className="mt-3"
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
            <div className="d-flex align-items-center mr-6 mb-4">
              <span className="text-dark font-weight-bold mr-4">
                Fecha Hasta:
              </span>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    size="small"
                    inputVariant="outlined"
                    label="Fecha Hasta"
                    format="dd/MM/yyyy"
                    value={fechaHasta}
                    cancelLabel="cancelar"
                    onChange={(date) => {
                      if (
                        date instanceof Date &&
                        !isNaN(date.valueOf()) &&
                        date <= tomorrow
                      ) {
                        validateAndSetDate(
                          date,
                          fechaDesde,
                          setFechaHasta,
                          "to"
                        );
                      }
                    }}
                    className="mt-3"
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
            <button
              className="btn btn-primary font-weight-bold mb-4"
              onClick={handleBuscar}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm mr-2" />
              ) : (
                <Search className="mr-2" />
              )}
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Listado de registros */}
      {viewMode === "grid" ? (
        <>
          <div className="row">
            {registrosPaginados.map((r) => (
              <div
                key={r.id}
                className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
              >
                <div
                  className={`card card-custom gutter-b shadow-sm ${
                    r.destacado ? "border-left-warning" : "border-left-primary"
                  }`}
                  style={{ borderLeftWidth: "4px" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-5">
                          <span className="symbol-label">
                            {getTipoIcono(r.tipo)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-dark font-weight-bolder mb-0">
                            {r.concepto}{" "}
                            {r.destacado && (
                              <span className="label label-sm label-warning label-inline ml-2">
                                Destacado
                              </span>
                            )}
                          </h4>
                          <span className="text-muted font-weight-bold">
                            ID: {r.id} | {r.tipo}
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
                                <span className="navi-text">
                                  Añadir a favoritos
                                </span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Compartir</span>
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
                              Código:
                            </span>
                            <span className="text-muted ml-2">{r.código}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mr-10 mb-2">
                          <div className="mr-2">
                            <span className="text-dark font-weight-bolder">
                              CBU:
                            </span>
                            <span className="text-muted ml-2">
                              {r.cbu || "No disponible"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Cantidad
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            {r.cantidad.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Saldo
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            ${r.saldo.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <span
                          className="label label-lg label-inline"
                          style={{ backgroundColor: getTipoColor(r.tipo) }}
                        >
                          <span className="text-white d-flex align-items-center">
                            <div
                              className="bg-white mr-2 rounded-circle"
                              style={{ width: 8, height: 8 }}
                            ></div>
                            {r.tipo}
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="text-muted font-weight-bold mr-2">
                          Estado:
                        </span>
                        <span className="text-success font-weight-bolder">
                          {r.estado}
                        </span>
                      </div>
                    </div>

                    {/* Detalles expandibles */}
                    <div className="mt-4">
                      <button
                        className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                        onClick={() => toggleExpandirRegistro(r.id)}
                      >
                        <span>Ver más detalles</span>
                        <ExpandMore
                          className={`ml-1 transition ${
                            registroExpandido === r.id
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {registroExpandido === r.id && (
                        <div className="mt-4 pt-4 border-top">
                          <div className="row">
                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Año
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {r.año}
                                </span>
                              </div>

                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Mes
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {r.mes}
                                </span>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Día
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {r.día}
                                </span>
                              </div>

                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold mb-1">
                                  Última Modificación
                                </span>
                                <span className="text-info font-weight-bolder">
                                  {r.ultimaModificacion}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                    <button className="btn btn-light-primary font-weight-bold">
                      <Visibility className="mr-2" />
                      Ver detalles
                    </button>
                    <button className="btn btn-primary font-weight-bold">
                      <Edit className="mr-2" />
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación para vista grilla */}
          {totalItems > 0 && (
            <div className="card card-custom mt-8">
              <div className="card-body">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={true}
                  showInfo={true}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Vista de lista real */}
          <div className="card card-custom gutter-b">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-head-custom table-vertical-center overflow-hidden">
                  <thead>
                    <tr>
                      <th className="pl-7">
                        <span className="text-dark-75">Concepto</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Código</span>
                      </th>
                      <th>
                        <span className="text-dark-75">CBU</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Cantidad</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Saldo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Tipo</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosPaginados.map((r) => (
                      <tr key={r.id} className="border-bottom">
                        <td className="pl-7">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                {getTipoIcono(r.tipo)}
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="text-dark font-weight-bolder">
                                  {r.concepto}
                                </span>
                                {r.destacado && (
                                  <span className="label label-sm label-warning label-inline ml-2">
                                    Destacado
                                  </span>
                                )}
                              </div>
                              <span className="text-muted font-weight-bold">
                                ID: {r.id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {r.código}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {r.cbu || "N/A"}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {r.cantidad.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            ${r.saldo.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{ backgroundColor: getTipoColor(r.tipo) }}
                          >
                            <span className="text-white font-weight-bold">
                              {r.tipo}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Paginación para vista lista */}
          {totalItems > 0 && (
            <div className="card card-custom mt-8">
              <div className="card-body">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={true}
                  showInfo={true}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Sin resultados */}
      {registrosFiltrados.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron registros
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por tipo */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <h3 className="card-title text-dark font-weight-bolder">
            Distribución por Tipo de Concepto
          </h3>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            {conteoTipos.map((item) => (
              <div
                key={item.tipo}
                className="d-flex align-items-center mr-10 mb-5"
              >
                <div className="symbol symbol-40 symbol-light mr-4">
                  <span className="symbol-label">
                    {getTipoIcono(item.tipo)}
                  </span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    {item.tipo}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.cantidad}{" "}
                    {item.cantidad === 1 ? "registro" : "registros"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Funciones auxiliares
function getTipoConcepto(concepto) {
  if (!concepto) return "general";
  const conceptoLower = concepto.toLowerCase();
  if (conceptoLower.includes("cuenta")) return "cuentas";
  if (conceptoLower.includes("fondo")) return "fondos";
  if (conceptoLower.includes("saldo")) return "saldos";
  if (conceptoLower.includes("cantidad")) return "cantidad";
  if (conceptoLower.includes("sumatoria")) return "sumatoria";
  return "general";
}

function getCategoriaConcepto(concepto) {
  if (!concepto) return "general";
  const conceptoLower = concepto.toLowerCase();
  if (conceptoLower.includes("pago")) return "pago";
  if (
    conceptoLower.includes("invertido") ||
    conceptoLower.includes("inversion")
  )
    return "inversion";
  if (
    conceptoLower.includes("financiera") ||
    conceptoLower.includes("financiero")
  )
    return "financiero";
  if (
    conceptoLower.includes("operativo") ||
    conceptoLower.includes("operacion")
  )
    return "operativo";
  return "general";
}

import {
  AccountBalance,
  Add,
  CheckCircle,
  CloudDownload,
  Error,
  FilterList,
  GridOn,
  Info,
  List,
  Refresh,
  Schedule,
  Search,
  Visibility,
  Warning,
} from "@material-ui/icons";
import React, { useCallback, useMemo, useState } from "react";
import ConciliacionModal from "../components/ConciliacionModal";
import DetalleConciliacionModal from "../components/DetalleConciliacionModal";
import { NuevaConciliacionModal } from "../components/NuevaConciliacionModal";

// Data mockeada para conciliaciones
const conciliacionesMock = [
  {
    id: 1,
    fecha: "2024-01-15",
    banco: "Banco Galicia",
    cuentaBancaria: "12345678901234567890",
    saldoLibro: 150000.5,
    saldoBanco: 148500.75,
    diferencia: 1499.75,
    estado: "Pendiente",
    observaciones: "Cheque en tránsito #1234",
    creadoPor: "Juan Pérez",
    fechaCreacion: "2024-01-15T10:30:00",
    ultimaModificacion: "2024-01-15T14:25:00",
    nroMovimientos: 15,
    movimientosConciliados: 12,
  },
  {
    id: 2,
    fecha: "2024-01-10",
    banco: "Banco Nación",
    cuentaBancaria: "09876543210987654321",
    saldoLibro: 75000.0,
    saldoBanco: 75000.0,
    diferencia: 0.0,
    estado: "Completada",
    observaciones: "Conciliación completa sin diferencias",
    creadoPor: "María García",
    fechaCreacion: "2024-01-10T09:15:00",
    ultimaModificacion: "2024-01-10T16:45:00",
    nroMovimientos: 8,
    movimientosConciliados: 8,
  },
  {
    id: 3,
    fecha: "2024-01-05",
    banco: "Banco Santander",
    cuentaBancaria: "11223344556677889900",
    saldoLibro: 200000.0,
    saldoBanco: 198750.3,
    diferencia: 1249.7,
    estado: "En Revisión",
    observaciones: "Débito automático no registrado",
    creadoPor: "Carlos López",
    fechaCreacion: "2024-01-05T11:20:00",
    ultimaModificacion: "2024-01-05T15:10:00",
    nroMovimientos: 22,
    movimientosConciliados: 20,
  },
  {
    id: 4,
    fecha: "2024-01-02",
    banco: "Banco BBVA",
    cuentaBancaria: "55667788990011223344",
    saldoLibro: 89500.25,
    saldoBanco: 89500.25,
    diferencia: 0.0,
    estado: "Completada",
    observaciones: "Conciliación sin observaciones",
    creadoPor: "Ana Rodríguez",
    fechaCreacion: "2024-01-02T08:45:00",
    ultimaModificacion: "2024-01-02T12:30:00",
    nroMovimientos: 6,
    movimientosConciliados: 6,
  },
  {
    id: 5,
    fecha: "2024-01-15",
    banco: "Banco Provincia",
    cuentaBancaria: "12345678901234567890",
    saldoLibro: 150000.5,
    saldoBanco: 148500.75,
    diferencia: 1499.75,
    estado: "Pendiente",
    observaciones: "Cheque en tránsito #1234",
    creadoPor: "Juan Pérez",
    fechaCreacion: "2024-01-15T10:30:00",
    ultimaModificacion: "2024-01-15T14:25:00",
    nroMovimientos: 15,
    movimientosConciliados: 12,
  },
  {
    id: 6,
    fecha: "2024-01-10",
    banco: "Banco Macro",
    cuentaBancaria: "09876543210987654321",
    saldoLibro: 75000.0,
    saldoBanco: 75000.0,
    diferencia: 0.0,
    estado: "Completada",
    observaciones: "Conciliación completa sin diferencias",
    creadoPor: "María García",
    fechaCreacion: "2024-01-10T09:15:00",
    ultimaModificacion: "2024-01-10T16:45:00",
    nroMovimientos: 8,
    movimientosConciliados: 8,
  },
  {
    id: 7,
    fecha: "2024-01-05",
    banco: "Banco DAVIVIENDA",
    cuentaBancaria: "11223344556677889900",
    saldoLibro: 200000.0,
    saldoBanco: 198750.3,
    diferencia: 1249.7,
    estado: "En Revisión",
    observaciones: "Débito automático no registrado",
    creadoPor: "Carlos López",
    fechaCreacion: "2024-01-05T11:20:00",
    ultimaModificacion: "2024-01-05T15:10:00",
    nroMovimientos: 22,
    movimientosConciliados: 20,
  },

  {
    id: 8,
    fecha: "2024-01-02",
    banco: "Banco HSBC",
    cuentaBancaria: "55667788990011223344",
    saldoLibro: 89500.25,
    saldoBanco: 89500.25,
    diferencia: 0.0,
    estado: "Completada",
    observaciones: "Conciliación sin observaciones",
    creadoPor: "Ana Rodríguez",
    fechaCreacion: "2024-01-02T08:45:00",
    ultimaModificacion: "2024-01-02T12:30:00",
    nroMovimientos: 6,
    movimientosConciliados: 6,
  },
];

const ConciliationPage = () => {
  // Estados
  const [conciliaciones, setConciliaciones] = useState(conciliacionesMock);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para el modal de detalle (información)
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [conciliacionSeleccionada, setConciliacionSeleccionada] = useState(
    null
  );

  // Estados para el modal de conciliación (ver detalle)
  const [showConciliacionModal, setShowConciliacionModal] = useState(false);
  const [conciliacionParaConciliar, setConciliacionParaConciliar] = useState(
    null
  );

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroBanco, setFiltroBanco] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("");

  // Función para formatear moneda
  const formatMoney = useCallback((amount) => {
    if (amount === null || amount === undefined) return "$ 0.00";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  }, []);

  // Función para formatear fecha
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  }, []);

  // Función para obtener color según estado
  const getStatusColor = useCallback((estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
        return "#0BB783";
      case "pendiente":
        return "#FFA800";
      case "en revisión":
        return "#3699FF";
      case "con diferencias":
        return "#F64E60";
      default:
        return "#7E8299";
    }
  }, []);

  // Función para obtener icono según estado
  const getStatusIcon = useCallback((estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
        return <CheckCircle style={{ fontSize: 16, color: "#0BB783" }} />;
      case "pendiente":
        return <Schedule style={{ fontSize: 16, color: "#FFA800" }} />;
      case "en revisión":
        return <Warning style={{ fontSize: 16, color: "#3699FF" }} />;
      case "con diferencias":
        return <Error style={{ fontSize: 16, color: "#F64E60" }} />;
      default:
        return <Schedule style={{ fontSize: 16, color: "#7E8299" }} />;
    }
  }, []);

  // Función para crear nueva conciliación
  const handleNuevaConciliacion = useCallback((nuevaConciliacion) => {
    const conciliacion = {
      id: Date.now(),
      ...nuevaConciliacion,
      creadoPor: "Usuario Actual",
      fechaCreacion: new Date().toISOString(),
      ultimaModificacion: new Date().toISOString(),
      nroMovimientos: 0,
      movimientosConciliados: 0,
    };
    setConciliaciones((prev) => [conciliacion, ...prev]);
    setShowModal(false);
  }, []);

  // Función para ver información de conciliación
  const handleVerInformacion = useCallback((conciliacion) => {
    setConciliacionSeleccionada(conciliacion);
    setShowDetalleModal(true);
  }, []);

  // Función para ver detalle de conciliación (modal de conciliación)
  const handleVerDetalle = useCallback((conciliacion) => {
    setConciliacionParaConciliar(conciliacion);
    setShowConciliacionModal(true);
  }, []);

  // Función para cerrar modal de detalle (información)
  const handleCerrarDetalle = useCallback(() => {
    setShowDetalleModal(false);
    setConciliacionSeleccionada(null);
  }, []);

  // Función para cerrar modal de conciliación
  const handleCerrarConciliacion = useCallback(() => {
    setShowConciliacionModal(false);
    setConciliacionParaConciliar(null);
  }, []);

  // Función para exportar conciliaciones
  const handleExportConciliaciones = useCallback(() => {
    alert("Funcionalidad de exportación en desarrollo");
  }, []);

  // Función para actualizar conciliaciones
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar conciliaciones
  const conciliacionesFiltradas = useMemo(() => {
    return conciliaciones.filter((conciliacion) => {
      const coincideBusqueda =
        conciliacion.banco?.toLowerCase().includes(busqueda.toLowerCase()) ||
        conciliacion.cuentaBancaria
          ?.toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        conciliacion.observaciones
          ?.toLowerCase()
          .includes(busqueda.toLowerCase());

      const coincideBanco =
        filtroBanco === "todos" || conciliacion.banco === filtroBanco;

      const coincideEstado =
        filtroEstado === "todos" || conciliacion.estado === filtroEstado;

      const coincideFecha = !filtroFecha || conciliacion.fecha === filtroFecha;

      return (
        coincideBusqueda && coincideBanco && coincideEstado && coincideFecha
      );
    });
  }, [conciliaciones, busqueda, filtroBanco, filtroEstado, filtroFecha]);

  // Obtener bancos únicos para filtro
  const bancosUnicos = useMemo(() => {
    return [...new Set(conciliaciones.map((c) => c.banco))];
  }, [conciliaciones]);

  // Obtener estados únicos para filtro
  const estadosUnicos = useMemo(() => {
    return [...new Set(conciliaciones.map((c) => c.estado))];
  }, [conciliaciones]);

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const total = conciliacionesFiltradas.length;
    const completadas = conciliacionesFiltradas.filter(
      (c) => c.estado === "Completada"
    ).length;
    const pendientes = conciliacionesFiltradas.filter(
      (c) => c.estado === "Pendiente"
    ).length;
    const conDiferencias = conciliacionesFiltradas.filter(
      (c) => c.diferencia !== 0
    ).length;

    return {
      total,
      completadas,
      pendientes,
      conDiferencias,
    };
  }, [conciliacionesFiltradas]);

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Conciliación Bancaria
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Gestión y control de conciliaciones bancarias
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
                title="Actualizar"
                disabled={loading}
              >
                <Refresh />
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleExportConciliaciones}
                title="Exportar"
              >
                <CloudDownload />
              </button>
              <button
                className="btn btn-success btn-lg font-weight-bolder"
                onClick={() => setShowModal(true)}
              >
                <Add className="mr-2" />
                Conciliación Banco
              </button>
            </div>
          </div>

          {/* Métricas */}
          <div className="row mb-6">
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.total}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Total Conciliaciones
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.completadas}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Completadas
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.pendientes}
                </div>
                <div className="text-white-75 font-weight-bold">Pendientes</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                  {estadisticas.conDiferencias}
                </div>
                <div className="text-white-75 font-weight-bold">
                  Con Diferencias
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
                  <label className="text-muted font-weight-bold">Banco</label>
                  <select
                    className="form-control form-control-solid"
                    value={filtroBanco}
                    onChange={(e) => setFiltroBanco(e.target.value)}
                  >
                    <option value="todos">Todos los bancos</option>
                    {bancosUnicos.map((banco) => (
                      <option key={banco} value={banco}>
                        {banco}
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
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">Fecha</label>
                  <input
                    type="date"
                    className="form-control form-control-solid"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="text-muted font-weight-bold">
                    Búsqueda
                  </label>
                  <div className="input-icon input-icon-right">
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Buscar banco, cuenta u observaciones..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <span>
                      <Search style={{ color: "#7E8299" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Conciliaciones */}
      <div className="card card-custom gutter-b">
        <div className="card-header bg-white border-bottom">
          <h3 className="card-title text-dark mb-0">
            <AccountBalance className="mr-3 text-primary" />
            Conciliaciones ({conciliacionesFiltradas.length})
          </h3>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-20">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Cargando...</span>
              </div>
              <p className="text-muted mt-3">Cargando conciliaciones...</p>
            </div>
          ) : viewMode === "cards" ? (
            <div className="row p-8">
              {conciliacionesFiltradas.length > 0 ? (
                conciliacionesFiltradas.map((conciliacion) => (
                  <div
                    key={conciliacion.id}
                    className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
                  >
                    <div className="card card-custom gutter-b shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <div>
                            <h4 className="text-dark font-weight-bolder mb-1">
                              {conciliacion.banco}
                            </h4>
                            <span className="text-muted font-weight-bold">
                              {formatDate(conciliacion.fecha)}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(conciliacion.estado)}
                            <span
                              className="label label-lg label-inline ml-2"
                              style={{
                                backgroundColor: getStatusColor(
                                  conciliacion.estado
                                ),
                              }}
                            >
                              <span className="text-white font-weight-bold">
                                {conciliacion.estado.toUpperCase()}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="text-muted font-size-sm mb-2">
                            Cuenta: {conciliacion.cuentaBancaria}
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-dark font-weight-bold">
                              Saldo Libro:
                            </span>
                            <span className="text-primary font-weight-bolder">
                              {formatMoney(conciliacion.saldoLibro)}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-dark font-weight-bold">
                              Saldo Banco:
                            </span>
                            <span className="text-success font-weight-bolder">
                              {formatMoney(conciliacion.saldoBanco)}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-dark font-weight-bold">
                              Diferencia:
                            </span>
                            <span
                              className={`font-weight-bolder ${
                                conciliacion.diferencia === 0
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {formatMoney(conciliacion.diferencia)}
                            </span>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="text-muted font-size-sm">
                            Movimientos: {conciliacion.movimientosConciliados} /{" "}
                            {conciliacion.nroMovimientos}
                          </div>
                          <div
                            className="progress mt-2"
                            style={{ height: "4px" }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{
                                width: `${(conciliacion.movimientosConciliados /
                                  conciliacion.nroMovimientos) *
                                  100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="text-muted font-size-sm">
                            {conciliacion.observaciones}
                          </div>
                        </div>
                      </div>

                      <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                        <div className="d-flex">
                          <button
                            className="btn btn-light-info font-weight-bold mr-2"
                            onClick={() => handleVerInformacion(conciliacion)}
                            title="Información"
                          >
                            <Info className="mr-2" />
                            Información
                          </button>
                        </div>
                        <button
                          className="btn btn-light-primary font-weight-bold"
                          onClick={() => handleVerDetalle(conciliacion)}
                          title="Ver Detalle"
                        >
                          <Visibility className="mr-2" />
                          Ver Detalle
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-20">
                    <AccountBalance
                      style={{
                        fontSize: 80,
                        color: "#E1F0FF",
                        marginBottom: 16,
                      }}
                    />
                    <h3 className="text-dark font-weight-bolder mb-2">
                      No hay conciliaciones
                    </h3>
                    <p className="text-muted font-weight-bold">
                      Crea una nueva conciliación para comenzar
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">Fecha</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Banco</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Cuenta</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Saldo Libro</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Saldo Banco</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Diferencia</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Estado</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Movimientos</span>
                    </th>
                    <th className="text-right pr-7">
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conciliacionesFiltradas.length > 0 ? (
                    conciliacionesFiltradas.map((conciliacion) => (
                      <tr key={conciliacion.id} className="border-bottom">
                        <td className="pl-7">
                          <span className="text-dark font-weight-bolder">
                            {formatDate(conciliacion.fecha)}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {conciliacion.banco}
                          </span>
                        </td>
                        <td>
                          <span className="text-muted font-weight-bold">
                            {conciliacion.cuentaBancaria}
                          </span>
                        </td>
                        <td>
                          <span className="text-primary font-weight-bolder">
                            {formatMoney(conciliacion.saldoLibro)}
                          </span>
                        </td>
                        <td>
                          <span className="text-success font-weight-bolder">
                            {formatMoney(conciliacion.saldoBanco)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`font-weight-bolder ${
                              conciliacion.diferencia === 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {formatMoney(conciliacion.diferencia)}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(conciliacion.estado)}
                            <span
                              className="label label-lg label-inline ml-2"
                              style={{
                                backgroundColor: getStatusColor(
                                  conciliacion.estado
                                ),
                              }}
                            >
                              <span className="text-white font-weight-bold">
                                {conciliacion.estado.toUpperCase()}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="text-dark font-weight-bolder mr-2">
                              {conciliacion.movimientosConciliados}/
                              {conciliacion.nroMovimientos}
                            </span>
                            <div
                              className="progress"
                              style={{ width: "60px", height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                  width: `${(conciliacion.movimientosConciliados /
                                    conciliacion.nroMovimientos) *
                                    100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right pr-7">
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-icon btn-light-info btn-sm mr-2"
                              onClick={() => handleVerInformacion(conciliacion)}
                              title="Información"
                            >
                              <Info style={{ fontSize: 16 }} />
                            </button>
                            <button
                              className="btn btn-icon btn-light-primary btn-sm"
                              onClick={() => handleVerDetalle(conciliacion)}
                              title="Ver Detalle"
                            >
                              <Visibility style={{ fontSize: 16 }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-10">
                        <div className="symbol symbol-100 symbol-light-primary mb-5">
                          <span className="symbol-label">
                            <AccountBalance
                              style={{ fontSize: 50, color: "#3699FF" }}
                            />
                          </span>
                        </div>
                        <h4 className="text-dark font-weight-bolder mb-2">
                          No se encontraron conciliaciones
                        </h4>
                        <p className="text-muted font-weight-bold">
                          No hay conciliaciones que coincidan con los filtros
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Nueva Conciliación */}
      <NuevaConciliacionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleNuevaConciliacion}
      />

      {/* Modal de Detalle (Información) */}
      <DetalleConciliacionModal
        show={showDetalleModal}
        onHide={handleCerrarDetalle}
        conciliacion={conciliacionSeleccionada}
      />

      {/* Modal de Conciliación (Ver Detalle) */}
      <ConciliacionModal
        show={showConciliacionModal}
        handleClose={handleCerrarConciliacion}
        conciliacion={conciliacionParaConciliar}
      />
    </div>
  );
};

export default ConciliationPage;

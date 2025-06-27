import {
  AccountBalance,
  AccountBalanceWallet,
  ArrowDownward,
  ArrowUpward,
  AttachMoney,
  CreditCard,
  Description,
  FilterList,
  GridOn,
  List,
  Payment,
  Print,
  Receipt,
  Search,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import usePrint from "../../../hooks/usePrint";
import { getCajaMovimientos } from "../utils/cashierResumeService";

const MovimientosCajaPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [filtroOperacion, setFiltroOperacion] = useState("todos");
  const [comprobanteVisible, setComprobanteVisible] = useState(false);
  const [comprobanteActual, setComprobanteActual] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);

  // Estados para datos del API
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook para impresión
  const { printRef, handlePrint } = usePrint();

  // Cargar datos del API
  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        setLoading(true);
        const data = await getCajaMovimientos();
        setMovimientos(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar movimientos:", err);
        setError("Error al cargar los movimientos de caja");
        // Mantener datos mock como fallback
        setMovimientos([
          {
            id: 1001,
            fecha: "2023-08-15T10:30:00",
            tipo: "plazo_fijo",
            operacion: "apertura",
            monto: 500000,
            moneda: "$",
            productoId: 5001,
            productoNombre: "Plazo Fijo Tradicional",
            cliente: "María González",
            cuenta: "CA$ 1234-5678/9",
            estado: "Completado",
            usuario: "jperez",
            comprobante: {
              numero: "A-123456",
              detalle: "Apertura de plazo fijo a 30 días con TNA 75%",
              sucursal: "Centro",
              cajero: "Juan Pérez",
            },
          },
          {
            id: 1002,
            fecha: "2023-08-15T11:15:00",
            tipo: "tarjeta",
            operacion: "pago",
            monto: 12500,
            moneda: "$",
            productoId: "TAR-7890",
            productoNombre: "VISA Débito",
            cliente: "Carlos Rodríguez",
            cuenta: "CC$ 9876-5432/1",
            estado: "Completado",
            usuario: "mgomez",
            comprobante: {
              numero: "P-789012",
              detalle: "Pago con tarjeta débito - Comercio: Supermercado XYZ",
              sucursal: "Centro",
              cajero: "María Gómez",
            },
          },
          {
            id: 1003,
            fecha: "2023-08-15T14:20:00",
            tipo: "credito",
            operacion: "pago",
            monto: 18500,
            moneda: "$",
            productoId: "CRED-4567",
            productoNombre: "Préstamo Personal",
            cliente: "Laura Martínez",
            cuenta: "CA$ 2468-1357/0",
            estado: "Completado",
            usuario: "jperez",
            comprobante: {
              numero: "P-345678",
              detalle: "Pago de cuota 12/24 de préstamo personal",
              sucursal: "Centro",
              cajero: "Juan Pérez",
            },
          },
          {
            id: 1004,
            fecha: "2023-08-15T15:45:00",
            tipo: "cuenta",
            operacion: "deposito",
            monto: 75000,
            moneda: "$",
            productoId: "CA-1234",
            productoNombre: "Caja de Ahorro",
            cliente: "Jorge Sánchez",
            cuenta: "CA$ 8642-7531/5",
            estado: "Completado",
            usuario: "mgomez",
            comprobante: {
              numero: "D-901234",
              detalle: "Depósito en efectivo en caja de ahorro",
              sucursal: "Centro",
              cajero: "María Gómez",
            },
          },
          {
            id: 1005,
            fecha: "2023-08-15T16:30:00",
            tipo: "cuenta",
            operacion: "extraccion",
            monto: 20000,
            moneda: "$",
            productoId: "CC-5678",
            productoNombre: "Cuenta Corriente",
            cliente: "Ana Fernández",
            cuenta: "CC$ 1593-4862/7",
            estado: "Completado",
            usuario: "jperez",
            comprobante: {
              numero: "E-567890",
              detalle: "Extracción de efectivo por ventanilla",
              sucursal: "Centro",
              cajero: "Juan Pérez",
            },
          },
          {
            id: 1006,
            fecha: "2023-08-16T09:15:00",
            tipo: "plazo_fijo",
            operacion: "renovacion",
            monto: 520000,
            moneda: "$",
            productoId: 5001,
            productoNombre: "Plazo Fijo Tradicional",
            cliente: "María González",
            cuenta: "CA$ 1234-5678/9",
            estado: "Pendiente",
            usuario: "mgomez",
            comprobante: {
              numero: "R-123456",
              detalle: "Renovación automática de plazo fijo por 30 días más",
              sucursal: "Centro",
              cajero: "María Gómez",
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovimientos();
  }, []);

  // Tipos de operaciones
  const tiposOperacion = [
    { value: "todos", label: "Todos los tipos" },
    { value: "deposito", label: "Depósito" },
    { value: "extraccion", label: "Extracción" },
    { value: "pago", label: "Pago" },
    { value: "cobro", label: "Cobro" },
    { value: "apertura", label: "Apertura" },
    { value: "renovacion", label: "Renovación" },
  ];

  // Tipos de producto
  const tiposProducto = [
    { value: "todos", label: "Todos los productos" },
    { value: "plazo_fijo", label: "Plazo Fijo" },
    { value: "tarjeta", label: "Tarjeta Débito/Crédito" },
    { value: "credito", label: "Créditos" },
    { value: "cuenta", label: "Cuenta Corriente/Ahorro" },
  ];

  // Filtrar movimientos
  const movimientosFiltrados = movimientos.filter((movimiento) => {
    // Filtro por tipo de producto
    const coincideTipo =
      filtroTipo === "todos" || movimiento.tipo === filtroTipo;

    // Filtro por tipo de operación
    const coincideOperacion =
      filtroOperacion === "todos" || movimiento.operacion === filtroOperacion;

    // Filtro por fecha
    const fechaMovimiento = new Date(movimiento.fecha);
    const desdeValido = !fechaDesde || new Date(fechaDesde) <= fechaMovimiento;
    const hastaValido =
      !fechaHasta || new Date(fechaHasta + "T23:59:59") >= fechaMovimiento;

    // Filtro por búsqueda
    const coincideBusqueda =
      movimiento.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      movimiento.cuenta.includes(busqueda) ||
      movimiento.productoNombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      movimiento.comprobante.numero.includes(busqueda);

    return (
      coincideTipo &&
      coincideOperacion &&
      desdeValido &&
      hastaValido &&
      coincideBusqueda
    );
  });

  const calcularTotales = () => {
    let totalIngresos = 0;
    let totalEgresos = 0;

    movimientosFiltrados.forEach((movimiento) => {
      if (
        movimiento.operacion === "deposito" ||
        movimiento.operacion === "cobro" ||
        movimiento.operacion === "apertura"
      ) {
        totalIngresos += movimiento.monto;
      } else {
        totalEgresos += movimiento.monto;
      }
    });

    return {
      totalMovimientos: movimientosFiltrados.length,
      totalIngresos,
      totalEgresos,
      saldoNeto: totalIngresos - totalEgresos,
    };
  };

  const {
    totalMovimientos,
    totalIngresos,
    totalEgresos,
    saldoNeto,
  } = calcularTotales();

  // Función para mostrar el comprobante
  const mostrarComprobante = (movimiento) => {
    setComprobanteActual(movimiento);
    setComprobanteVisible(true);
  };

  // Función para obtener el icono según el tipo de producto
  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case "plazo_fijo":
        return <AccountBalance style={{ fontSize: 20 }} />;
      case "tarjeta":
        return <CreditCard style={{ fontSize: 20 }} />;
      case "credito":
        return <Receipt style={{ fontSize: 20 }} />;
      case "cuenta":
        return <AccountBalanceWallet style={{ fontSize: 20 }} />;
      default:
        return <Payment style={{ fontSize: 20 }} />;
    }
  };

  // Función para obtener el icono según la operación
  const getIconoOperacion = (operacion) => {
    switch (operacion) {
      case "deposito":
      case "cobro":
      case "apertura":
        return <ArrowDownward style={{ color: "green", fontSize: 16 }} />;
      case "extraccion":
      case "pago":
        return <ArrowUpward style={{ color: "red", fontSize: 16 }} />;
      default:
        return <AttachMoney style={{ fontSize: 16 }} />;
    }
  };

  // Función para formatear la fecha
  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return (
      fecha.toLocaleDateString() +
      " " +
      fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <>
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            .container-fluid {
              margin: 0;
              padding: 0;
            }
            .card {
              box-shadow: none !important;
              border: 1px solid #ddd !important;
            }
          }
        `}
      </style>
      <div className="container-fluid" ref={printRef}>
        {/* Encabezado y acciones */}
        <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
          <div className="card-body py-8 px-8">
            <div className="d-flex justify-content-between align-items-center mb-6">
              <div>
                <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                  Movimientos de Caja
                </h1>
                <p className="text-white-75 font-size-lg mb-0">
                  Registro completo de todas las transacciones realizadas
                  {loading && <span className="ml-2">(Cargando...)</span>}
                  {error && (
                    <span className="ml-2 text-warning">({error})</span>
                  )}
                </p>
              </div>
              <div className="d-flex align-items-center no-print">
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
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
                >
                  {viewMode === "grid" ? <List /> : <GridOn />}
                </button>
                <button
                  className="btn btn-light font-weight-bold"
                  onClick={handlePrint}
                >
                  <Print className="mr-2" />
                  Imprimir Reporte
                </button>
              </div>
            </div>

            {/* Métricas */}
            <div className="row mb-6">
              <div className="col-md-3">
                <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                  <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                    {totalMovimientos}
                  </div>
                  <div className="text-white-75 font-weight-bold">
                    Total Transacciones
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                  <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                    $ {totalIngresos.toLocaleString()}
                  </div>
                  <div className="text-white-75 font-weight-bold">
                    Total Créditos
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                  <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                    $ {totalEgresos.toLocaleString()}
                  </div>
                  <div className="text-white-75 font-weight-bold">
                    Total Débitos
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white bg-opacity-20 rounded p-4 text-center">
                  <div className="text-dark font-weight-bolder font-size-h3 mb-1">
                    $ {saldoNeto.toLocaleString()}
                  </div>
                  <div className="text-white-75 font-weight-bold">
                    Balance Neto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="card card-custom gutter-b mb-8 no-print">
            <div className="card-body bg-light-info pt-6 pb-4 px-8">
              <div className="row mb-6">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="text-muted font-weight-bold">
                      Tipo de Producto
                    </label>
                    <select
                      className="form-control form-control-solid"
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                      {tiposProducto.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="text-muted font-weight-bold">
                      Tipo de Operación
                    </label>
                    <select
                      className="form-control form-control-solid"
                      value={filtroOperacion}
                      onChange={(e) => setFiltroOperacion(e.target.value)}
                    >
                      {tiposOperacion.map((op) => (
                        <option key={op.value} value={op.value}>
                          {op.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="text-muted font-weight-bold">
                      Rango de Fechas
                    </label>
                    <div className="input-daterange input-group">
                      <input
                        type="date"
                        className="form-control form-control-solid"
                        placeholder="Desde"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">a</span>
                      </div>
                      <input
                        type="date"
                        className="form-control form-control-solid"
                        placeholder="Hasta"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Búsqueda */}
              <div className="d-flex align-items-center">
                <div className="input-icon input-icon-right flex-grow-1 mr-4">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Buscar por cliente, cuenta, producto o comprobante..."
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
        )}

        {/* Separación visual */}
        <div className="mb-8"></div>

        {/* Listado de movimientos */}
        {viewMode === "grid" ? (
          <div className="row">
            {movimientosFiltrados.length > 0 ? (
              movimientosFiltrados.map((movimiento) => (
                <div
                  key={movimiento.id}
                  className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
                >
                  <div
                    className={`card card-custom gutter-b shadow-sm ${
                      movimiento.operacion === "deposito" ||
                      movimiento.operacion === "cobro" ||
                      movimiento.operacion === "apertura"
                        ? "border-left-success"
                        : "border-left-danger"
                    }`}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                          <h4 className="text-dark font-weight-bolder mb-0">
                            #{movimiento.id}
                          </h4>
                          <span className="text-muted font-weight-bold">
                            {formatFecha(movimiento.fecha)}
                          </span>
                        </div>
                        <div
                          className={`badge badge-lg ${
                            movimiento.operacion === "deposito" ||
                            movimiento.operacion === "cobro" ||
                            movimiento.operacion === "apertura"
                              ? "badge-success"
                              : "badge-danger"
                          }`}
                        >
                          {movimiento.operacion.replace("_", " ")}
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="d-flex align-items-center mb-3">
                          <div className="symbol symbol-40 symbol-light mr-4">
                            <span className="symbol-label">
                              {getIconoTipo(movimiento.tipo)}
                            </span>
                          </div>
                          <div>
                            <span className="text-dark font-weight-bolder">
                              {movimiento.productoNombre}
                            </span>
                            <span className="text-muted d-block font-size-sm">
                              ID: {movimiento.productoId}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-dark font-weight-bolder mr-2">
                            Cliente:
                          </span>
                          <span className="text-muted">
                            {movimiento.cliente}
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-dark font-weight-bolder mr-2">
                            Cuenta:
                          </span>
                          <span className="text-muted">
                            {movimiento.cuenta}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                          <span className="text-muted font-weight-bold mb-1 d-block">
                            Monto
                          </span>
                          <span
                            className={`text-dark font-weight-bolder font-size-h5 ${
                              movimiento.operacion === "deposito" ||
                              movimiento.operacion === "cobro" ||
                              movimiento.operacion === "apertura"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {movimiento.moneda}{" "}
                            {movimiento.monto.toLocaleString()}
                          </span>
                        </div>
                        <div className="d-flex">
                          <button
                            onClick={() => mostrarComprobante(movimiento)}
                            className="btn btn-sm btn-light-primary"
                            title="Ver comprobante"
                          >
                            <Visibility className="mr-1" />
                            Ver
                          </button>
                        </div>
                      </div>
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
                      No se encontraron movimientos
                    </h3>
                    <p className="text-muted font-weight-bold mb-10">
                      No hay movimientos que coincidan con los filtros aplicados
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
                        <span className="text-dark-75">Fecha/Hora</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Producto</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Operación</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Cliente</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Cuenta</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Monto</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Estado</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Comprobante</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientosFiltrados.length > 0 ? (
                      movimientosFiltrados.map((movimiento) => (
                        <tr key={movimiento.id} className="border-bottom">
                          <td className="pl-7">
                            <span className="text-dark font-weight-bolder">
                              {formatFecha(movimiento.fecha)}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-40 symbol-light mr-4">
                                <span className="symbol-label">
                                  {getIconoTipo(movimiento.tipo)}
                                </span>
                              </div>
                              <div>
                                <span className="text-dark font-weight-bolder">
                                  {movimiento.productoNombre}
                                </span>
                                <span className="text-muted d-block font-size-sm">
                                  ID: {movimiento.productoId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {getIconoOperacion(movimiento.operacion)}
                              <span className="ml-2 text-capitalize">
                                {movimiento.operacion.replace("_", " ")}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark font-weight-bolder">
                              {movimiento.cliente}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark font-weight-bolder">
                              {movimiento.cuenta}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`font-weight-bolder ${
                                movimiento.operacion === "deposito" ||
                                movimiento.operacion === "cobro" ||
                                movimiento.operacion === "apertura"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {movimiento.moneda}{" "}
                              {movimiento.monto.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`label label-lg label-inline ${
                                movimiento.estado === "Completado"
                                  ? "label-light-success"
                                  : movimiento.estado === "Pendiente"
                                  ? "label-light-warning"
                                  : "label-light-danger"
                              }`}
                            >
                              {movimiento.estado}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-light-primary font-weight-bold"
                              onClick={() => mostrarComprobante(movimiento)}
                            >
                              <Description className="mr-2" />
                              {movimiento.comprobante.numero}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-10">
                          <div className="symbol symbol-100 symbol-light-primary mb-5">
                            <span className="symbol-label">
                              <Search
                                style={{ fontSize: 50, color: "#3699FF" }}
                              />
                            </span>
                          </div>
                          <h4 className="text-dark font-weight-bolder mb-2">
                            No se encontraron movimientos
                          </h4>
                          <p className="text-muted font-weight-bold">
                            No hay movimientos que coincidan con los filtros
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

        {/* Modal de comprobante */}
        {comprobanteVisible && (
          <div className="no-print">
            <div
              className="modal-backdrop fade show"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1040,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => setComprobanteVisible(false)}
            ></div>

            <div
              className="modal fade show"
              style={{
                display: "block",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1050,
              }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Comprobante de Operación</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setComprobanteVisible(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {comprobanteActual && (
                      <div className="card card-custom">
                        <div className="card-header bg-primary text-white">
                          <div className="card-title">
                            <h3 className="card-label text-white">
                              Banco XYZ - Sucursal{" "}
                              {comprobanteActual.comprobante.sucursal}
                            </h3>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row mb-10">
                            <div className="col-md-6">
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Número:
                                </span>
                                <span className="font-weight-bolder font-size-h5">
                                  {comprobanteActual.comprobante.numero}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6 text-right">
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Fecha/Hora:
                                </span>
                                <span className="font-weight-bolder">
                                  {formatFecha(comprobanteActual.fecha)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="separator separator-dashed my-8"></div>

                          <div className="row mb-10">
                            <div className="col-md-6">
                              <div className="d-flex flex-column mb-5">
                                <span className="text-muted font-weight-bold">
                                  Cliente:
                                </span>
                                <span className="font-weight-bolder">
                                  {comprobanteActual.cliente}
                                </span>
                              </div>
                              <div className="d-flex flex-column mb-5">
                                <span className="text-muted font-weight-bold">
                                  Cuenta:
                                </span>
                                <span className="font-weight-bolder">
                                  {comprobanteActual.cuenta}
                                </span>
                              </div>
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Producto:
                                </span>
                                <span className="font-weight-bolder">
                                  {comprobanteActual.productoNombre} (ID:{" "}
                                  {comprobanteActual.productoId})
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex flex-column mb-5">
                                <span className="text-muted font-weight-bold">
                                  Tipo de Operación:
                                </span>
                                <span className="font-weight-bolder text-capitalize">
                                  {comprobanteActual.operacion.replace(
                                    "_",
                                    " "
                                  )}
                                </span>
                              </div>
                              <div className="d-flex flex-column mb-5">
                                <span className="text-muted font-weight-bold">
                                  Monto:
                                </span>
                                <span
                                  className={`font-weight-bolder font-size-h5 ${
                                    comprobanteActual.operacion ===
                                      "deposito" ||
                                    comprobanteActual.operacion === "cobro" ||
                                    comprobanteActual.operacion === "apertura"
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                >
                                  {comprobanteActual.moneda}{" "}
                                  {comprobanteActual.monto.toLocaleString()}
                                </span>
                              </div>
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Estado:
                                </span>
                                <span>{comprobanteActual.estado}</span>
                              </div>
                            </div>
                          </div>

                          <div className="separator separator-dashed my-8"></div>

                          <div className="mb-10">
                            <h5 className="text-dark font-weight-bolder mb-4">
                              Detalles de la Operación
                            </h5>
                            <p className="text-dark">
                              {comprobanteActual.comprobante.detalle}
                            </p>
                          </div>

                          <div className="separator separator-dashed my-8"></div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Atendido por:
                                </span>
                                <span className="font-weight-bolder">
                                  {comprobanteActual.comprobante.cajero}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6 text-right">
                              <div className="d-flex flex-column">
                                <span className="text-muted font-weight-bold">
                                  Usuario:
                                </span>
                                <span className="font-weight-bolder">
                                  {comprobanteActual.usuario}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer text-center">
                          <p className="text-muted font-weight-bold">
                            Este comprobante no es válido como factura o recibo
                            oficial
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer no-print">
                    <button
                      type="button"
                      className="btn btn-light-primary font-weight-bold"
                      onClick={() => setComprobanteVisible(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold"
                      onClick={handlePrint}
                    >
                      <Print className="mr-2" />
                      Imprimir Comprobante
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovimientosCajaPage;

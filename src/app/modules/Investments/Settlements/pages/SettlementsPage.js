import React, { useState } from "react";
import {
  ArrowBack,
  Search,
  FilterList,
  Receipt,
  Person,
  AccountBalance,
  CalendarToday,
  MonetizationOn,
  TrendingUp,
  CheckCircle,
  Print,
  Description,
  PictureAsPdf,
  MoreVert,
  Info,
  AttachMoney,
  AccessTime,
} from "@material-ui/icons";

const SettlementsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [liquidacionSeleccionada, setLiquidacionSeleccionada] = useState(null);

  // Datos de ejemplo para las liquidaciones
  const liquidaciones = [
    {
      id: "LIQ-2023-0001",
      cliente: "María Rodríguez",
      producto: "Plazo Fijo Premium",
      monto: 1500000,
      invertido: 1350000,
      interes: 150000,
      fechaInicio: "2023-05-15",
      fechaVencimiento: "2023-08-15",
      fechaLiquidacion: "2023-08-16",
      moneda: "ARS",
      estado: "liquidado",
      documento: "comprobante-0001.pdf",
      tasa: 30,
      plazo: 90,
      tipoLiquidacion: "Al vencimiento",
      cuentaDestino: "Cuenta Corriente ****4582",
      observaciones: "Liquidación automática sin inconvenientes",
    },
    {
      id: "LIQ-2023-0002",
      cliente: "Carlos Méndez",
      producto: "Plazo Fijo Express",
      monto: 850000,
      invertido: 800000,
      interes: 50000,
      fechaInicio: "2023-06-10",
      fechaVencimiento: "2023-09-10",
      fechaLiquidacion: "2023-09-11",
      moneda: "USD",
      estado: "liquidado",
      documento: "comprobante-0002.pdf",
      tasa: 27,
      plazo: 90,
      tipoLiquidacion: "Al vencimiento",
      cuentaDestino: "Caja de Ahorro ****3021",
      observaciones: "Cliente notificado por email",
    },
    {
      id: "LIQ-2023-0003",
      cliente: "Laura Fernández",
      producto: "Plazo Fijo Tradicional",
      monto: 2200000,
      invertido: 2000000,
      interes: 200000,
      fechaInicio: "2023-07-01",
      fechaVencimiento: "2023-10-01",
      fechaLiquidacion: "",
      moneda: "ARS",
      estado: "pendiente",
      documento: "",
      tasa: 29,
      plazo: 90,
      tipoLiquidacion: "Mensual",
      cuentaDestino: "Cuenta Corriente ****7845",
      observaciones: "Pendiente de aprobación",
    },
    {
      id: "LIQ-2023-0004",
      cliente: "Roberto Sánchez",
      producto: "Plazo Fijo Renovable",
      monto: 3100000,
      invertido: 3000000,
      interes: 100000,
      fechaInicio: "2023-07-20",
      fechaVencimiento: "2023-10-20",
      fechaLiquidacion: "2023-10-21",
      moneda: "ARS",
      estado: "liquidado",
      documento: "comprobante-0004.pdf",
      tasa: 28.5,
      plazo: 90,
      tipoLiquidacion: "Al vencimiento",
      cuentaDestino: "Cuenta Corriente ****1256",
      observaciones: "Renovación automática aplicada",
    },
  ];

  // Filtrar liquidaciones según estado y búsqueda
  const liquidacionesFiltradas = liquidaciones.filter((l) => {
    const coincideEstado =
      filtroActivo === "todos" ||
      (filtroActivo === "liquidado" && l.estado === "liquidado") ||
      (filtroActivo === "pendiente" && l.estado === "pendiente");

    const coincideBusqueda =
      l.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());

    return coincideEstado && coincideBusqueda;
  });

  // Calcular totales
  const totalLiquidadas = liquidaciones.filter((l) => l.estado === "liquidado")
    .length;
  const totalPendientes = liquidaciones.filter((l) => l.estado === "pendiente")
    .length;
  const totalMontoLiquidadas = liquidaciones
    .filter((l) => l.estado === "liquidado")
    .reduce((sum, l) => sum + l.monto, 0);
  const totalIntereses = liquidaciones
    .filter((l) => l.estado === "liquidado")
    .reduce((sum, l) => sum + l.interes, 0);

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Liquidaciones de Plazos Fijos
            </h3>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              Gestión de todas las liquidaciones generadas por vencimiento de
              plazos fijos
            </span>
          </div>
          <div className="card-toolbar">
            <button className="btn btn-primary font-weight-bold">
              {/* <FileDownload className="mr-2" /> */}
              Exportar Reporte
            </button>
          </div>
        </div>

        {/* Estadísticas y filtros */}
        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <Receipt style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Liquidadas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalLiquidadas}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <AccessTime style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Pendientes
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalPendientes}
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
                  Monto Liquidadas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${totalMontoLiquidadas.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <TrendingUp style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Intereses Generados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${totalIntereses.toLocaleString()}
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
                    filtroActivo === "liquidado" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("liquidado")}
                >
                  <input type="radio" name="options" /> Liquidadas
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "pendiente" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("pendiente")}
                >
                  <input type="radio" name="options" /> Pendientes
                </label>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, producto o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <button className="btn btn-light btn-icon mb-4">
              <FilterList />
            </button>
          </div>
        </div>
      </div>

      {/* Listado de liquidaciones */}
      <div className="row">
        {liquidacionesFiltradas.map((liquidacion) => (
          <div
            key={liquidacion.id}
            className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
          >
            <div
              className={`card card-custom gutter-b shadow-sm ${
                liquidacion.estado === "liquidado"
                  ? "border-left-success"
                  : "border-left-warning"
              }`}
              style={{ borderLeftWidth: "4px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-5">
                      <span className="symbol-label">
                        <Receipt
                          style={{
                            fontSize: 30,
                            color:
                              liquidacion.estado === "liquidado"
                                ? "#1BC5BD"
                                : "#FFA800",
                          }}
                        />
                      </span>
                    </div>
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {liquidacion.id}
                      </h4>
                      <span className="text-muted font-weight-bold">
                        {liquidacion.producto}
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
                          <a
                            href="#"
                            className="navi-link"
                            onClick={(e) => {
                              e.preventDefault();
                              setLiquidacionSeleccionada(liquidacion);
                            }}
                          >
                            <span className="navi-text">Ver detalles</span>
                          </a>
                        </li>
                        {liquidacion.estado === "liquidado" && (
                          <>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Descargar PDF</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">
                                  Imprimir comprobante
                                </span>
                              </a>
                            </li>
                          </>
                        )}
                        {liquidacion.estado === "pendiente" && (
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">
                                Procesar liquidación
                              </span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="d-flex align-items-center mr-10">
                    <Person className="mr-2" style={{ color: "#7E8299" }} />
                    <span className="text-dark font-weight-bolder">
                      {liquidacion.cliente}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <AccountBalance
                      className="mr-2"
                      style={{ color: "#7E8299" }}
                    />
                    <span className="text-dark font-weight-bolder">
                      {liquidacion.moneda === "ARS" ? "$" : "US$"}{" "}
                      {liquidacion.monto.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Monto Invertido
                      </span>
                      <span className="text-dark font-weight-bolder font-size-h5">
                        {liquidacion.moneda === "ARS" ? "$" : "US$"}{" "}
                        {liquidacion.invertido.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Interés Generado
                      </span>
                      <span className="text-success font-weight-bolder font-size-h5">
                        {liquidacion.moneda === "ARS" ? "$" : "US$"}{" "}
                        {liquidacion.interes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span
                      className={`label label-lg label-inline ${
                        liquidacion.estado === "liquidado"
                          ? "label-light-success"
                          : "label-light-warning"
                      }`}
                    >
                      {liquidacion.estado === "liquidado" ? (
                        <span className="d-flex align-items-center">
                          <div
                            className="bg-success mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          Liquidado
                        </span>
                      ) : (
                        <span className="d-flex align-items-center">
                          <div
                            className="bg-warning mr-2 rounded-circle"
                            style={{ width: 8, height: 8 }}
                          ></div>
                          Pendiente
                        </span>
                      )}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted font-weight-bold mr-2">
                      Vencimiento:
                    </span>
                    <span className="text-dark font-weight-bolder">
                      {liquidacion.fechaVencimiento}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                <button
                  className="btn btn-light-primary font-weight-bold"
                  onClick={() => setLiquidacionSeleccionada(liquidacion)}
                >
                  Ver detalle completo
                </button>
                {liquidacion.estado === "liquidado" ? (
                  <div className="dropdown dropdown-inline">
                    <button
                      className="btn btn-light-success font-weight-bold dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Descargar
                    </button>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <ul className="navi navi-hover">
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <Description className="navi-icon mr-2" />
                            <span className="navi-text">Ver comprobante</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <PictureAsPdf className="navi-icon mr-2" />
                            <span className="navi-text">Descargar PDF</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <Print className="navi-icon mr-2" />
                            <span className="navi-text">Imprimir</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-primary font-weight-bold">
                    Procesar liquidación
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sin resultados */}
      {liquidacionesFiltradas.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron liquidaciones
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchTerm("");
                setFiltroActivo("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Paginación */}
      {liquidacionesFiltradas.length > 0 && (
        <div className="card card-custom gutter-t">
          <div className="card-body py-6">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center py-3">
                <span className="text-muted font-weight-bold mr-4">
                  Mostrando 1 a {liquidacionesFiltradas.length} de{" "}
                  {liquidacionesFiltradas.length} registros
                </span>
              </div>

              <div className="d-flex align-items-center py-3">
                <ul className="pagination pagination-sm">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">
                      Anterior
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Siguiente
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalle de liquidación */}
      {liquidacionSeleccionada && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Detalle de Liquidación - {liquidacionSeleccionada.id}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setLiquidacionSeleccionada(null)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row mb-7">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <Person style={{ fontSize: 24, color: "#3699FF" }} />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Cliente</div>
                        <div className="text-muted">
                          {liquidacionSeleccionada.cliente}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <AccountBalance
                            style={{ fontSize: 24, color: "#8950FC" }}
                          />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Producto</div>
                        <div className="text-muted">
                          {liquidacionSeleccionada.producto}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <CalendarToday
                            style={{ fontSize: 24, color: "#FFA800" }}
                          />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Fechas</div>
                        <div className="text-muted">
                          <div>
                            Inicio: {liquidacionSeleccionada.fechaInicio}
                          </div>
                          <div>
                            Vencimiento:{" "}
                            {liquidacionSeleccionada.fechaVencimiento}
                          </div>
                          {liquidacionSeleccionada.estado === "liquidado" && (
                            <div>
                              Liquidación:{" "}
                              {liquidacionSeleccionada.fechaLiquidacion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <MonetizationOn
                            style={{ fontSize: 24, color: "#1BC5BD" }}
                          />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Montos</div>
                        <div className="text-muted">
                          <div>
                            Invertido:{" "}
                            {liquidacionSeleccionada.moneda === "ARS"
                              ? "$"
                              : "US$"}{" "}
                            {liquidacionSeleccionada.invertido.toLocaleString()}
                          </div>
                          <div>
                            Interés:{" "}
                            {liquidacionSeleccionada.moneda === "ARS"
                              ? "$"
                              : "US$"}{" "}
                            {liquidacionSeleccionada.interes.toLocaleString()}
                          </div>
                          <div>
                            Total:{" "}
                            {liquidacionSeleccionada.moneda === "ARS"
                              ? "$"
                              : "US$"}{" "}
                            {liquidacionSeleccionada.monto.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <TrendingUp
                            style={{ fontSize: 24, color: "#F64E60" }}
                          />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Rendimiento</div>
                        <div className="text-muted">
                          <div>Tasa: {liquidacionSeleccionada.tasa}% TNA</div>
                          <div>Plazo: {liquidacionSeleccionada.plazo} días</div>
                          <div>
                            Tipo Liquidación:{" "}
                            {liquidacionSeleccionada.tipoLiquidacion}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          <Receipt style={{ fontSize: 24, color: "#6993FF" }} />
                        </span>
                      </div>
                      <div>
                        <div className="font-weight-bolder">Cuenta Destino</div>
                        <div className="text-muted">
                          {liquidacionSeleccionada.cuentaDestino}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="form-group">
                  <label>Observaciones</label>
                  <textarea
                    className="form-control form-control-solid"
                    rows="3"
                    readOnly
                    value={liquidacionSeleccionada.observaciones}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bold"
                  onClick={() => setLiquidacionSeleccionada(null)}
                >
                  Cerrar
                </button>
                {liquidacionSeleccionada.estado === "liquidado" && (
                  <div className="dropdown dropdown-inline">
                    <button
                      className="btn btn-primary font-weight-bold dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Descargar
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <ul className="navi navi-hover">
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <Description className="navi-icon mr-2" />
                            <span className="navi-text">Ver comprobante</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <PictureAsPdf className="navi-icon mr-2" />
                            <span className="navi-text">Descargar PDF</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="#" className="navi-link">
                            <Print className="navi-icon mr-2" />
                            <span className="navi-text">Imprimir</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {liquidacionSeleccionada.estado === "pendiente" && (
                  <button
                    type="button"
                    className="btn btn-primary font-weight-bold"
                  >
                    Procesar Liquidación
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementsPage;

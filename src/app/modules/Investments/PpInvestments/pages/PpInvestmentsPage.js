/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  ArrowBack,
  Search,
  FilterList,
  PieChart,
  ShowChart,
  Equalizer,
  AccountBalance,
  TrendingUp,
  DonutLarge,
  BarChart,
  Money,
  MoreVert,
} from "@material-ui/icons";

import { useHistory } from "react-router-dom";

const PpInvestmentsPage = () => {
  const history = useHistory();
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [tabActivo, setTabActivo] = useState("resumen");

  // Datos de inversiones
  const inversiones = [
    {
      id: 2001,
      tipo: "Bono del Tesoro",
      plazoFijoOrigen: "1001, 1003, 1006",
      monto: 450000,
      moneda: "$",
      fechaInicio: "2023-05-20",
      fechaVencimiento: "2024-05-20",
      rentabilidad: 8.5,
      riesgo: "Bajo",
      estado: "activo",
      categoria: "Renta Fija",
    },
    {
      id: 2002,
      tipo: "Acciones Tech",
      plazoFijoOrigen: "1002, 1007",
      monto: 62500,
      moneda: "USD",
      fechaInicio: "2023-06-05",
      rentabilidad: 15.2,
      riesgo: "Alto",
      estado: "activo",
      categoria: "Renta Variable",
    },
    {
      id: 2003,
      tipo: "Fondo Común de Inversión",
      plazoFijoOrigen: "1005, 1008",
      monto: 290000,
      moneda: "$",
      fechaInicio: "2023-03-01",
      rentabilidad: 12.3,
      riesgo: "Medio",
      estado: "activo",
      categoria: "Fondos",
    },
    {
      id: 2004,
      tipo: "Letras del Banco Central",
      plazoFijoOrigen: "1004",
      monto: 75000,
      moneda: "$",
      fechaInicio: "2023-04-10",
      fechaVencimiento: "2023-10-10",
      rentabilidad: 7.8,
      riesgo: "Bajo",
      estado: "finalizado",
      categoria: "Renta Fija",
    },
    {
      id: 2005,
      tipo: "ETF Internacional",
      plazoFijoOrigen: "1001, 1006",
      monto: 150000,
      moneda: "$",
      fechaInicio: "2023-07-15",
      rentabilidad: 9.7,
      riesgo: "Medio",
      estado: "activo",
      categoria: "Renta Variable",
    },
    {
      id: 2006,
      tipo: "Obligaciones Negociables",
      plazoFijoOrigen: "1003, 1005",
      monto: 200000,
      moneda: "$",
      fechaInicio: "2023-06-20",
      fechaVencimiento: "2024-06-20",
      rentabilidad: 10.2,
      riesgo: "Medio",
      estado: "activo",
      categoria: "Renta Fija",
    },
  ];

  // Datos para gráficos y resumen
  const datosResumen = {
    totalInvertido: inversiones.reduce((sum, inv) => sum + inv.monto, 0),
    rentabilidadPromedio:
      inversiones.reduce((sum, inv) => sum + inv.rentabilidad, 0) /
      inversiones.length,
    distribucionCategorias: [
      {
        name: "Renta Fija",
        value: inversiones
          .filter((inv) => inv.categoria === "Renta Fija")
          .reduce((sum, inv) => sum + inv.monto, 0),
      },
      {
        name: "Renta Variable",
        value: inversiones
          .filter((inv) => inv.categoria === "Renta Variable")
          .reduce((sum, inv) => sum + inv.monto, 0),
      },
      {
        name: "Fondos",
        value: inversiones
          .filter((inv) => inv.categoria === "Fondos")
          .reduce((sum, inv) => sum + inv.monto, 0),
      },
    ],
    distribucionRiesgo: [
      {
        name: "Bajo",
        value: inversiones.filter((inv) => inv.riesgo === "Bajo").length,
      },
      {
        name: "Medio",
        value: inversiones.filter((inv) => inv.riesgo === "Medio").length,
      },
      {
        name: "Alto",
        value: inversiones.filter((inv) => inv.riesgo === "Alto").length,
      },
    ],
  };

  // Filtrar inversiones
  const inversionesFiltradas = inversiones.filter((inv) => {
    const coincideEstado =
      filtroActivo === "todos" ||
      (filtroActivo === "activos" && inv.estado === "activo") ||
      (filtroActivo === "finalizados" && inv.estado === "finalizado");

    const coincideBusqueda =
      inv.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      inv.plazoFijoOrigen.includes(busqueda) ||
      inv.id.toString().includes(busqueda) ||
      inv.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      tabActivo === "todos" ||
      tabActivo === "resumen" ||
      (tabActivo === "renta-fija" && inv.categoria === "Renta Fija") ||
      (tabActivo === "renta-variable" && inv.categoria === "Renta Variable") ||
      (tabActivo === "fondos" && inv.categoria === "Fondos");

    return coincideEstado && coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Gestión de Inversiones
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Destino de fondos de plazos fijos a instrumentos financieros
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button
                onClick={() => history.goBack()}
                className="btn btn-light-secondary text-dark font-weight-bold mr-4"
              >
                <ArrowBack /> Volver
              </button>
              <button className="btn btn-primary font-weight-bold">
                Nueva Inversión
              </button>
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="card-body pt-0 px-8">
          <ul className="nav nav-tabs nav-tabs-line">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  tabActivo === "resumen" ? "active" : ""
                }`}
                onClick={() => setTabActivo("resumen")}
              >
                <PieChart className="mr-2" />
                Resumen
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  tabActivo === "renta-fija" ? "active" : ""
                }`}
                onClick={() => setTabActivo("renta-fija")}
              >
                <AccountBalance className="mr-2" />
                Renta Fija
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  tabActivo === "renta-variable" ? "active" : ""
                }`}
                onClick={() => setTabActivo("renta-variable")}
              >
                <ShowChart className="mr-2" />
                Renta Variable
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tabActivo === "fondos" ? "active" : ""}`}
                onClick={() => setTabActivo("fondos")}
              >
                <DonutLarge className="mr-2" />
                Fondos
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tabActivo === "todos" ? "active" : ""}`}
                onClick={() => setTabActivo("todos")}
              >
                <Equalizer className="mr-2" />
                Todas las Inversiones
              </a>
            </li>
          </ul>
        </div>

        {/* Estadísticas */}
        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-primary mr-4">
                <span className="symbol-label bg-white">
                  <Money style={{ fontSize: 24, color: "#3699FF" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Invertido
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${datosResumen.totalInvertido.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <TrendingUp style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Rentabilidad Promedio
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {datosResumen.rentabilidadPromedio.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <BarChart style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Inversiones Activas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {inversiones.filter((inv) => inv.estado === "activo").length}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <Equalizer style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Diversificación
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {datosResumen.distribucionCategorias.length} Categorías
                </div>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="d-flex align-items-center flex-wrap">
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
                    filtroActivo === "activos" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("activos")}
                >
                  <input type="radio" name="options" /> Activos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filtroActivo === "finalizados" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("finalizados")}
                >
                  <input type="radio" name="options" /> Finalizados
                </label>
              </div>
            </div>

            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar por tipo, categoría, ID o plazos fijos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
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

      {/* Contenido según pestaña activa */}
      {tabActivo === "resumen" && (
        <div className="row">
          {/* Gráfico de distribución por categoría */}
          <div className="col-lg-6 col-xxl-4 mb-8">
            <div className="card card-custom gutter-b">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="card-label">Distribución por Categoría</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  {/* Aquí iría un gráfico de torta */}
                  <div className="symbol symbol-200 symbol-circle">
                    <div className="symbol-label bg-white">
                      <PieChart style={{ fontSize: 100, color: "#3699FF" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {datosResumen.distribucionCategorias.map((cat, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div
                        className={`bullet bullet-${
                          index === 0
                            ? "primary"
                            : index === 1
                            ? "success"
                            : "warning"
                        } mr-3`}
                      ></div>
                      <div className="d-flex justify-content-between flex-grow-1">
                        <span className="text-dark-75 font-weight-bold">
                          {cat.name}
                        </span>
                        <span className="text-muted font-weight-bold">
                          ${cat.value.toLocaleString()} (
                          {(
                            (cat.value / datosResumen.totalInvertido) *
                            100
                          ).toFixed(1)}
                          %)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de distribución por riesgo */}
          <div className="col-lg-6 col-xxl-4 mb-8">
            <div className="card card-custom gutter-b">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="card-label">Perfil de Riesgo</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  {/* Aquí iría un gráfico de barras */}
                  <div className="symbol symbol-200 symbol-circle">
                    <div className="symbol-label bg-white">
                      <Equalizer style={{ fontSize: 100, color: "#1BC5BD" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {datosResumen.distribucionRiesgo.map((riesgo, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div
                        className={`bullet bullet-${
                          riesgo.name === "Bajo"
                            ? "success"
                            : riesgo.name === "Medio"
                            ? "warning"
                            : "danger"
                        } mr-3`}
                      ></div>
                      <div className="d-flex justify-content-between flex-grow-1">
                        <span className="text-dark-75 font-weight-bold">
                          Riesgo {riesgo.name}
                        </span>
                        <span className="text-muted font-weight-bold">
                          {riesgo.value} inversiones
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Últimas inversiones */}
          <div className="col-lg-12 col-xxl-4 mb-8">
            <div className="card card-custom gutter-b">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="card-label">Últimas Inversiones</h3>
                </div>
              </div>
              <div className="card-body">
                {inversiones.slice(0, 4).map((inv) => (
                  <div key={inv.id} className="d-flex align-items-center mb-8">
                    <div className="symbol symbol-50 symbol-light mr-5">
                      <span className="symbol-label">
                        {inv.categoria === "Renta Fija" && (
                          <AccountBalance
                            style={{ fontSize: 30, color: "#3699FF" }}
                          />
                        )}
                        {inv.categoria === "Renta Variable" && (
                          <ShowChart
                            style={{ fontSize: 30, color: "#1BC5BD" }}
                          />
                        )}
                        {inv.categoria === "Fondos" && (
                          <DonutLarge
                            style={{ fontSize: 30, color: "#FFA800" }}
                          />
                        )}
                      </span>
                    </div>
                    <div className="d-flex flex-column flex-grow-1 mr-2">
                      <span className="text-dark font-weight-bold mb-1">
                        {inv.tipo}
                      </span>
                      <span className="text-muted font-weight-bold">
                        {inv.moneda} {inv.monto.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex flex-column text-right">
                      <span
                        className={`font-weight-bold ${
                          inv.rentabilidad > 10
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {inv.rentabilidad}%
                      </span>
                      <span
                        className={`label label-sm label-${
                          inv.riesgo === "Bajo"
                            ? "success"
                            : inv.riesgo === "Medio"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {inv.riesgo}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="btn btn-light-primary font-weight-bold w-100">
                  Ver todas las inversiones
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listado completo de inversiones */}
      {tabActivo !== "resumen" && (
        <div className="row">
          {inversionesFiltradas.map((inv) => (
            <div
              key={inv.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  inv.estado === "activo"
                    ? "border-left-primary"
                    : "border-left-success"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          {inv.categoria === "Renta Fija" && (
                            <AccountBalance
                              style={{ fontSize: 30, color: "#3699FF" }}
                            />
                          )}
                          {inv.categoria === "Renta Variable" && (
                            <ShowChart
                              style={{ fontSize: 30, color: "#1BC5BD" }}
                            />
                          )}
                          {inv.categoria === "Fondos" && (
                            <DonutLarge
                              style={{ fontSize: 30, color: "#FFA800" }}
                            />
                          )}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {inv.tipo}
                        </h4>
                        <span className="text-muted font-weight-bold">
                          ID: {inv.id} | Origen: {inv.plazoFijoOrigen}
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
                            <button
                              type="button"
                              className="navi-link btn btn-link p-0 text-left"
                            >
                              <span className="navi-text">Ver detalles</span>
                            </button>
                          </li>
                          <li className="navi-item">
                            <button
                              type="button"
                              className="navi-link btn btn-link p-0 text-left"
                            >
                              <span className="navi-text">Ajustar</span>
                            </button>
                          </li>
                          <li className="navi-item">
                            <button
                              type="button"
                              className="navi-link btn btn-link p-0 text-left"
                            >
                              <span className="navi-text">Liquidar</span>
                            </button>
                          </li>
                          <li className="navi-item">
                            <button
                              type="button"
                              className="navi-link btn btn-link p-0 text-left"
                            >
                              <span className="navi-text">
                                Exportar reporte
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Monto Invertido
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {inv.moneda} {inv.monto.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Rentabilidad
                        </span>
                        <span
                          className={`font-weight-bolder font-size-h5 ${
                            inv.rentabilidad > 10
                              ? "text-success"
                              : "text-warning"
                          }`}
                        >
                          {inv.rentabilidad}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <span className="text-muted font-weight-bold mr-2">
                        Categoría:
                      </span>
                      <span className="text-dark font-weight-bolder">
                        {inv.categoria}
                      </span>
                    </div>
                    <div>
                      <span>Riesgo: {inv.riesgo}</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span
                        className={`label label-lg label-inline ${
                          inv.estado === "activo"
                            ? "label-light-primary"
                            : "label-light-success"
                        }`}
                      >
                        {inv.estado === "activo" ? (
                          <span className="d-flex align-items-center">
                            <div
                              className="bg-primary mr-2 rounded-circle"
                              style={{ width: 8, height: 8 }}
                            ></div>
                            Activo
                          </span>
                        ) : (
                          <span className="d-flex align-items-center">
                            <div
                              className="bg-success mr-2 rounded-circle"
                              style={{ width: 8, height: 8 }}
                            ></div>
                            Finalizado
                          </span>
                        )}
                      </span>
                    </div>

                    {inv.fechaVencimiento && (
                      <div>
                        <span className="text-muted font-weight-bold mr-2">
                          Vencimiento:
                        </span>
                        <span className="text-dark font-weight-bolder">
                          {new Date(inv.fechaVencimiento).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <button className="btn btn-light-primary font-weight-bold">
                    Ver detalle completo
                  </button>
                  <button
                    className={`btn ${
                      inv.estado === "activo"
                        ? "btn-light-danger"
                        : "btn-light-success"
                    } font-weight-bold`}
                  >
                    {inv.estado === "activo" ? "Liquidar" : "Reinvertir"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {inversionesFiltradas.length === 0 && tabActivo !== "resumen" && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron resultados
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
    </div>
  );
};

export default PpInvestmentsPage;

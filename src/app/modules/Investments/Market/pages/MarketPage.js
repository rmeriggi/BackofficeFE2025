import React, { useState } from "react";
import {
  ArrowBack,
  Search,
  FilterList,
  BarChart,
  ShowChart,
  TrendingUp,
  MonetizationOn,
  AccountBalance,
  LocalAtm,
  Public,
  PieChart,
  AttachMoney,
  EuroSymbol,
  /*  CurrencyBitcoin, */
  ExpandMore,
  MoreVert,
} from "@material-ui/icons";

import { markets } from "./mocks/markets.js";

const MarketPage = () => {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroMoneda, setFiltroMoneda] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [mercadoExpandido, setMercadoExpandido] = useState(null);

  const toggleExpandirMercado = (id) => {
    if (mercadoExpandido === id) {
      setMercadoExpandido(null);
    } else {
      setMercadoExpandido(id);
    }
  };

  const marketsFiltrados = markets.filter((m) => {
    const coincideTipo =
      filtroActivo === "todos" ||
      (filtroActivo === "destacados" && m.destacado) ||
      filtroActivo === m.tipo.toLowerCase();

    const coincideMoneda =
      filtroMoneda === "todas" ||
      filtroMoneda === m.moneda.toLowerCase() ||
      (filtroMoneda === "cripto" && m.tipo === "Cripto");

    const coincideBusqueda =
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.id.toString().includes(busqueda);

    return coincideTipo && coincideMoneda && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalmarkets = markets.length;
  const totalDestacados = markets.filter((m) => m.destacado).length;
  const rendimientoPromedio =
    markets.reduce((sum, m) => sum + m.rendimientoAnual, 0) / totalmarkets;

  // Contar por tipo
  const tiposMercado = [...new Set(markets.map((m) => m.tipo))];
  const conteoTipos = tiposMercado.map((tipo) => ({
    tipo,
    cantidad: markets.filter((m) => m.tipo === tipo).length,
  }));

  // Obtener colores según el riesgo
  const getRiesgoColor = (riesgo) => {
    switch (riesgo.toLowerCase()) {
      case "muy alto":
        return "#F64E60";
      case "alto":
        return "#FFA800";
      case "medio-alto":
        return "#FFC700";
      case "medio":
        return "#1BC5BD";
      case "bajo-medio":
        return "#0BB783";
      case "bajo":
        return "#3699FF";
      default:
        return "#E4E6EF";
    }
  };

  // Obtener icono según el tipo
  const getTipoIcono = (tipo) => {
    switch (tipo) {
      case "Acciones":
        return <ShowChart style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Bonos":
        return <AccountBalance style={{ fontSize: 30, color: "#0BB783" }} />;
      case "ETF":
        return <TrendingUp style={{ fontSize: 30, color: "#FFA800" }} />;
      /* case "Cripto":
        return <CurrencyBitcoin style={{ fontSize: 30, color: "#F64E60" }} />; */
      case "FCI":
        return <PieChart style={{ fontSize: 30, color: "#8950FC" }} />;
      case "REITs":
        return <Public style={{ fontSize: 30, color: "#1BC5BD" }} />;
      case "Forex":
        return <AttachMoney style={{ fontSize: 30, color: "#6993FF" }} />;
      case "Commodities":
        return <LocalAtm style={{ fontSize: 30, color: "#0BB783" }} />;
      default:
        return <MonetizationOn style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Obtener icono de moneda
  const getMonedaIcono = (moneda) => {
    switch (moneda) {
      case "USD":
        return <AttachMoney style={{ fontSize: 18, color: "#0BB783" }} />;
      case "ARS":
        return <AttachMoney style={{ fontSize: 18, color: "#3699FF" }} />;
      case "EUR":
        return <EuroSymbol style={{ fontSize: 18, color: "#8950FC" }} />;
      default:
        return <AttachMoney style={{ fontSize: 18, color: "#0BB783" }} />;
      /*   return <CurrencyBitcoin style={{ fontSize: 18, color: "#F64E60" }} />; */
    }
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  markets de Inversión Disponibles
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Explora diversas oportunidades de inversión para diversificar tu
                portafolio
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                Nuevo Mercado
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas y filtros */}
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
                  markets Disponibles
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalmarkets}
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
                  {rendimientoPromedio.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <MonetizationOn style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  markets Destacados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalDestacados}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <ShowChart style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Tipos de Mercado
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {tiposMercado.length}
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
                {tiposMercado.slice(0, 3).map((tipo) => (
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

              {/* Select para moneda */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filtroMoneda}
                  onChange={(e) => setFiltroMoneda(e.target.value)}
                >
                  <option value="todas">Todas las monedas</option>
                  <option value="usd">USD</option>
                  <option value="ars">ARS</option>
                  <option value="eur">EUR</option>
                  <option value="cripto">Cripto</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar mercado, tipo o descripción..."
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

      {/* Listado de markets */}
      <div className="row">
        {marketsFiltrados.map((m) => (
          <div
            key={m.id}
            className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
          >
            <div
              className={`card card-custom gutter-b shadow-sm ${
                m.destacado ? "border-left-warning" : "border-left-primary"
              }`}
              style={{ borderLeftWidth: "4px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-5">
                      <span className="symbol-label">
                        {getTipoIcono(m.tipo)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {m.nombre}{" "}
                        {m.destacado && (
                          <span className="label label-sm label-warning label-inline ml-2">
                            Destacado
                          </span>
                        )}
                      </h4>
                      <span className="text-muted font-weight-bold">
                        ID: {m.id} | {m.tipo}
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
                            <span className="navi-text">Comparar</span>
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
                            <span className="navi-text">Histórico</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-muted font-weight-bold mb-3">
                    {m.descripcion}
                  </p>

                  <div className="d-flex align-items-center flex-wrap">
                    <div className="d-flex align-items-center mr-10 mb-2">
                      <div className="mr-2">
                        <span className="text-dark font-weight-bolder">
                          Emisor:
                        </span>
                        <span className="text-muted ml-2">{m.emisor}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mr-10 mb-2">
                      <div className="mr-2">
                        <span className="text-dark font-weight-bolder">
                          Moneda:
                        </span>
                        <span className="text-muted ml-2">
                          {getMonedaIcono(m.moneda)} {m.moneda}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Rentabilidad Esperada
                      </span>
                      <span className="text-dark font-weight-bolder font-size-h5">
                        {m.rentabilidadEsperada}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Inversión Mínima
                      </span>
                      <span className="text-dark font-weight-bolder font-size-h5">
                        {m.moneda} {m.minInversion.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <span
                      className="label label-lg label-inline"
                      style={{ backgroundColor: getRiesgoColor(m.riesgo) }}
                    >
                      <span className="text-white d-flex align-items-center">
                        <div
                          className="bg-white mr-2 rounded-circle"
                          style={{ width: 8, height: 8 }}
                        ></div>
                        Riesgo: {m.riesgo}
                      </span>
                    </span>
                  </div>

                  <div>
                    <span className="text-muted font-weight-bold mr-2">
                      Calificación:
                    </span>
                    <span className="text-warning font-weight-bolder">
                      {m.calificacion} ★
                    </span>
                  </div>
                </div>

                {/* Detalles expandibles */}
                <div className="mt-4">
                  <button
                    className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                    onClick={() => toggleExpandirMercado(m.id)}
                  >
                    <span>Ver más detalles</span>
                    <ExpandMore
                      className={`ml-1 transition ${
                        mercadoExpandido === m.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mercadoExpandido === m.id && (
                    <div className="mt-4 pt-4 border-top">
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex flex-column mb-3">
                            <span className="text-muted font-weight-bold mb-1">
                              Volatilidad
                            </span>
                            <span className="text-dark font-weight-bolder">
                              {m.volatilidad}
                            </span>
                          </div>

                          <div className="d-flex flex-column mb-3">
                            <span className="text-muted font-weight-bold mb-1">
                              Comisión
                            </span>
                            <span className="text-dark font-weight-bolder">
                              {m.comision}%
                            </span>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="d-flex flex-column mb-3">
                            <span className="text-muted font-weight-bold mb-1">
                              Liquidez
                            </span>
                            <span className="text-dark font-weight-bolder">
                              {m.liquidez}
                            </span>
                          </div>

                          <div className="d-flex flex-column">
                            <span className="text-muted font-weight-bold mb-1">
                              Rendimiento Anual
                            </span>
                            <span className="text-success font-weight-bolder">
                              {m.rendimientoAnual}%
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
                  Ver histórico
                </button>
                <button className="btn btn-primary font-weight-bold">
                  Invertir ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sin resultados */}
      {marketsFiltrados.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron markets
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todos");
                setFiltroMoneda("todas");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por tipo de mercado */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <h3 className="card-title text-dark font-weight-bolder">
            Distribución por Tipo de Mercado
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
                    {item.cantidad === 1 ? "mercado" : "markets"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;

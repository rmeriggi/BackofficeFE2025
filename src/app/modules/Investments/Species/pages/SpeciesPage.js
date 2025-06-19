import React, { useState } from "react";
import {
  ArrowBack,
  Search,
  FilterList,
  ShowChart,
  TrendingUp,
  MonetizationOn,
  AccountBalance,
  PieChart,
  AttachMoney,
  EuroSymbol,
  /*   CurrencyBitcoin, */
  ExpandMore,
  MoreVert,
  Star,
  StarBorder,
  ArrowDropUp,
  ArrowDropDown,
} from "@material-ui/icons";

import { species } from "../mocks/species.js";

const SpeciesPage = () => {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroMercado, setFiltroMercado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [especieExpandida, setEspecieExpandida] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const toggleExpandirEspecie = (id) => {
    if (especieExpandida === id) {
      setEspecieExpandida(null);
    } else {
      setEspecieExpandida(id);
    }
  };

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const speciesFiltradas = species.filter((e) => {
    const coincideTipo =
      filtroActivo === "todos" ||
      (filtroActivo === "destacadas" && e.destacada) ||
      filtroActivo === e.tipo.toLowerCase();

    const coincideMercado =
      filtroMercado === "todos" || filtroMercado === e.mercado.toLowerCase();

    const coincideBusqueda =
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.id.toLowerCase().includes(busqueda.toLowerCase());

    return coincideTipo && coincideMercado && coincideBusqueda;
  });

  // Calcular estadísticas
  const totalspecies = species.length;
  const totalDestacadas = species.filter((e) => e.destacada).length;
  const promedioVariacion =
    species.reduce((sum, e) => sum + e.variacion, 0) / totalspecies;

  // Contar por tipo
  const tiposspecies = [...new Set(species.map((e) => e.tipo))];
  const conteoTipos = tiposspecies.map((tipo) => ({
    tipo,
    cantidad: species.filter((e) => e.tipo === tipo).length,
  }));

  // Obtener icono según el tipo
  const getTipoIcono = (tipo) => {
    switch (tipo) {
      case "Acción":
        return <ShowChart style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Bono":
        return <AccountBalance style={{ fontSize: 30, color: "#0BB783" }} />;
      case "ETF":
        return <TrendingUp style={{ fontSize: 30, color: "#FFA800" }} />;
      /*  case "Criptomoneda":
        return <CurrencyBitcoin style={{ fontSize: 30, color: "#F64E60" }} />; */
      default:
        return <MonetizationOn style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Obtener color según variación
  const getVariacionColor = (variacion) => {
    return variacion >= 0 ? "#0BB783" : "#F64E60";
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

  // Formatear precio según moneda
  const formatPrecio = (precio, moneda) => {
    if (moneda === "ARS") {
      return `$${precio.toLocaleString("es-AR")}`;
    } else if (moneda === "USD") {
      return `US$${precio.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `${precio.toLocaleString()}`;
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <ArrowBack
                  className="mr-2 cursor-pointer"
                  onClick={() => window.history.back()}
                />
                <span className="text-dark font-weight-bolder">
                  species Financieras
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Cotizaciones en tiempo real de acciones, bonos, ETFs y más
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                Nueva Alerta
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
                  <ShowChart style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  species Listadas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalspecies}
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
                  Variación Promedio
                </div>
                <div
                  className="font-size-h4 font-weight-bolder"
                  style={{
                    color: promedioVariacion >= 0 ? "#0BB783" : "#F64E60",
                  }}
                >
                  {promedioVariacion.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <Star style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  species Destacadas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalDestacadas}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <PieChart style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Tipos de species
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {tiposspecies.length}
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
                    filtroActivo === "destacadas" ? "active" : ""
                  }`}
                  onClick={() => setFiltroActivo("destacadas")}
                >
                  <input type="radio" name="options" /> Destacadas
                </label>
                {tiposspecies.map((tipo) => (
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

              {/* Select para mercado */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filtroMercado}
                  onChange={(e) => setFiltroMercado(e.target.value)}
                >
                  <option value="todos">Todos los mercados</option>
                  <option value="nasdaq">NASDAQ</option>
                  <option value="byma">BYMA</option>
                  <option value="nyse">NYSE</option>
                  <option value="binance">Binance</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar especie, símbolo o descripción..."
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

      {/* Listado de species */}
      <div className="row">
        {speciesFiltradas.map((e) => (
          <div
            key={e.id}
            className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
          >
            <div
              className={`card card-custom gutter-b shadow-sm ${
                e.destacada ? "border-left-warning" : "border-left-primary"
              }`}
              style={{ borderLeftWidth: "4px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-5">
                      <span className="symbol-label">
                        {getTipoIcono(e.tipo)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-dark font-weight-bolder mb-0">
                        {e.nombre}
                      </h4>
                      <div className="d-flex align-items-center">
                        <span className="text-muted font-weight-bold mr-2">
                          {e.id}
                        </span>
                        {e.destacada && (
                          <span className="label label-sm label-warning label-inline">
                            Destacada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <button
                      className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                      onClick={() => toggleFavorito(e.id)}
                    >
                      {favoritos.includes(e.id) ? (
                        <Star style={{ color: "#FFA800" }} />
                      ) : (
                        <StarBorder style={{ color: "#B5B5C3" }} />
                      )}
                    </button>

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
                              <span className="navi-text">Ver gráfico</span>
                            </a>
                          </li>
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">Crear alerta</span>
                            </a>
                          </li>
                          <li className="navi-item">
                            <a href="#" className="navi-link">
                              <span className="navi-text">
                                Análisis técnico
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
                </div>

                <div className="mb-5">
                  <p className="text-muted font-weight-bold mb-3">
                    {e.descripcion}
                  </p>

                  <div className="d-flex align-items-center flex-wrap">
                    <div className="d-flex align-items-center mr-10 mb-2">
                      <div className="mr-2">
                        <span className="text-dark font-weight-bolder">
                          Mercado:
                        </span>
                        <span className="text-muted ml-2">{e.mercado}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mr-10 mb-2">
                      <div className="mr-2">
                        <span className="text-dark font-weight-bolder">
                          Sector:
                        </span>
                        <span className="text-muted ml-2">{e.sector}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Precio
                      </span>
                      <span className="text-dark font-weight-bolder font-size-h5">
                        {formatPrecio(e.precio, e.moneda)}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted font-weight-bold mb-1">
                        Variación (24h)
                      </span>
                      <div className="d-flex align-items-center">
                        {e.variacion >= 0 ? (
                          <ArrowDropUp style={{ color: "#0BB783" }} />
                        ) : (
                          <ArrowDropDown style={{ color: "#F64E60" }} />
                        )}
                        <span
                          className="font-weight-bolder font-size-h5"
                          style={{ color: getVariacionColor(e.variacion) }}
                        >
                          {e.variacion > 0 ? "+" : ""}
                          {e.variacion}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">
                      <span className="text-muted font-weight-bold">
                        Volumen:
                      </span>
                      <span className="text-dark font-weight-bolder ml-2">
                        {e.volumen.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted font-weight-bold mr-2">
                      Moneda:
                    </span>
                    <span className="text-dark font-weight-bolder">
                      {getMonedaIcono(e.moneda)} {e.moneda}
                    </span>
                  </div>
                </div>

                {/* Detalles expandibles */}
                <div className="mt-4">
                  <button
                    className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                    onClick={() => toggleExpandirEspecie(e.id)}
                  >
                    <span>Ver más detalles</span>
                    <ExpandMore
                      className={`ml-1 transition ${
                        especieExpandida === e.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {especieExpandida === e.id && (
                    <div className="mt-4 pt-4 border-top">
                      <div className="row">
                        {e.tipo === "Acción" || e.tipo === "ETF" ? (
                          <>
                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  PER (P/E Ratio)
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.per}
                                </span>
                              </div>

                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Dividend Yield
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.dividendYield}%
                                </span>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Beta
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.beta}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : e.tipo === "Bono" ? (
                          <>
                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Rendimiento
                                </span>
                                <span className="text-success font-weight-bolder">
                                  {e.rendimiento}%
                                </span>
                              </div>

                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Vencimiento
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.vencimiento}
                                </span>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Calificación
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.calificacion}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Capitalización
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.capitalizacion}
                                </span>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex flex-column mb-3">
                                <span className="text-muted font-weight-bold mb-1">
                                  Suministro Máximo
                                </span>
                                <span className="text-dark font-weight-bolder">
                                  {e.maxSupply.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
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
                  Operar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sin resultados */}
      {speciesFiltradas.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron species
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setBusqueda("");
                setFiltroActivo("todos");
                setFiltroMercado("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por tipo de especie */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <h3 className="card-title text-dark font-weight-bolder">
            Distribución por Tipo de Especie
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
                    {item.cantidad === 1 ? "especie" : "species"}
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

export default SpeciesPage;

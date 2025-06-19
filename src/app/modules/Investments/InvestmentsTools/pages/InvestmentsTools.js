import {
  AccountBalance,
  ArrowBack,
  ArrowDropDown,
  ArrowDropUp,
  AttachMoney,
  BarChart,
  EuroSymbol,
  /*   CurrencyBitcoin, */
  ExpandMore,
  FilterList,
  InsertChart,
  LocalAtm,
  MonetizationOn,
  MoreVert,
  PieChart,
  ScatterPlot,
  Search,
  ShowChart,
  Star,
  StarBorder,
  TableChart,
  Timeline,
  TrendingUp,
} from "@material-ui/icons";
import React, { useState } from "react";

import { instruments } from "../mocks/investmentsTools";

const InvestmentsToolsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedInstrument, setExpandedInstrument] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  const toggleExpandInstrument = (id) => {
    if (expandedInstrument === id) {
      setExpandedInstrument(null);
    } else {
      setExpandedInstrument(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredInstruments = instruments.filter((i) => {
    const typeMatch =
      activeFilter === "all" ||
      (activeFilter === "featured" && i.featured) ||
      activeFilter === i.type.toLowerCase();

    const marketMatch =
      marketFilter === "all" || marketFilter === i.market.toLowerCase();

    const searchMatch =
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && marketMatch && searchMatch;
  });

  // Calculate statistics
  const totalInstruments = instruments.length;
  const totalFeatured = instruments.filter((i) => i.featured).length;
  const averageChange =
    instruments.reduce((sum, i) => sum + i.change, 0) / totalInstruments;

  // Count by type
  const instrumentTypes = [...new Set(instruments.map((i) => i.type))];
  const typeCounts = instrumentTypes.map((type) => ({
    type,
    count: instruments.filter((i) => i.type === type).length,
  }));

  // Get icon by type
  const getTypeIcon = (type) => {
    switch (type) {
      case "Stock":
        return <ShowChart style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Bond":
        return <AccountBalance style={{ fontSize: 30, color: "#0BB783" }} />;
      case "ETF":
        return <TrendingUp style={{ fontSize: 30, color: "#FFA800" }} />;
      /*  case "Crypto":
        return <CurrencyBitcoin style={{ fontSize: 30, color: "#F64E60" }} />; */
      case "Commodity":
        return <LocalAtm style={{ fontSize: 30, color: "#8950FC" }} />;
      case "Forex":
        return <MonetizationOn style={{ fontSize: 30, color: "#1BC5BD" }} />;
      default:
        return <InsertChart style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Get color based on change
  const getChangeColor = (change) => {
    return change >= 0 ? "#0BB783" : "#F64E60";
  };

  // Get currency icon
  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case "USD":
        return <AttachMoney style={{ fontSize: 18, color: "#0BB783" }} />;
      case "EUR":
        return <EuroSymbol style={{ fontSize: 18, color: "#3699FF" }} />;
      default:
        return <AttachMoney style={{ fontSize: 18, color: "#0BB783" }} />;

      /*  return <CurrencyBitcoin style={{ fontSize: 18, color: "#8950FC" }} />; */
    }
  };

  // Format price based on currency
  const formatPrice = (price, currency) => {
    if (currency === "USD") {
      return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `${price.toLocaleString()}`;
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === "cards" ? "table" : "cards");
  };

  return (
    <div className="container-fluid">
      {/* Header */}
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
                  Instrumentos Financieros
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Cotizaciones en tiempo real de acciones, bonos, ETFs, materias
                primas y más
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <BarChart className="mr-2" /> Análisis
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Timeline className="mr-2" /> Crear Lista de Seguimiento
              </button>
            </div>
          </div>
        </div>

        {/* Statistics and filters */}
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
                  Instrumentos Listados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalInstruments}
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
                  Cambio Diario Promedio
                </div>
                <div
                  className="font-size-h4 font-weight-bolder"
                  style={{ color: averageChange >= 0 ? "#0BB783" : "#F64E60" }}
                >
                  {averageChange >= 0 ? "+" : ""}
                  {averageChange.toFixed(2)}%
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
                  Instrumentos Destacados
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {totalFeatured}
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
                  Tipos de Instrumentos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {instrumentTypes.length}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap">
            {/* Filters */}
            <div className="d-flex align-items-center mr-10 mb-4 flex-wrap">
              <span className="text-dark font-weight-bold mr-4">
                Filtrar por:
              </span>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    activeFilter === "all" ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter("all")}
                >
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    activeFilter === "featured" ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter("featured")}
                >
                  <input type="radio" name="options" /> Destacados
                </label>
                {instrumentTypes.map((type) => (
                  <label
                    key={type}
                    className={`btn btn-outline-secondary font-weight-bold ${
                      activeFilter === type.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(type.toLowerCase())}
                  >
                    <input type="radio" name="options" /> {type}
                  </label>
                ))}
              </div>

              {/* Market select */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={marketFilter}
                  onChange={(e) => setMarketFilter(e.target.value)}
                >
                  <option value="all">Todos los Mercados</option>
                  <option value="nasdaq">NASDAQ</option>
                  <option value="nyse">NYSE</option>
                  <option value="forex">Forex</option>
                  <option value="comex">COMEX</option>
                  <option value="binance">Binance</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar instrumento, símbolo o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={toggleViewMode}
              >
                {viewMode === "cards" ? <TableChart /> : <ScatterPlot />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card view */}
      {viewMode === "cards" && (
        <div className="row">
          {filteredInstruments.map((i) => (
            <div
              key={i.id}
              className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  i.featured ? "border-left-warning" : "border-left-primary"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-5">
                        <span className="symbol-label">
                          {getTypeIcon(i.type)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {i.name}
                        </h4>
                        <div className="d-flex align-items-center">
                          <span className="text-muted font-weight-bold mr-2">
                            {i.id}
                          </span>
                          {i.featured && (
                            <span className="label label-sm label-warning label-inline">
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                        onClick={() => toggleFavorite(i.id)}
                      >
                        {favorites.includes(i.id) ? (
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
                                <span className="navi-text">Ver Gráfico</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Crear Alerta</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">
                                  Análisis Técnico
                                </span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">
                                  Datos Históricos
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-muted font-weight-bold mb-3">
                      {i.description}
                    </p>

                    <div className="d-flex align-items-center flex-wrap">
                      <div className="d-flex align-items-center mr-10 mb-2">
                        <div className="mr-2">
                          <span className="text-dark font-weight-bolder">
                            Mercado:
                          </span>
                          <span className="text-muted ml-2">{i.market}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mr-10 mb-2">
                        <div className="mr-2">
                          <span className="text-dark font-weight-bolder">
                            Sector:
                          </span>
                          <span className="text-muted ml-2">{i.sector}</span>
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
                          {formatPrice(i.price, i.currency)}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Cambio (24h)
                        </span>
                        <div className="d-flex align-items-center">
                          {i.change >= 0 ? (
                            <ArrowDropUp style={{ color: "#0BB783" }} />
                          ) : (
                            <ArrowDropDown style={{ color: "#F64E60" }} />
                          )}
                          <span
                            className="font-weight-bolder font-size-h5"
                            style={{ color: getChangeColor(i.change) }}
                          >
                            {i.change > 0 ? "+" : ""}
                            {i.change}%
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
                          {i.volume.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted font-weight-bold mr-2">
                        Moneda:
                      </span>
                      <span className="text-dark font-weight-bolder">
                        {getCurrencyIcon(i.currency)} {i.currency}
                      </span>
                    </div>
                  </div>

                  {/* Expandable details */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandInstrument(i.id)}
                    >
                      <span>Ver más detalles</span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          expandedInstrument === i.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedInstrument === i.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="row">
                          {i.type === "Stock" || i.type === "ETF" ? (
                            <>
                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Ratio P/E
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.peRatio}
                                  </span>
                                </div>

                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Dividendo
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.dividendYield}%
                                  </span>
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Beta
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.beta}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : i.type === "Bond" ? (
                            <>
                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Rendimiento
                                  </span>
                                  <span className="text-success font-weight-bolder">
                                    {i.yield}%
                                  </span>
                                </div>

                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Vencimiento
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.maturity}
                                  </span>
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Calificación
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.rating}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : i.type === "Crypto" ? (
                            <>
                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Capitalización
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.marketCap}
                                  </span>
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Suministro Máximo
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.maxSupply.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : i.type === "Commodity" ? (
                            <>
                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Tamaño de Contrato
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.contractSize}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : i.type === "Forex" ? (
                            <>
                              <div className="col-6">
                                <div className="d-flex flex-column mb-3">
                                  <span className="text-muted font-weight-bold mb-1">
                                    Spread
                                  </span>
                                  <span className="text-dark font-weight-bolder">
                                    {i.spread}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <button className="btn btn-light-primary font-weight-bold">
                    Datos Históricos
                  </button>
                  <button className="btn btn-primary font-weight-bold">
                    Operar Ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view */}
      {viewMode === "table" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-vertical-center">
                <thead>
                  <tr>
                    <th className="min-w-150px">Instrumento</th>
                    <th className="min-w-100px">Símbolo</th>
                    <th className="min-w-100px">Tipo</th>
                    <th className="min-w-100px">Mercado</th>
                    <th className="min-w-100px">Precio</th>
                    <th className="min-w-100px">Cambio</th>
                    <th className="min-w-100px">Volumen</th>
                    <th className="min-w-100px">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstruments.map((i) => (
                    <tr key={i.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-light mr-4">
                            <span className="symbol-label">
                              {getTypeIcon(i.type)}
                            </span>
                          </div>
                          <div>
                            <span className="text-dark font-weight-bolder d-block">
                              {i.name}
                            </span>
                            <span className="text-muted font-weight-bold">
                              {i.sector}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {i.id}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted font-weight-bold">
                          {i.type}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted font-weight-bold">
                          {i.market}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {formatPrice(i.price, i.currency)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {i.change >= 0 ? (
                            <ArrowDropUp style={{ color: "#0BB783" }} />
                          ) : (
                            <ArrowDropDown style={{ color: "#F64E60" }} />
                          )}
                          <span
                            className="font-weight-bolder"
                            style={{ color: getChangeColor(i.change) }}
                          >
                            {i.change > 0 ? "+" : ""}
                            {i.change}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-muted font-weight-bold">
                          {i.volume.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                            onClick={() => toggleFavorite(i.id)}
                          >
                            {favorites.includes(i.id) ? (
                              <Star style={{ color: "#FFA800" }} />
                            ) : (
                              <StarBorder style={{ color: "#B5B5C3" }} />
                            )}
                          </button>
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                            onClick={() => toggleExpandInstrument(i.id)}
                          >
                            <ExpandMore
                              className={`transition ${
                                expandedInstrument === i.id
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                            />
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

      {/* No results */}
      {filteredInstruments.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron instrumentos
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intente ajustar sus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
                setMarketFilter("all");
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        </div>
      )}

      {/* Instrument type summary */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              Distribución por Tipo de Instrumento
            </h3>
          </div>
          <div className="card-toolbar">
            <button className="btn btn-light-primary font-weight-bold">
              Ver Reporte Completo
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            {typeCounts.map((item) => (
              <div
                key={item.type}
                className="d-flex align-items-center mr-10 mb-5"
              >
                <div className="symbol symbol-40 symbol-light mr-4">
                  <span className="symbol-label">{getTypeIcon(item.type)}</span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    {item.type}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.count}{" "}
                    {item.count === 1 ? "instrumento" : "instrumentos"}
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

export default InvestmentsToolsPage;

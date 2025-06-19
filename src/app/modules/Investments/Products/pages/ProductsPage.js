import {
  AccountBalance,
  Add,
  ArrowBack,
  Assessment,
  AttachMoney,
  BarChart,
  Business,
  CloudDownload,
  Description,
  Euro,
  ExpandMore,
  FilterList,
  LocalOffer,
  MonetizationOn,
  MoreVert,
  PieChart,
  Print,
  Search,
  ShowChart,
  Star,
  StarBorder,
  TableChart,
  Timeline,
  TrendingUp,
} from "@material-ui/icons";
import React, { useState } from "react";
import { investmentProductsData } from "../mocks/products";

const ProductsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("cards");

  const toggleExpandProduct = (id) => {
    if (expandedProduct === id) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProducts = investmentProductsData.filter((product) => {
    const categoryMatch =
      activeFilter === "all" ||
      (activeFilter === "featured" && product.isFeatured) ||
      activeFilter === product.category.toLowerCase();

    const typeMatch =
      typeFilter === "all" || typeFilter === product.type.toLowerCase();

    const currencyMatch =
      currencyFilter === "all" ||
      currencyFilter === product.currency.toLowerCase();

    const riskMatch =
      riskFilter === "all" || riskFilter === product.risk.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      categoryMatch && typeMatch && currencyMatch && riskMatch && searchMatch
    );
  });

  // Calcular estadísticas
  const totalProducts = investmentProductsData.length;
  const totalVolume = investmentProductsData.reduce(
    (sum, product) => sum + product.volume,
    0
  );
  const totalOutstanding = investmentProductsData.reduce(
    (sum, product) => sum + product.outstanding,
    0
  );
  const activeProducts = investmentProductsData.filter(
    (product) => product.status === "Activo"
  ).length;
  const featuredProducts = investmentProductsData.filter(
    (product) => product.isFeatured
  ).length;

  // Contar por categoría
  const categories = [
    ...new Set(investmentProductsData.map((product) => product.category)),
  ];
  const categoryCounts = categories.map((category) => ({
    category,
    count: investmentProductsData.filter(
      (product) => product.category === category
    ).length,
  }));

  // Obtener icono por tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case "Renta Fija":
        return <AccountBalance style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Renta Variable":
        return <ShowChart style={{ fontSize: 30, color: "#8950FC" }} />;
      case "FCI":
        return <PieChart style={{ fontSize: 30, color: "#1BC5BD" }} />;
      case "ETF":
        return <Timeline style={{ fontSize: 30, color: "#FFA800" }} />;
      case "Commodity":
        return <LocalOffer style={{ fontSize: 30, color: "#F64E60" }} />;
      default:
        return <Business style={{ fontSize: 30, color: "#7E8299" }} />;
    }
  };

  // Obtener icono por moneda
  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case "ARS":
        return <AttachMoney style={{ fontSize: 16, color: "#3699FF" }} />;
      case "USD":
        return <AttachMoney style={{ fontSize: 16, color: "#3699FF" }} />;
      case "EUR":
        return <Euro style={{ fontSize: 16, color: "#8950FC" }} />;
      default:
        /*  return <CurrencyExchange style={{ fontSize: 16, color: "#7E8299" }} />; */
        return <AttachMoney style={{ fontSize: 16, color: "#3699FF" }} />;
    }
  };

  // Obtener color basado en el riesgo
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Muy Bajo":
        return "#0BB783";
      case "Bajo":
        return "#1BC5BD";
      case "Medio":
        return "#FFA800";
      case "Alto":
        return "#F64E60";
      case "Muy Alto":
        return "#8B0000";
      default:
        return "#7E8299";
    }
  };

  // Obtener color basado en el rating
  const getRatingColor = (rating) => {
    switch (rating) {
      case "AAA":
        return "#0BB783";
      case "AA":
        return "#1BC5BD";
      case "A":
        return "#3699FF";
      case "BBB":
        return "#FFA800";
      case "BB":
        return "#F64E60";
      case "B":
        return "#8B0000";
      default:
        return "#7E8299";
    }
  };

  // Formatear moneda
  const formatCurrency = (amount, currency = "ARS") => {
    const options = {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    return new Intl.NumberFormat("es-AR", options).format(amount);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Formatear porcentaje
  const formatPercentage = (value) => {
    if (value === null || value === undefined) return "N/A";
    return `${value.toFixed(2)}%`;
  };

  // Alternar modo de vista
  const toggleViewMode = () => {
    setViewMode(viewMode === "cards" ? "table" : "cards");
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card card-custom gutter-b bg-light-info">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <ArrowBack
                  className="mr-2 cursor-pointer text-primary"
                  onClick={() => window.history.back()}
                />
                <span className="text-dark font-weight-bolder font-size-h2">
                  Productos de Inversión
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-lg">
                Catálogo completo de especies e instrumentos de inversión
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <BarChart className="mr-2" /> Análisis de Mercado
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" /> Nuevo Producto
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="card-body bg-gradient-white pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-primary mr-4">
                <span className="symbol-label bg-white">
                  <Business style={{ fontSize: 24, color: "#3699FF" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Productos Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-primary">
                  {totalProducts}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <MonetizationOn style={{ fontSize: 24, color: "#0BB783" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Volumen Diario
                </div>
                <div className="font-size-h3 font-weight-bolder text-success">
                  {formatCurrency(totalVolume)}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalance style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Emisión Total
                </div>
                <div className="font-size-h3 font-weight-bolder text-warning">
                  {formatCurrency(totalOutstanding)}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <Star style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Productos Destacados
                </div>
                <div className="font-size-h3 font-weight-bolder text-info">
                  {featuredProducts}
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="d-flex align-items-center flex-wrap">
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
                {categories.map((category) => (
                  <label
                    key={category}
                    className={`btn btn-outline-secondary font-weight-bold ${
                      activeFilter === category.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(category.toLowerCase())}
                  >
                    <input type="radio" name="options" /> {category}
                  </label>
                ))}
              </div>

              {/* Filtro por tipo */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Todos los Tipos</option>
                  <option value="renta fija">Renta Fija</option>
                  <option value="renta variable">Renta Variable</option>
                  <option value="fci">FCI</option>
                  <option value="etf">ETF</option>
                  <option value="commodity">Commodity</option>
                </select>
              </div>

              {/* Filtro por moneda */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                >
                  <option value="all">Todas las Monedas</option>
                  <option value="ars">Pesos (ARS)</option>
                  <option value="usd">Dólares (USD)</option>
                  <option value="eur">Euros (EUR)</option>
                </select>
              </div>

              {/* Filtro por riesgo */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option value="all">Todos los Riesgos</option>
                  <option value="muy bajo">Muy Bajo</option>
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                  <option value="muy alto">Muy Alto</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar producto, símbolo, emisor..."
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
                {viewMode === "cards" ? <TableChart /> : <Business />}
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <FilterList />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <CloudDownload />
              </button>
              <button className="btn btn-light btn-icon">
                <Print />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de tarjetas */}
      {viewMode === "cards" && (
        <div className="row">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-xl-6 col-xxl-4 col-lg-6 col-md-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  product.isFeatured
                    ? "border-left-warning"
                    : product.risk === "Bajo" || product.risk === "Muy Bajo"
                    ? "border-left-success"
                    : product.risk === "Medio"
                    ? "border-left-warning"
                    : "border-left-danger"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-60 symbol-circle mr-5">
                        <span className="symbol-label bg-light-primary">
                          {getTypeIcon(product.type)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {product.name}
                        </h4>
                        <div className="d-flex align-items-center mt-1">
                          <span className="text-muted font-weight-bold mr-2">
                            {product.symbol}
                          </span>
                          {getCurrencyIcon(product.currency)}
                          <span
                            className="label label-sm label-inline font-weight-bold ml-2"
                            style={{
                              backgroundColor: getRiskColor(product.risk),
                              color: "#fff",
                            }}
                          >
                            {product.risk}
                          </span>
                          <span
                            className="label label-sm label-inline font-weight-bold ml-2"
                            style={{
                              backgroundColor: getRatingColor(product.rating),
                              color: "#fff",
                            }}
                          >
                            {product.rating}
                          </span>
                          {product.isFeatured && (
                            <span className="label label-sm label-warning label-inline font-weight-bold ml-2">
                              Destacado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        {favorites.includes(product.id) ? (
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
                                <span className="navi-text">Ver Detalles</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Comprar</span>
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
                                <span className="navi-text">Documentos</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        Emisor:
                      </span>
                      <span className="text-dark font-weight-bold">
                        {product.issuer}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        Mercado:
                      </span>
                      <span className="text-dark font-weight-bold">
                        {product.market}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        Liquidez:
                      </span>
                      <span className="text-dark font-weight-bold">
                        {product.liquidity}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Precio
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {formatCurrency(product.price, product.currency)}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Yield
                        </span>
                        <span className="text-success font-weight-bolder font-size-h5">
                          {formatPercentage(product.yield)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {product.coupon && (
                    <div className="row mb-5">
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Cupón
                          </span>
                          <span className="text-primary font-weight-bolder font-size-h5">
                            {formatPercentage(product.coupon)}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Vencimiento
                          </span>
                          <span className="text-info font-weight-bolder font-size-h5">
                            {formatDate(product.maturity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Inversión Mín.
                        </span>
                        <span className="text-warning font-weight-bolder font-size-h5">
                          {formatCurrency(
                            product.minInvestment,
                            product.currency
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Volumen Diario
                        </span>
                        <span className="text-success font-weight-bolder font-size-h5">
                          {formatCurrency(product.volume, product.currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="mb-5">
                    <span className="text-muted font-weight-bold d-block mb-2">
                      Performance:
                    </span>
                    <div className="d-flex flex-wrap">
                      <span className="label label-light-info label-inline font-weight-bold mr-2 mb-2">
                        YTD: {formatPercentage(product.performance.ytd)}
                      </span>
                      <span className="label label-light-success label-inline font-weight-bold mr-2 mb-2">
                        1A: {formatPercentage(product.performance.y1)}
                      </span>
                      <span className="label label-light-warning label-inline font-weight-bold mr-2 mb-2">
                        3A: {formatPercentage(product.performance.y3)}
                      </span>
                      <span className="label label-light-primary label-inline font-weight-bold mr-2 mb-2">
                        5A: {formatPercentage(product.performance.y5)}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-5">
                    <span className="text-muted font-weight-bold d-block mb-2">
                      Características:
                    </span>
                    <div className="d-flex flex-wrap">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="label label-light-primary label-inline font-weight-bold mr-2 mb-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable details */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandProduct(product.id)}
                    >
                      <span>
                        {expandedProduct === product.id
                          ? "Ver menos detalles"
                          : "Ver más detalles"}
                      </span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          expandedProduct === product.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedProduct === product.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Descripción:
                          </span>
                          <span className="text-dark">
                            {product.description}
                          </span>
                        </div>

                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Características:
                          </span>
                          <div className="d-flex flex-wrap">
                            {product.features.map((feature, index) => (
                              <span
                                key={index}
                                className="label label-light-success label-inline font-weight-bold mr-2 mb-2"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Riesgos:
                          </span>
                          <div className="d-flex flex-wrap">
                            {product.risks.map((risk, index) => (
                              <span
                                key={index}
                                className="label label-light-danger label-inline font-weight-bold mr-2 mb-2"
                              >
                                {risk}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Documentos:
                          </span>
                          <div className="d-flex flex-wrap">
                            {product.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="label label-light-info label-inline font-weight-bold mr-2 mb-2"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button className="btn btn-light-primary font-weight-bold">
                            <Assessment className="mr-2" />
                            Análisis
                          </button>
                          <button className="btn btn-primary font-weight-bold">
                            <Add className="mr-2" />
                            Comprar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <button className="btn btn-light-info font-weight-bold">
                    <Description className="mr-2" />
                    Documentos
                  </button>
                  <button className="btn btn-success font-weight-bold">
                    <TrendingUp className="mr-2" />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista de tabla */}
      {viewMode === "table" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-vertical-center">
                <thead>
                  <tr>
                    <th className="min-w-200px">Producto</th>
                    <th className="min-w-100px">Tipo</th>
                    <th className="min-w-100px">Riesgo</th>
                    <th className="min-w-100px">Rating</th>
                    <th className="min-w-120px">Precio</th>
                    <th className="min-w-120px">Yield</th>
                    <th className="min-w-100px">Volumen</th>
                    <th className="min-w-100px">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-circle mr-4">
                            <span className="symbol-label bg-light-primary">
                              {getTypeIcon(product.type)}
                            </span>
                          </div>
                          <div>
                            <span className="text-dark font-weight-bolder d-block">
                              {product.name}
                            </span>
                            <span className="text-muted font-weight-bold">
                              {product.symbol}{" "}
                              {getCurrencyIcon(product.currency)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bold">
                          {product.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getRiskColor(product.risk),
                            color: "#fff",
                          }}
                        >
                          {product.risk}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getRatingColor(product.rating),
                            color: "#fff",
                          }}
                        >
                          {product.rating}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {formatCurrency(product.price, product.currency)}
                        </span>
                      </td>
                      <td>
                        <span className="text-success font-weight-bolder d-block">
                          {formatPercentage(product.yield)}
                        </span>
                      </td>
                      <td>
                        <span className="text-primary font-weight-bolder">
                          {formatCurrency(product.volume, product.currency)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            {favorites.includes(product.id) ? (
                              <Star style={{ color: "#FFA800" }} />
                            ) : (
                              <StarBorder style={{ color: "#B5B5C3" }} />
                            )}
                          </button>
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                            onClick={() => toggleExpandProduct(product.id)}
                          >
                            <ExpandMore
                              className={`transition ${
                                expandedProduct === product.id
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

      {/* Sin resultados */}
      {filteredProducts.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron productos
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intente ajustar sus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
                setTypeFilter("all");
                setCurrencyFilter("all");
                setRiskFilter("all");
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por categoría */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              Distribución por Categoría
            </h3>
          </div>
          <div className="card-toolbar">
            <button className="btn btn-light-primary font-weight-bold">
              Exportar Reporte
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            {categoryCounts.map((item) => (
              <div
                key={item.category}
                className="d-flex align-items-center mr-10 mb-5"
              >
                <div className="symbol symbol-40 symbol-light mr-4">
                  <span className="symbol-label bg-light-primary">
                    <span className="text-primary font-weight-bold">
                      {item.category.charAt(0)}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    {item.category}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.count} {item.count === 1 ? "producto" : "productos"}
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

export default ProductsPage;

import {
  AccountBalance,
  ArrowBack,
  BarChart,
  Business,
  ExpandMore,
  FilterList,
  Group,
  MonetizationOn,
  MoreVert,
  Person,
  Search,
  Star,
  StarBorder,
  TableChart,
} from "@material-ui/icons";
import React, { useState } from "react";

import { investors } from "../mocks/investors";

const InvestorsListPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedInvestor, setExpandedInvestor] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("cards");

  const toggleExpandInvestor = (id) => {
    if (expandedInvestor === id) {
      setExpandedInvestor(null);
    } else {
      setExpandedInvestor(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredInvestors = investors.filter((i) => {
    const typeMatch =
      activeFilter === "all" ||
      (activeFilter === "featured" && i.segment === "VIP") ||
      activeFilter === i.type.toLowerCase();

    const segmentMatch =
      segmentFilter === "all" || segmentFilter === i.segment.toLowerCase();

    const searchMatch =
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.portfolio.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return typeMatch && segmentMatch && searchMatch;
  });

  // Calcular estadísticas
  const totalInvestors = investors.length;
  const totalInvestment = investors.reduce(
    (sum, i) => sum + i.totalInvestment,
    0
  );
  const averageInvestment = totalInvestment / totalInvestors;
  const vipInvestors = investors.filter((i) => i.segment === "VIP").length;

  // Contar por tipo
  const investorTypes = [...new Set(investors.map((i) => i.type))];
  const typeCounts = investorTypes.map((type) => ({
    type,
    count: investors.filter((i) => i.type === type).length,
  }));

  // Obtener icono por tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case "Individual":
        return <Person style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Corporativo":
        return <Business style={{ fontSize: 30, color: "#8950FC" }} />;
      default:
        return <Group style={{ fontSize: 30, color: "#1BC5BD" }} />;
    }
  };

  // Obtener color basado en el segmento
  const getSegmentColor = (segment) => {
    switch (segment) {
      case "VIP":
        return "#FFA800"; // Amarillo/naranja
      case "Premium":
        return "#8950FC"; // Púrpura
      default:
        return "#3699FF"; // Azul
    }
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
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
                  Clientes Inversores
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-lg">
                Gestión integral de nuestra cartera de clientes inversores
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <BarChart className="mr-2" /> Análisis de Cartera
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Person className="mr-2" /> Nuevo Cliente
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas y filtros */}
        <div className="card-body bg-gradient-white pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-primary mr-4">
                <span className="symbol-label bg-white">
                  <Group style={{ fontSize: 24, color: "#3699FF" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Clientes Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-primary">
                  {totalInvestors}
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
                  Inversión Total
                </div>
                <div className="font-size-h3 font-weight-bolder text-success">
                  {formatCurrency(totalInvestment)}
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
                  Clientes VIP
                </div>
                <div className="font-size-h3 font-weight-bolder text-warning">
                  {vipInvestors}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalance style={{ fontSize: 24, color: "#8950FC" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Inversión Promedio
                </div>
                <div className="font-size-h3 font-weight-bolder text-info">
                  {formatCurrency(averageInvestment)}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-wrap">
            {/* Filtros */}
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
                  <input type="radio" name="options" /> VIP
                </label>
                {investorTypes.map((type) => (
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

              {/* Filtro por segmento */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={segmentFilter}
                  onChange={(e) => setSegmentFilter(e.target.value)}
                >
                  <option value="all">Todos los Segmentos</option>
                  <option value="vip">VIP</option>
                  <option value="premium">Premium</option>
                  <option value="estándar">Estándar</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, email, sector..."
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
                {viewMode === "cards" ? <TableChart /> : <Person />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de tarjetas */}
      {viewMode === "cards" && (
        <div className="row">
          {filteredInvestors.map((investor) => (
            <div
              key={investor.id}
              className="col-xl-4 col-xxl-3 col-md-6 col-sm-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  investor.segment === "VIP"
                    ? "border-left-warning"
                    : investor.segment === "Premium"
                    ? "border-left-primary"
                    : "border-left-info"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      {/* <div className="symbol symbol-60 symbol-circle mr-5">
                        <img
                          src={investor.avatar}
                          alt={investor.name}
                          className="h-100 align-self-end"
                        />
                      </div> */}
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {investor.name}
                        </h4>
                        <div className="d-flex align-items-center mt-1">
                          <span
                            className={`label label-sm label-inline font-weight-bold`}
                            style={{
                              backgroundColor: getSegmentColor(
                                investor.segment
                              ),
                              color: "#fff",
                            }}
                          >
                            {investor.segment}
                          </span>
                          <span className="label label-sm label-light-info label-inline font-weight-bold ml-2">
                            {investor.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                        onClick={() => toggleFavorite(investor.id)}
                      >
                        {favorites.includes(investor.id) ? (
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
                                <span className="navi-text">
                                  Editar Cliente
                                </span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Historial</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">
                                  Enviar Comunicación
                                </span>
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
                        Contacto:
                      </span>
                      <div>
                        <a
                          href={`mailto:${investor.email}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {investor.email}
                        </a>
                        <a
                          href={`tel:${investor.phone}`}
                          className="text-dark text-hover-primary"
                        >
                          {investor.phone}
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        Estado:
                      </span>
                      <span
                        className={`label label-${
                          investor.status === "Activo" ? "success" : "warning"
                        } label-inline font-weight-bold`}
                      >
                        {investor.status}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Inversión Total
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {formatCurrency(investor.totalInvestment)}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Proyectos
                        </span>
                        <div className="d-flex align-items-center">
                          <span className="font-weight-bolder font-size-h5 text-primary">
                            {investor.projects}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-muted font-weight-bold d-block mb-2">
                      Última inversión:
                    </span>
                    <div className="d-flex align-items-center">
                      <span className="text-dark font-weight-bolder">
                        {formatDate(investor.lastInvestment)}
                      </span>
                    </div>
                  </div>

                  {/* Portafolio */}
                  <div className="mb-5">
                    <span className="text-muted font-weight-bold d-block mb-2">
                      Portafolio:
                    </span>
                    <div className="d-flex flex-wrap">
                      {investor.portfolio.map((sector, index) => (
                        <span
                          key={index}
                          className="label label-light-info label-inline font-weight-bold mr-2 mb-2"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable details */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandInvestor(investor.id)}
                    >
                      <span>Ver más detalles</span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          expandedInvestor === investor.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedInvestor === investor.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="mb-3">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Notas:
                          </span>
                          <p className="text-dark">{investor.notes}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button className="btn btn-light-primary font-weight-bold">
                            Historial
                          </button>
                          <button className="btn btn-primary font-weight-bold">
                            Contactar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                  <button className="btn btn-light-info font-weight-bold">
                    Documentos
                  </button>
                  <button className="btn btn-primary font-weight-bold">
                    Nueva Inversión
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
                    <th className="min-w-200px">Cliente</th>
                    <th className="min-w-150px">Contacto</th>
                    <th className="min-w-120px">Tipo</th>
                    <th className="min-w-100px">Segmento</th>
                    <th className="min-w-120px">Inversión Total</th>
                    <th className="min-w-100px">Proyectos</th>
                    <th className="min-w-150px">Última Inversión</th>
                    <th className="min-w-100px">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestors.map((investor) => (
                    <tr key={investor.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {/*  <div className="symbol symbol-40 symbol-circle mr-4">
                            <img
                              src={investor.avatar}
                              alt={investor.name}
                              className="h-100 align-self-end"
                            />
                          </div> */}
                          <div>
                            <span className="text-dark font-weight-bolder d-block">
                              {investor.name}
                            </span>
                            <span
                              className={`label label-${
                                investor.status === "Activo"
                                  ? "success"
                                  : "warning"
                              } label-inline font-weight-bold`}
                            >
                              {investor.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href={`mailto:${investor.email}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {investor.email}
                        </a>
                        <span className="text-muted">{investor.phone}</span>
                      </td>
                      <td>
                        <span className="text-muted font-weight-bold">
                          {investor.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getSegmentColor(investor.segment),
                            color: "#fff",
                          }}
                        >
                          {investor.segment}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {formatCurrency(investor.totalInvestment)}
                        </span>
                      </td>
                      <td>
                        <span className="text-primary font-weight-bolder">
                          {investor.projects}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bold">
                          {formatDate(investor.lastInvestment)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                            onClick={() => toggleFavorite(investor.id)}
                          >
                            {favorites.includes(investor.id) ? (
                              <Star style={{ color: "#FFA800" }} />
                            ) : (
                              <StarBorder style={{ color: "#B5B5C3" }} />
                            )}
                          </button>
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                            onClick={() => toggleExpandInvestor(investor.id)}
                          >
                            <ExpandMore
                              className={`transition ${
                                expandedInvestor === investor.id
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
      {filteredInvestors.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron clientes
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intente ajustar sus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
                setSegmentFilter("all");
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumen por tipo de cliente */}
      <div className="card card-custom mt-8">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              Distribución por Tipo de Cliente
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
                    {item.count} {item.count === 1 ? "cliente" : "clientes"}
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

export default InvestorsListPage;

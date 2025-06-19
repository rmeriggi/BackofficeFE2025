import {
  AccountBalance,
  Add,
  ArrowBack,
  Assessment,
  BarChart,
  Business,
  CloudDownload,
  Description,
  Domain,
  /*   Download, */
  Edit,
  ExpandMore,
  FilterList,
  MonetizationOn,
  MoreVert,
  Print,
  Public,
  Search,
  Star,
  StarBorder,
  TableChart,
} from "@material-ui/icons";
import React, { useState } from "react";
import { depositaryCompaniesData } from "../mocks/depositaries";

// Mock data para sociedades depositarias
const DepositaryCompaniesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("cards");

  const toggleExpandCompany = (id) => {
    if (expandedCompany === id) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredCompanies = depositaryCompaniesData.filter((company) => {
    const categoryMatch =
      activeFilter === "all" ||
      (activeFilter === "featured" && company.isFeatured) ||
      activeFilter === company.category.toLowerCase();

    const statusMatch =
      statusFilter === "all" || statusFilter === company.status.toLowerCase();

    const typeMatch =
      typeFilter === "all" || typeFilter === company.type.toLowerCase();

    const searchMatch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.legalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.cuit.includes(searchQuery) ||
      company.registrationNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      company.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return categoryMatch && statusMatch && typeMatch && searchMatch;
  });

  // Calcular estadísticas
  const totalCompanies = depositaryCompaniesData.length;
  const totalAssets = depositaryCompaniesData.reduce(
    (sum, company) => sum + company.financials.totalAssets,
    0
  );
  const totalManagedFunds = depositaryCompaniesData.reduce(
    (sum, company) => sum + company.financials.managedFunds,
    0
  );
  const activeCompanies = depositaryCompaniesData.filter(
    (company) => company.status === "Activa"
  ).length;
  /*   const featuredCompanies = depositaryCompaniesData.filter(
    (company) => company.isFeatured
  ).length; */

  // Contar por categoría
  const categories = [
    ...new Set(depositaryCompaniesData.map((company) => company.category)),
  ];
  const categoryCounts = categories.map((category) => ({
    category,
    count: depositaryCompaniesData.filter(
      (company) => company.category === category
    ).length,
  }));

  // Obtener icono por tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case "Nacional":
        return <Business style={{ fontSize: 30, color: "#3699FF" }} />;
      case "Internacional":
        return <Public style={{ fontSize: 30, color: "#8950FC" }} />;
      case "Regional":
        return <Domain style={{ fontSize: 30, color: "#1BC5BD" }} />;
      default:
        return <Business style={{ fontSize: 30, color: "#3699FF" }} />;
      /* return <CorporateFare style={{ fontSize: 30, color: "#FFA800" }} />; */
    }
  };

  // Obtener color basado en la categoría
  const getCategoryColor = (category) => {
    switch (category) {
      case "A":
        return "#0BB783";
      case "B":
        return "#FFA800";
      case "C":
        return "#F64E60";
      default:
        return "#7E8299";
    }
  };

  // Obtener color basado en el estado
  const getStatusColor = (status) => {
    switch (status) {
      case "Activa":
        return "#0BB783";
      case "Suspendida":
        return "#F64E60";
      case "Pendiente":
        return "#FFA800";
      default:
        return "#7E8299";
    }
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
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
                  Sociedades Depositarias
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-lg">
                Gestión integral de sociedades depositarias autorizadas
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <BarChart className="mr-2" /> Análisis de Mercado
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" /> Nueva Sociedad
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
                  Sociedades Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-primary">
                  {totalCompanies}
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
                  Activos Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-success">
                  {formatCurrency(totalAssets)}
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
                  Fondos Gestionados
                </div>
                <div className="font-size-h3 font-weight-bolder text-warning">
                  {formatCurrency(totalManagedFunds)}
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
                  Activas
                </div>
                <div className="font-size-h3 font-weight-bolder text-info">
                  {activeCompanies}
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
                  <input type="radio" name="options" /> Todas
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    activeFilter === "featured" ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter("featured")}
                >
                  <input type="radio" name="options" /> Destacadas
                </label>
                {categories.map((category) => (
                  <label
                    key={category}
                    className={`btn btn-outline-secondary font-weight-bold ${
                      activeFilter === category.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(category.toLowerCase())}
                  >
                    <input type="radio" name="options" /> Categoría {category}
                  </label>
                ))}
              </div>

              {/* Filtro por estado */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los Estados</option>
                  <option value="activa">Activa</option>
                  <option value="suspendida">Suspendida</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              {/* Filtro por tipo */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Todos los Tipos</option>
                  <option value="nacional">Nacional</option>
                  <option value="internacional">Internacional</option>
                  <option value="regional">Regional</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar sociedad, CUIT, servicios..."
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
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="col-xl-6 col-xxl-4 col-lg-6 col-md-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  company.isFeatured
                    ? "border-left-warning"
                    : company.category === "A"
                    ? "border-left-success"
                    : company.category === "B"
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
                          {getTypeIcon(company.type)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {company.name}
                        </h4>
                        <div className="d-flex align-items-center mt-1">
                          <span
                            className="label label-sm label-inline font-weight-bold"
                            style={{
                              backgroundColor: getCategoryColor(
                                company.category
                              ),
                              color: "#fff",
                            }}
                          >
                            Categoría {company.category}
                          </span>
                          <span
                            className="label label-sm label-inline font-weight-bold ml-2"
                            style={{
                              backgroundColor: getStatusColor(company.status),
                              color: "#fff",
                            }}
                          >
                            {company.status}
                          </span>
                          {company.isFeatured && (
                            <span className="label label-sm label-warning label-inline font-weight-bold ml-2">
                              Destacada
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                        onClick={() => toggleFavorite(company.id)}
                      >
                        {favorites.includes(company.id) ? (
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
                                  Editar Sociedad
                                </span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Reportes</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Auditorías</span>
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
                          href={`mailto:${company.contactInfo.email}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {company.contactInfo.email}
                        </a>
                        <a
                          href={`tel:${company.contactInfo.phone}`}
                          className="text-dark text-hover-primary"
                        >
                          {company.contactInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        CUIT:
                      </span>
                      <span className="text-dark font-weight-bold">
                        {company.cuit}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <span className="text-muted font-weight-bold mr-4">
                        Registro:
                      </span>
                      <span className="text-dark font-weight-bold">
                        {company.registrationNumber}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Activos Totales
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {formatCurrency(company.financials.totalAssets)}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Fondos Gestionados
                        </span>
                        <span className="text-success font-weight-bolder font-size-h5">
                          {formatCurrency(company.financials.managedFunds)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Clientes
                        </span>
                        <span className="text-primary font-weight-bolder font-size-h5">
                          {company.clients}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Fondos
                        </span>
                        <span className="text-info font-weight-bolder font-size-h5">
                          {company.funds}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Servicios */}
                  <div className="mb-5">
                    <span className="text-muted font-weight-bold d-block mb-2">
                      Servicios:
                    </span>
                    <div className="d-flex flex-wrap">
                      {company.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="label label-light-info label-inline font-weight-bold mr-2 mb-2"
                        >
                          {service}
                        </span>
                      ))}
                      {company.services.length > 3 && (
                        <span className="label label-light-warning label-inline font-weight-bold mr-2 mb-2">
                          +{company.services.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable details */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandCompany(company.id)}
                    >
                      <span>
                        {expandedCompany === company.id
                          ? "Ver menos detalles"
                          : "Ver más detalles"}
                      </span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          expandedCompany === company.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedCompany === company.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="row mb-4">
                          <div className="col-6">
                            <span className="text-muted font-weight-bold d-block mb-2">
                              CEO:
                            </span>
                            <span className="text-dark">
                              {company.management.ceo}
                            </span>
                          </div>
                          <div className="col-6">
                            <span className="text-muted font-weight-bold d-block mb-2">
                              Compliance:
                            </span>
                            <span className="text-dark">
                              {company.management.compliance}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Certificaciones:
                          </span>
                          <div className="d-flex flex-wrap">
                            {company.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="label label-light-success label-inline font-weight-bold mr-2 mb-2"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-muted font-weight-bold d-block mb-2">
                            Próxima Auditoría:
                          </span>
                          <span className="text-dark font-weight-bold">
                            {formatDate(company.nextAudit)}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button className="btn btn-light-primary font-weight-bold">
                            <Assessment className="mr-2" />
                            Auditorías
                          </button>
                          <button className="btn btn-primary font-weight-bold">
                            <Edit className="mr-2" />
                            Editar
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
                  <button className="btn btn-primary font-weight-bold">
                    <Add className="mr-2" />
                    Nueva Cuenta
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
                    <th className="min-w-200px">Sociedad</th>
                    <th className="min-w-150px">Contacto</th>
                    <th className="min-w-100px">Categoría</th>
                    <th className="min-w-100px">Estado</th>
                    <th className="min-w-120px">Activos Totales</th>
                    <th className="min-w-120px">Fondos Gestionados</th>
                    <th className="min-w-100px">Clientes</th>
                    <th className="min-w-100px">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-circle mr-4">
                            <span className="symbol-label bg-light-primary">
                              {getTypeIcon(company.type)}
                            </span>
                          </div>
                          <div>
                            <span className="text-dark font-weight-bolder d-block">
                              {company.name}
                            </span>
                            <span className="text-muted font-weight-bold">
                              {company.cuit}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href={`mailto:${company.contactInfo.email}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {company.contactInfo.email}
                        </a>
                        <span className="text-muted">
                          {company.contactInfo.phone}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getCategoryColor(company.category),
                            color: "#fff",
                          }}
                        >
                          Categoría {company.category}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getStatusColor(company.status),
                            color: "#fff",
                          }}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {formatCurrency(company.financials.totalAssets)}
                        </span>
                      </td>
                      <td>
                        <span className="text-success font-weight-bolder d-block">
                          {formatCurrency(company.financials.managedFunds)}
                        </span>
                      </td>
                      <td>
                        <span className="text-primary font-weight-bolder">
                          {company.clients}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                            onClick={() => toggleFavorite(company.id)}
                          >
                            {favorites.includes(company.id) ? (
                              <Star style={{ color: "#FFA800" }} />
                            ) : (
                              <StarBorder style={{ color: "#B5B5C3" }} />
                            )}
                          </button>
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                            onClick={() => toggleExpandCompany(company.id)}
                          >
                            <ExpandMore
                              className={`transition ${
                                expandedCompany === company.id
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
      {filteredCompanies.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron sociedades
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intente ajustar sus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
                setStatusFilter("all");
                setTypeFilter("all");
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
                  <span
                    className="symbol-label"
                    style={{ backgroundColor: getCategoryColor(item.category) }}
                  >
                    <span className="text-white font-weight-bold">
                      {item.category}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-dark font-weight-bolder">
                    Categoría {item.category}
                  </span>
                  <div className="text-muted font-weight-bold">
                    {item.count} {item.count === 1 ? "sociedad" : "sociedades"}
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

export default DepositaryCompaniesPage;

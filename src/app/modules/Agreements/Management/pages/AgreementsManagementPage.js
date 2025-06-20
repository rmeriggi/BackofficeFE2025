/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Add,
  CheckCircle,
  CloudDownload,
  Edit,
  FilterList,
  GridOn,
  List,
  MoreVert,
  Print,
  Refresh,
  Schedule,
  Search,
  Settings,
  Share,
  Visibility,
  Warning,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { agreementsManagementMock } from "../../__mocks__/agreementsManagementMock";

const AgreementsManagementPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "Todos",
    clientType: "Todos",
    riskLevel: "Todos",
    approvalStatus: "Todos",
    branch: "Todas",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setData(agreementsManagementMock);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Alto":
        return "#F64E60";
      case "Medio":
        return "#FFA800";
      case "Bajo":
        return "#1BC5BD";
      default:
        return "#3699FF";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Activo":
        return "#1BC5BD";
      case "En Revisión":
        return "#FFA800";
      case "Pendiente Renovación":
        return "#8950FC";
      case "Vencido":
        return "#F64E60";
      default:
        return "#3699FF";
    }
  };

  const getApprovalColor = (status) => {
    switch (status) {
      case "Aprobado":
        return "#1BC5BD";
      case "Pendiente":
        return "#FFA800";
      case "Rechazado":
        return "#F64E60";
      default:
        return "#3699FF";
    }
  };

  // Filtrar y buscar datos
  const filteredData =
    data?.agreements.filter((agreement) => {
      const matchesSearch =
        agreement.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.agreementNumber.includes(searchTerm) ||
        agreement.accountNumber.includes(searchTerm);

      const matchesStatus =
        filters.status === "Todos" ||
        agreement.agreementStatus === filters.status;
      const matchesClientType =
        filters.clientType === "Todos" ||
        agreement.clientType === filters.clientType;
      const matchesRiskLevel =
        filters.riskLevel === "Todos" ||
        agreement.riskLevel === filters.riskLevel;
      const matchesApprovalStatus =
        filters.approvalStatus === "Todos" ||
        agreement.approvalStatus === filters.approvalStatus;
      const matchesBranch =
        filters.branch === "Todas" || agreement.branch === filters.branch;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClientType &&
        matchesRiskLevel &&
        matchesApprovalStatus &&
        matchesBranch
      );
    }) || [];

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  if (loading && !data) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="alert alert-danger">Error al cargar los datos</div>;
  }

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Gestión de Acuerdos
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Administración y control de acuerdos en cuenta corriente
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-6">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-white bg-opacity-20">
                    <i className="fas fa-cogs text-white"></i>
                  </span>
                </div>
                <div>
                  <div className="text-white-75 font-size-sm">
                    Última actualización
                  </div>
                  <div className="text-white font-weight-bold">
                    {lastUpdate.toLocaleTimeString("es-AR")}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleRefresh}
                disabled={loading}
              >
                <Refresh
                  className={loading ? "spinner-border spinner-border-sm" : ""}
                />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Share />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Print />
              </button>
              <button className="btn btn-light btn-icon">
                <Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas y filtros */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Acuerdos para Gestión
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Revisa y gestiona los acuerdos activos y pendientes
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <CloudDownload className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" />
                Nuevo Acuerdo
              </button>
            </div>
          </div>
        </div>

        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <i
                    className="fas fa-file-contract"
                    style={{ fontSize: 24, color: "#8950FC" }}
                  ></i>
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Acuerdos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.totalAgreements}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <CheckCircle style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Acuerdos Activos
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.activeAgreements}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <Schedule style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Pendientes Renovación
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.pendingRenewal}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <Warning style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Pendientes Aprobación
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.pendingApproval}
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
                    filters.status === "Todos" ? "active" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, status: "Todos" })}
                >
                  <input type="radio" name="status" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Activos" ? "active" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, status: "Activos" })}
                >
                  <input type="radio" name="status" /> Activos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "En Revisión" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "En Revisión" })
                  }
                >
                  <input type="radio" name="status" /> En Revisión
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Pendiente Renovación" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "Pendiente Renovación" })
                  }
                >
                  <input type="radio" name="status" /> Renovación
                </label>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar por cliente, número de acuerdo o cuenta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <Search style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
              >
                {viewMode === "grid" ? <List /> : <GridOn />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de registros */}
      {viewMode === "grid" ? (
        <>
          <div className="row">
            {currentItems.map((agreement) => (
              <div
                key={agreement.id}
                className="col-xl-6 col-xxl-4 col-md-6 col-sm-12 mb-8"
              >
                <div
                  className={`card card-custom gutter-b shadow-sm ${
                    agreement.riskLevel === "Alto"
                      ? "border-left-danger"
                      : agreement.riskLevel === "Medio"
                      ? "border-left-warning"
                      : "border-left-primary"
                  }`}
                  style={{ borderLeftWidth: "4px" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-5">
                          <span className="symbol-label">
                            <i
                              className="fas fa-file-contract"
                              style={{ fontSize: 30, color: "#3699FF" }}
                            ></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-dark font-weight-bolder mb-0">
                            {agreement.clientName}
                            {agreement.riskLevel === "Alto" && (
                              <span className="label label-sm label-danger label-inline ml-2">
                                Alto Riesgo
                              </span>
                            )}
                          </h4>
                          <span className="text-muted font-weight-bold">
                            {agreement.agreementNumber} | {agreement.clientType}
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
                                <span className="navi-text">Editar</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">Renovar</span>
                              </a>
                            </li>
                            <li className="navi-item">
                              <a href="#" className="navi-link">
                                <span className="navi-text">
                                  Aprobar/Rechazar
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="d-flex align-items-center mr-10 mb-2">
                          <div className="mr-2">
                            <span className="text-dark font-weight-bolder">
                              Cuenta:
                            </span>
                            <span className="text-muted ml-2">
                              {agreement.accountNumber}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center mr-10 mb-2">
                          <div className="mr-2">
                            <span className="text-dark font-weight-bolder">
                              Sucursal:
                            </span>
                            <span className="text-muted ml-2">
                              {agreement.branch}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Monto Acordado
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            {formatCurrency(agreement.agreementAmount)}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Saldo Actual
                          </span>
                          <span
                            className={`font-weight-bolder font-size-h5 ${
                              agreement.currentBalance < 0
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {formatCurrency(agreement.currentBalance)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Utilización
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            {formatPercentage(agreement.utilizationRate)}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="text-muted font-weight-bold mb-1">
                            Renovaciones
                          </span>
                          <span className="text-dark font-weight-bolder font-size-h5">
                            {agreement.renewalCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getRiskColor(agreement.riskLevel),
                          }}
                        >
                          <span className="text-white d-flex align-items-center">
                            <div
                              className="bg-white mr-2 rounded-circle"
                              style={{ width: 8, height: 8 }}
                            ></div>
                            {agreement.riskLevel}
                          </span>
                        </span>
                      </div>

                      <div>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getApprovalColor(
                              agreement.approvalStatus
                            ),
                          }}
                        >
                          <span className="text-white font-weight-bold">
                            {agreement.approvalStatus}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <span className="text-muted font-weight-bold mr-2">
                          Estado:
                        </span>
                        <span
                          className="label label-lg label-inline"
                          style={{
                            backgroundColor: getStatusColor(
                              agreement.agreementStatus
                            ),
                          }}
                        >
                          <span className="text-white font-weight-bold">
                            {agreement.agreementStatus}
                          </span>
                        </span>
                      </div>

                      <div>
                        <span className="text-muted font-weight-bold mr-2">
                          Vence:
                        </span>
                        <span className="text-dark font-weight-bolder">
                          {new Date(agreement.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-0 d-flex justify-content-between pt-0 pb-6 px-6">
                    <button className="btn btn-light-primary font-weight-bold">
                      <Visibility className="mr-2" />
                      Ver detalles
                    </button>
                    <button className="btn btn-primary font-weight-bold">
                      <Edit className="mr-2" />
                      Gestionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Vista de lista */}
          <div className="card card-custom gutter-b">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-head-custom table-vertical-center overflow-hidden">
                  <thead>
                    <tr>
                      <th className="pl-7">
                        <span className="text-dark-75">Acuerdo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Cliente</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Monto</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Saldo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Utilización</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Estado</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Aprobación</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Riesgo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((agreement) => (
                      <tr key={agreement.id} className="border-bottom">
                        <td className="pl-7">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                <i
                                  className="fas fa-file-contract"
                                  style={{ fontSize: 20, color: "#3699FF" }}
                                ></i>
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="text-dark font-weight-bolder">
                                  {agreement.agreementNumber}
                                </span>
                                {agreement.riskLevel === "Alto" && (
                                  <span className="label label-sm label-danger label-inline ml-2">
                                    Alto Riesgo
                                  </span>
                                )}
                              </div>
                              <span className="text-muted font-weight-bold">
                                {agreement.accountNumber}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="text-dark font-weight-bolder">
                              {agreement.clientName}
                            </span>
                            <div className="text-muted font-weight-bold">
                              {agreement.clientType} • {agreement.branch}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {formatCurrency(agreement.agreementAmount)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`font-weight-bolder ${
                              agreement.currentBalance < 0
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {formatCurrency(agreement.currentBalance)}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {formatPercentage(agreement.utilizationRate)}
                          </span>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{
                              backgroundColor: getStatusColor(
                                agreement.agreementStatus
                              ),
                            }}
                          >
                            <span className="text-white font-weight-bold">
                              {agreement.agreementStatus}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{
                              backgroundColor: getApprovalColor(
                                agreement.approvalStatus
                              ),
                            }}
                          >
                            <span className="text-white font-weight-bold">
                              {agreement.approvalStatus}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span
                            className="label label-lg label-inline"
                            style={{
                              backgroundColor: getRiskColor(
                                agreement.riskLevel
                              ),
                            }}
                          >
                            <span className="text-white font-weight-bold">
                              {agreement.riskLevel}
                            </span>
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button className="btn btn-sm btn-light-primary mr-2">
                              <Visibility />
                            </button>
                            <button className="btn btn-sm btn-light-warning">
                              <Edit />
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
        </>
      )}

      {/* Sin resultados */}
      {filteredData.length === 0 && (
        <div className="card card-custom gutter-b">
          <div className="card-body d-flex flex-column align-items-center py-20">
            <div className="symbol symbol-100 symbol-light-primary mb-5">
              <span className="symbol-label">
                <Search style={{ fontSize: 50, color: "#3699FF" }} />
              </span>
            </div>
            <h3 className="text-dark font-weight-bolder mb-2">
              No se encontraron acuerdos
            </h3>
            <p className="text-muted font-weight-bold mb-10">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => {
                setSearchTerm("");
                setFilters({
                  status: "Todos",
                  clientType: "Todos",
                  riskLevel: "Todos",
                  approvalStatus: "Todos",
                  branch: "Todas",
                });
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}

      {/* Paginación */}
      {filteredData.length > 0 && (
        <div className="card card-custom mt-8">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="text-muted font-weight-bold mr-4">
                Mostrando {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredData.length)} de{" "}
                {filteredData.length} acuerdos
              </span>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-icon btn-sm btn-light mr-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="text-dark font-weight-bold mx-3">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="btn btn-icon btn-sm btn-light ml-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgreementsManagementPage;

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  CloudDownload as CloudDownloadIcon,
  FilterList as FilterListIcon,
  GridOn,
  Home as HomeIcon,
  Landscape as LandscapeIcon,
  List,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSubheader } from "../../../../../_metronic/layout";
import Pagination from "../../../../components/Pagination";
import { mortgagesMock } from "../../__mocks__/mortgagesMock";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#f3f6f9",
    minHeight: "100vh",
  },
  header: {
    background: "linear-gradient(135deg, #3699FF 0%, #1BC5BD 100%)",
    color: "white",
    marginBottom: theme.spacing(3),
    borderRadius: "12px",
  },
  headerContent: {
    padding: theme.spacing(3),
  },
  metricCard: {
    height: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  metricValue: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  metricChange: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
  },
  positiveChange: {
    color: "#1BC5BD",
  },
  negativeChange: {
    color: "#F64E60",
  },
  neutralChange: {
    color: "#7E8299",
  },
  chartCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
  },
  alertCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    marginBottom: theme.spacing(2),
  },
  alertWarning: {
    borderLeft: "4px solid #FFA800",
    backgroundColor: "#FFF4DE",
  },
  alertInfo: {
    borderLeft: "4px solid #3699FF",
    backgroundColor: "#E1F0FF",
  },
  alertSuccess: {
    borderLeft: "4px solid #1BC5BD",
    backgroundColor: "#E8FFF3",
  },
  mortgageCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "none",
    marginBottom: theme.spacing(2),
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  statusApproved: {
    backgroundColor: "#E8FFF3",
    color: "#1BC5BD",
  },
  statusPending: {
    backgroundColor: "#FFF4DE",
    color: "#FFA800",
  },
  statusRejected: {
    backgroundColor: "#FFE2E5",
    color: "#F64E60",
  },
  riskLow: {
    backgroundColor: "#E8FFF3",
    color: "#1BC5BD",
  },
  riskMedium: {
    backgroundColor: "#FFF4DE",
    color: "#FFA800",
  },
  riskHigh: {
    backgroundColor: "#FFE2E5",
    color: "#F64E60",
  },
  viewButton: {
    backgroundColor: "#3699FF",
    color: "white",
    "&:hover": {
      backgroundColor: "#187DE4",
    },
  },
  approveButton: {
    backgroundColor: "#1BC5BD",
    color: "white",
    "&:hover": {
      backgroundColor: "#0BB783",
    },
  },
  rejectButton: {
    backgroundColor: "#F64E60",
    color: "white",
    "&:hover": {
      backgroundColor: "#EE2D42",
    },
  },
}));

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
  className,
}) => {
  const classes = useStyles();

  const getChangeColor = (change) => {
    if (change > 0) return classes.positiveChange;
    if (change < 0) return classes.negativeChange;
    return classes.neutralChange;
  };

  const formatValue = (value) => {
    if (typeof value === "number") {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  return (
    <Card className={`${classes.metricCard} ${className}`}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography className={classes.metricValue} style={{ color }}>
              {formatValue(value)}
            </Typography>
            {change !== undefined && (
              <Box
                className={`${classes.metricChange} ${getChangeColor(change)}`}
              >
                <Typography variant="body2">
                  {change > 0 ? "+" : ""}
                  {change}% {changeLabel}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            style={{
              backgroundColor: `${color}20`,
              borderRadius: "50%",
              padding: "12px",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const AlertCard = ({ alert }) => {
  const classes = useStyles();

  const getAlertClass = (type) => {
    switch (type) {
      case "warning":
        return classes.alertWarning;
      case "info":
        return classes.alertInfo;
      case "success":
        return classes.alertSuccess;
      default:
        return classes.alertInfo;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <WarningIcon style={{ color: "#FFA800" }} />;
      case "info":
        return <AccountBalanceIcon style={{ color: "#3699FF" }} />;
      case "success":
        return <CheckCircleIcon style={{ color: "#1BC5BD" }} />;
      default:
        return <AccountBalanceIcon style={{ color: "#3699FF" }} />;
    }
  };

  return (
    <Card className={`${classes.alertCard} ${getAlertClass(alert.type)}`}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box marginRight={2}>{getAlertIcon(alert.type)}</Box>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {alert.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {alert.message}
            </Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
              <Typography variant="body2" style={{ fontWeight: 600 }}>
                {alert.count} hipotecas
              </Typography>
              <Typography
                variant="body2"
                style={{ marginLeft: "auto", fontWeight: 600 }}
              >
                ${(alert.amount / 1000000).toFixed(1)}M
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const MortgageCard = ({ mortgage, onView, onApprove, onReject }) => {
  const classes = useStyles();

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return classes.statusApproved;
      case "pending":
        return classes.statusPending;
      case "rejected":
        return classes.statusRejected;
      default:
        return classes.statusPending;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Aprobada";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazada";
      default:
        return "Pendiente";
    }
  };

  const getRiskClass = (score) => {
    if (score >= 80) return classes.riskLow;
    if (score >= 60) return classes.riskMedium;
    return classes.riskHigh;
  };

  const getRiskText = (score) => {
    if (score >= 80) return "Bajo";
    if (score >= 60) return "Medio";
    return "Alto";
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "Casa":
        return <HomeIcon style={{ color: "#3699FF" }} />;
      case "Departamento":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      case "Terreno":
        return <LandscapeIcon style={{ color: "#FFA800" }} />;
      default:
        return <HomeIcon style={{ color: "#7E8299" }} />;
    }
  };

  return (
    <Card className={classes.mortgageCard}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar style={{ backgroundColor: "#E1E3EA", marginRight: 12 }}>
              {getPropertyTypeIcon(mortgage.propertyType)}
            </Avatar>
            <Box>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {mortgage.clientName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {mortgage.propertyType} • ID: {mortgage.id}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={getStatusText(mortgage.status)}
              className={getStatusClass(mortgage.status)}
              size="small"
            />
            <Chip
              label={`Riesgo: ${getRiskText(mortgage.riskScore)}`}
              className={getRiskClass(mortgage.riskScore)}
              size="small"
            />
          </Box>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Monto Solicitado
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: 600, color: "#3699FF" }}
            >
              ${(mortgage.amount / 1000000).toFixed(2)}M
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Propósito
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {mortgage.purpose}
            </Typography>
          </Grid>
        </Grid>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="body2" color="textSecondary">
            Fecha de solicitud:{" "}
            {new Date(mortgage.requestDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tiempo de procesamiento: {mortgage.processingTime} días
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              className={classes.viewButton}
              startIcon={<VisibilityIcon style={{ fontSize: 16 }} />}
              onClick={() => onView(mortgage)}
              style={{
                fontSize: "0.75rem",
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Ver
            </Button>
            {mortgage.status === "pending" && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.approveButton}
                  startIcon={<ThumbUpIcon style={{ fontSize: 16 }} />}
                  onClick={() => onApprove(mortgage)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    minWidth: "auto",
                  }}
                >
                  Aprobar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.rejectButton}
                  startIcon={<ThumbDownIcon style={{ fontSize: 16 }} />}
                  onClick={() => onReject(mortgage)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    minWidth: "auto",
                  }}
                >
                  Rechazar
                </Button>
              </>
            )}
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ fontSize: "0.75rem" }}
          >
            Score: {mortgage.riskScore}/100
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const MortgagesPage = () => {
  const classes = useStyles();
  const subheader = useSubheader();
  const [data, setData] = useState(mortgagesMock);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [, /* selectedMortgage */ setSelectedMortgage] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: "Todos",
    propertyType: "Todos",
    riskRange: "Todos",
    amountRange: "Todos",
    searchQuery: "",
  });

  subheader.setTitle("Gestión de Hipotecas");

  useEffect(() => {
    setData(mortgagesMock);
  }, []);

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleView = (mortgage) => {
    setSelectedMortgage(mortgage);
  };

  const handleApprove = (mortgage) => {
    // Aquí se implementaría la lógica de aprobación
    console.log("Aprobar hipoteca:", mortgage.id);
  };

  const handleReject = (mortgage) => {
    // Aquí se implementaría la lógica de rechazo
    console.log("Rechazar hipoteca:", mortgage.id);
  };

  const filteredMortgages = data.mortgages.filter((mortgage) => {
    const statusMatch =
      filters.status === "Todos" ||
      (filters.status === "Aprobadas" && mortgage.status === "approved") ||
      (filters.status === "Pendientes" && mortgage.status === "pending") ||
      (filters.status === "Rechazadas" && mortgage.status === "rejected");

    const propertyTypeMatch =
      filters.propertyType === "Todos" ||
      mortgage.propertyType === filters.propertyType;

    const searchMatch =
      filters.searchQuery === "" ||
      mortgage.clientName
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      mortgage.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      mortgage.purpose
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return statusMatch && propertyTypeMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredMortgages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMortgages = filteredMortgages.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Configuración de gráficos
  const statusChartOptions = {
    chart: {
      type: "donut",
      height: 300,
    },
    labels: ["Aprobadas", "Pendientes"],
    colors: ["#1BC5BD", "#FFA800"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val.toFixed(1) + "%";
      },
    },
  };

  const statusChartSeries = [
    data.byStatus.approved.percentage,
    data.byStatus.pending.percentage,
  ];

  const propertyTypeChartOptions = {
    chart: {
      type: "bar",
      height: 300,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Casa", "Departamento", "Terreno"],
    },
    yaxis: {
      title: {
        text: "Cantidad",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + " hipotecas";
        },
      },
    },
    colors: ["#3699FF", "#1BC5BD", "#FFA800"],
  };

  const propertyTypeChartSeries = [
    {
      name: "Cantidad",
      data: [
        data.byPropertyType.casa.count,
        data.byPropertyType.departamento.count,
        data.byPropertyType.terreno.count,
      ],
    },
  ];

  // Funciones para la tabla
  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Aprobada";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazada";
      default:
        return "Pendiente";
    }
  };

  const getRiskText = (score) => {
    if (score >= 80) return "Bajo";
    if (score >= 60) return "Medio";
    return "Alto";
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case "Casa":
        return <HomeIcon style={{ color: "#3699FF" }} />;
      case "Departamento":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      case "Terreno":
        return <LandscapeIcon style={{ color: "#FFA800" }} />;
      default:
        return <HomeIcon style={{ color: "#7E8299" }} />;
    }
  };

  return (
    <div className={classes.root}>
      {/* Header */}
      <Card className={classes.header}>
        <div className={classes.headerContent}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                Gestión de Hipotecas
              </Typography>
              <Typography variant="body1" style={{ opacity: 0.9 }}>
                Administración y decisión de otorgamiento de hipotecas con
                garantía propietaria
              </Typography>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Última actualización: {lastUpdate.toLocaleTimeString()}
                </Typography>
                <IconButton onClick={handleRefresh} style={{ color: "white" }}>
                  <RefreshIcon />
                </IconButton>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  Nueva Hipoteca
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Card>

      {/* Filtros y Búsqueda */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Hipotecas Disponibles
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Explora y gestiona las hipotecas con garantía propietaria
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <CloudDownloadIcon className="mr-2" />
                Exportar
              </button>
              <button className="btn btn-primary font-weight-bold">
                <AddIcon className="mr-2" />
                Nueva Hipoteca
              </button>
            </div>
          </div>
        </div>

        <div className="card-body bg-light-info pt-6 pb-4 px-8">
          <div className="d-flex justify-content-between flex-wrap mb-6">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-info mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalanceIcon
                    style={{ fontSize: 24, color: "#8950FC" }}
                  />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Total Hipotecas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.totalMortgages}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <CheckCircleIcon style={{ fontSize: 24, color: "#1BC5BD" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Hipotecas Activas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.activeMortgages}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <WarningIcon style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Pendientes
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.pendingApproval}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-danger mr-4">
                <span className="symbol-label bg-white">
                  <AttachMoneyIcon style={{ fontSize: 24, color: "#F64E60" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Monto Total
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  ${(data.summary.totalAmount / 1000000).toFixed(1)}M
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
                  <input type="radio" name="options" /> Todos
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Aprobadas" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "Aprobadas" })
                  }
                >
                  <input type="radio" name="options" /> Aprobadas
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Pendientes" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "Pendientes" })
                  }
                >
                  <input type="radio" name="options" /> Pendientes
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    filters.status === "Rechazadas" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilters({ ...filters, status: "Rechazadas" })
                  }
                >
                  <input type="radio" name="options" /> Rechazadas
                </label>
              </div>

              {/* Select para tipo de propiedad */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filters.propertyType}
                  onChange={(e) =>
                    setFilters({ ...filters, propertyType: e.target.value })
                  }
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Casa">Casa</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, ID o propósito..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                />
                <span>
                  <SearchIcon style={{ color: "#7E8299" }} />
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={() =>
                  setViewMode(viewMode === "cards" ? "table" : "cards")
                }
                title={viewMode === "cards" ? "Vista tabla" : "Vista tarjetas"}
              >
                {viewMode === "cards" ? <List /> : <GridOn />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterListIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de Tarjetas */}
      {viewMode === "cards" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <Grid container spacing={3}>
              {currentMortgages.map((mortgage) => (
                <Grid item xs={12} md={6} key={mortgage.id}>
                  <MortgageCard
                    mortgage={mortgage}
                    onView={handleView}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}

      {/* Vista de Tabla */}
      {viewMode === "table" && (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tipo de Propiedad</th>
                    <th>Monto</th>
                    <th>Propósito</th>
                    <th>Estado</th>
                    <th>Riesgo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMortgages.map((mortgage) => (
                    <tr key={mortgage.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-light-info mr-4">
                            <span className="symbol-label">
                              {getPropertyTypeIcon(mortgage.propertyType)}
                            </span>
                          </div>
                          <div>
                            <div className="font-weight-bolder">
                              {mortgage.clientName}
                            </div>
                            <div className="text-muted">ID: {mortgage.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="label label-lg label-light-primary label-inline">
                          {mortgage.propertyType}
                        </span>
                      </td>
                      <td>
                        <span className="font-weight-bolder">
                          ${(mortgage.amount / 1000000).toFixed(2)}M
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">{mortgage.purpose}</span>
                      </td>
                      <td>
                        <span
                          className={`label label-lg ${
                            mortgage.status === "approved"
                              ? "label-light-success"
                              : mortgage.status === "pending"
                              ? "label-light-warning"
                              : "label-light-danger"
                          } label-inline`}
                        >
                          {getStatusText(mortgage.status)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`label label-lg ${
                            mortgage.riskScore >= 80
                              ? "label-light-success"
                              : mortgage.riskScore >= 60
                              ? "label-light-warning"
                              : "label-light-danger"
                          } label-inline`}
                        >
                          {getRiskText(mortgage.riskScore)}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">
                          {new Date(mortgage.requestDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-light-primary mr-2"
                            onClick={() => handleView(mortgage)}
                            title="Ver detalles"
                          >
                            <VisibilityIcon style={{ fontSize: 16 }} />
                          </button>
                          {mortgage.status === "pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-light-success mr-2"
                                onClick={() => handleApprove(mortgage)}
                                title="Aprobar"
                              >
                                <ThumbUpIcon style={{ fontSize: 16 }} />
                              </button>
                              <button
                                className="btn btn-sm btn-light-danger"
                                onClick={() => handleReject(mortgage)}
                                title="Rechazar"
                              >
                                <ThumbDownIcon style={{ fontSize: 16 }} />
                              </button>
                            </>
                          )}
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

      {/* Paginación */}
      <div className="card card-custom gutter-b">
        <div className="card-body">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredMortgages.length}
          />
        </div>
      </div>

      {/* Métricas, Gráficos y Alertas */}
      <Grid container spacing={3}>
        {/* Métricas Secundarias */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Tiempo Promedio"
            value={`${data.performance.averageProcessingTime} días`}
            icon={<AccountBalanceIcon style={{ color: "#8950FC" }} />}
            color="#8950FC"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Tasa de Aprobación"
            value={`${data.performance.approvalRate}%`}
            icon={<CheckCircleIcon style={{ color: "#1BC5BD" }} />}
            color="#1BC5BD"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Score Promedio"
            value={`${data.performance.averageRiskScore}/100`}
            icon={<WarningIcon style={{ color: "#FFA800" }} />}
            color="#FFA800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Monto Aprobado"
            value={`$${(data.summary.approvedAmount / 1000000).toFixed(1)}M`}
            icon={<AttachMoneyIcon style={{ color: "#F64E60" }} />}
            color="#F64E60"
          />
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12} md={6}>
          <Card className={classes.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución por Estado
              </Typography>
              <Chart
                options={statusChartOptions}
                series={statusChartSeries}
                type="donut"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hipotecas por Tipo de Propiedad
              </Typography>
              <Chart
                options={propertyTypeChartOptions}
                series={propertyTypeChartSeries}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Alertas */}
        <Grid item xs={12}>
          <Card className={classes.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alertas del Sistema
              </Typography>
              <Grid container spacing={2}>
                {data.alerts.map((alert) => (
                  <Grid item xs={12} md={4} key={alert.id}>
                    <AlertCard alert={alert} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MortgagesPage;

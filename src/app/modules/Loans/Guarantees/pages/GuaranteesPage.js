import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Paper,
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
  GridOn as GridOnIcon,
  Info as InfoIcon,
  List as ListIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUp as ThumbUpIcon,
  Timeline as TimelineIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSubheader } from "../../../../../_metronic/layout";
import { guaranteesMock } from "../../__mocks__/guaranteesMock";

import Pagination from "../../../../components/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f8fa",
    minHeight: "100vh",
    padding: theme.spacing(3),
  },
  header: {
    background: "#3699FF",
    borderRadius: "12px",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: "white",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255,255,255,0.1)",
      borderRadius: "12px",
    },
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
  },
  metricCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    },
  },
  metricIcon: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing(2),
  },
  chartCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    marginBottom: theme.spacing(3),
  },
  chartHeader: {
    padding: theme.spacing(2, 3),
    borderBottom: "1px solid #eef0f3",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertCard: {
    borderRadius: "12px",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alertWarning: {
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    color: "#856404",
  },
  alertInfo: {
    backgroundColor: "#d1ecf1",
    border: "1px solid #bee5eb",
    color: "#0c5460",
  },
  alertSuccess: {
    backgroundColor: "#d4edda",
    border: "1px solid #c3e6cb",
    color: "#155724",
  },
  alertError: {
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    color: "#721c24",
  },
  guaranteeCard: {
    borderRadius: "12px",
    marginBottom: theme.spacing(2),
    border: "1px solid #eef0f3",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderColor: "#3699FF",
    },
  },
  positiveChange: {
    color: "#0BB783",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
  negativeChange: {
    color: "#F64E60",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
  warningChange: {
    color: "#FFA800",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
  actionCard: {
    borderRadius: "12px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: "1px solid #eef0f3",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderColor: "#3699FF",
    },
  },
  actionIcon: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing(1),
  },
  statusApproved: {
    backgroundColor: "#E8F5E8",
    color: "#2E7D32",
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
    color: "#F57C00",
  },
  statusRejected: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  riskHigh: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  riskMedium: {
    backgroundColor: "#FFF3E0",
    color: "#F57C00",
  },
  riskLow: {
    backgroundColor: "#E8F5E8",
    color: "#2E7D32",
  },
  approveButton: {
    backgroundColor: "#0BB783",
    color: "white",
    "&:hover": {
      backgroundColor: "#0A9B6F",
    },
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 2px 8px rgba(11, 183, 131, 0.3)",
  },
  rejectButton: {
    backgroundColor: "#F64E60",
    color: "white",
    "&:hover": {
      backgroundColor: "#E53E4F",
    },
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 2px 8px rgba(246, 78, 96, 0.3)",
  },
  viewButton: {
    backgroundColor: "#3699FF",
    color: "white",
    "&:hover": {
      backgroundColor: "#2E7DCC",
    },
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 2px 8px rgba(54, 153, 255, 0.3)",
  },
  tableContainer: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    backgroundColor: "#F3F6F9",
    "& th": {
      borderBottom: "2px solid #E1E3EA",
      fontWeight: 600,
      color: "#3F4254",
      padding: "16px 12px",
    },
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#F8F9FA",
    },
    "& td": {
      borderBottom: "1px solid #E1E3EA",
      padding: "16px 12px",
      verticalAlign: "middle",
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
    return classes.warningChange;
  };

  const formatValue = (value) => {
    if (typeof value === "number") {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value.toLocaleString()}`;
    }
    return value;
  };

  return (
    <Card className={`${classes.metricCard} ${className}`}>
      <CardContent style={{ textAlign: "center", padding: "24px" }}>
        <Avatar
          className={classes.metricIcon}
          style={{ backgroundColor: color, margin: "0 auto 16px" }}
        >
          {icon}
        </Avatar>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          style={{ fontWeight: 600 }}
        >
          {formatValue(value)}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        {change !== undefined && (
          <Box className={getChangeColor(change)}>
            {change > 0 ? (
              <TrendingUpIcon fontSize="small" />
            ) : (
              <TrendingDownIcon fontSize="small" />
            )}
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              {change > 0 ? "+" : ""}
              {change.toFixed(2)}% {changeLabel}
            </Typography>
          </Box>
        )}
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
      case "error":
        return classes.alertError;
      default:
        return classes.alertInfo;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <WarningIcon />;
      case "info":
        return <InfoIcon />;
      case "success":
        return <CheckCircleIcon />;
      case "error":
        return <WarningIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Paper className={`${classes.alertCard} ${getAlertClass(alert.type)}`}>
      <Box display="flex" alignItems="center" flex={1}>
        <Box mr={2}>{getAlertIcon(alert.type)}</Box>
        <Box flex={1}>
          <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 4 }}>
            {alert.title}
          </Typography>
          <Typography variant="body2">{alert.message}</Typography>
          <Box mt={1}>
            <Typography variant="body2">
              Cantidad: {alert.count} | Monto: $
              {(alert.amount / 1000000).toFixed(2)}M
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button color="inherit" size="small" variant="outlined">
        Ver Detalles
      </Button>
    </Paper>
  );
};

const GuaranteeCard = ({ guarantee, onView, onApprove, onReject }) => {
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

  const getCompanyTypeIcon = (type) => {
    switch (type) {
      case "PYME":
        return <BusinessIcon style={{ color: "#3699FF" }} />;
      case "Microempresa":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      case "Cooperativa":
        return <BusinessIcon style={{ color: "#FFA800" }} />;
      default:
        return <BusinessIcon style={{ color: "#7E8299" }} />;
    }
  };

  return (
    <Card className={classes.guaranteeCard}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar style={{ backgroundColor: "#E1E3EA", marginRight: 12 }}>
              {getCompanyTypeIcon(guarantee.companyType)}
            </Avatar>
            <Box>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {guarantee.companyName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {guarantee.companyType} • ID: {guarantee.id}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={getStatusText(guarantee.status)}
              className={getStatusClass(guarantee.status)}
              size="small"
            />
            <Chip
              label={`Riesgo: ${getRiskText(guarantee.riskScore)}`}
              className={getRiskClass(guarantee.riskScore)}
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
              ${(guarantee.amount / 1000000).toFixed(2)}M
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Propósito
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {guarantee.purpose}
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
            {new Date(guarantee.requestDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tiempo de procesamiento: {guarantee.processingTime} días
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              className={classes.viewButton}
              startIcon={<VisibilityIcon style={{ fontSize: 16 }} />}
              onClick={() => onView(guarantee)}
              style={{
                fontSize: "0.75rem",
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Ver
            </Button>
            {guarantee.status === "pending" && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.approveButton}
                  startIcon={<ThumbUpIcon style={{ fontSize: 16 }} />}
                  onClick={() => onApprove(guarantee)}
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
                  onClick={() => onReject(guarantee)}
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
            Score: {guarantee.riskScore}/100
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const GuaranteesPage = () => {
  const classes = useStyles();
  const subheader = useSubheader();
  const [data, setData] = useState(guaranteesMock);
  /*   const [lastUpdate, setLastUpdate] = useState(new Date()); */
  const [, /* selectedGuarantee */ setSelectedGuarantee] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: "Todos",
    companyType: "Todos",
    riskRange: "Todos",
    amountRange: "Todos",
    searchQuery: "",
  });

  subheader.setTitle("Gestión de Garantías Recíprocas");

  useEffect(() => {
    setData(guaranteesMock);
  }, []);

  /*   const handleRefresh = () => {
    setLastUpdate(new Date());
  }; */

  const handleView = (guarantee) => {
    setSelectedGuarantee(guarantee);
  };

  const handleApprove = (guarantee) => {
    // Aquí se implementaría la lógica de aprobación
    console.log("Aprobar garantía:", guarantee.id);
  };

  const handleReject = (guarantee) => {
    // Aquí se implementaría la lógica de rechazo
    console.log("Rechazar garantía:", guarantee.id);
  };

  const filteredGuarantees = data.guarantees.filter((guarantee) => {
    const statusMatch =
      filters.status === "Todos" ||
      (filters.status === "Aprobadas" && guarantee.status === "approved") ||
      (filters.status === "Pendientes" && guarantee.status === "pending") ||
      (filters.status === "Rechazadas" && guarantee.status === "rejected");

    const companyTypeMatch =
      filters.companyType === "Todos" ||
      guarantee.companyType === filters.companyType;

    const riskMatch =
      filters.riskRange === "Todos" ||
      (filters.riskRange === "Alto (0-60)" && guarantee.riskScore <= 60) ||
      (filters.riskRange === "Medio (61-80)" &&
        guarantee.riskScore > 60 &&
        guarantee.riskScore <= 80) ||
      (filters.riskRange === "Bajo (81-100)" && guarantee.riskScore > 80);

    const amountMatch =
      filters.amountRange === "Todos" ||
      (filters.amountRange === "0-500k" && guarantee.amount <= 500000) ||
      (filters.amountRange === "500k-1M" &&
        guarantee.amount > 500000 &&
        guarantee.amount <= 1000000) ||
      (filters.amountRange === "1M-2M" &&
        guarantee.amount > 1000000 &&
        guarantee.amount <= 2000000) ||
      (filters.amountRange === "2M+" && guarantee.amount > 2000000);

    const searchMatch =
      guarantee.companyName
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      guarantee.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      guarantee.purpose
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return (
      statusMatch && companyTypeMatch && riskMatch && amountMatch && searchMatch
    );
  });

  // Lógica de paginación
  const totalItems = filteredGuarantees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const registrosPaginados = filteredGuarantees.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Configuración para el gráfico de distribución por estado
  const statusChartOptions = {
    chart: { type: "donut", height: 300 },
    plotOptions: { pie: { donut: { size: "65%" } } },
    labels: ["Aprobadas", "Pendientes"],
    colors: ["#0BB783", "#FFA800"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(1) + "%",
    },
    legend: { position: "bottom", horizontalAlign: "center" },
    tooltip: {
      y: { formatter: (value) => value.toFixed(1) + "%" },
    },
  };

  const statusChartSeries = [
    data.byStatus.approved.percentage,
    data.byStatus.pending.percentage,
  ];

  // Configuración para el gráfico de distribución por tipo de empresa
  const companyTypeChartOptions = {
    chart: { type: "bar", height: 300, toolbar: { show: false } },
    colors: ["#3699FF"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["PYME", "Microempresa", "Cooperativa"],
      labels: { style: { colors: "#7E8299" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(0),
        style: { colors: "#7E8299" },
      },
    },
    grid: { borderColor: "#eff2f5" },
    tooltip: {
      y: { formatter: (value) => value.toFixed(0) },
    },
  };

  const companyTypeChartSeries = [
    {
      name: "Cantidad",
      data: [
        data.byCompanyType.pyme.count,
        data.byCompanyType.microempresa.count,
        data.byCompanyType.cooperativa.count,
      ],
    },
  ];

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

  const getCompanyTypeIcon = (type) => {
    switch (type) {
      case "PYME":
        return <BusinessIcon style={{ color: "#3699FF" }} />;
      case "Microempresa":
        return <BusinessIcon style={{ color: "#0BB783" }} />;
      case "Cooperativa":
        return <BusinessIcon style={{ color: "#FFA800" }} />;
      default:
        return <BusinessIcon style={{ color: "#7E8299" }} />;
    }
  };

  return (
    <div className={classes.root}>
      {/* Filtros y Búsqueda */}
      <div className="card card-custom gutter-b">
        <div className="card-header border-0 py-5">
          <div className="card-title">
            <h3 className="card-label">
              <span className="d-flex align-items-center">
                <span className="text-dark font-weight-bolder">
                  Garantías Disponibles
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-sm">
                Explora y gestiona las garantías recíprocas
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
                Nueva Garantía
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: 16 }}
          className="card-body bg-light-info pt-6 pb-4 px-8"
        >
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
                  Total Garantías
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.totalGuarantees}
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
                  Garantías Activas
                </div>
                <div className="font-size-h4 font-weight-bolder">
                  {data.summary.activeGuarantees}
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

              {/* Select para tipo de empresa */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={filters.companyType}
                  onChange={(e) =>
                    setFilters({ ...filters, companyType: e.target.value })
                  }
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="PYME">PYME</option>
                  <option value="Microempresa">Microempresa</option>
                  <option value="Cooperativa">Cooperativa</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar empresa, ID o propósito..."
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
                {viewMode === "cards" ? <ListIcon /> : <GridOnIcon />}
              </button>
              <button className="btn btn-light btn-icon">
                <FilterListIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Garantías */}
      {viewMode === "cards" ? (
        <div className="card card-custom gutter-b">
          <div className="card-body">
            <Grid container spacing={3}>
              {registrosPaginados.map((guarantee) => (
                <Grid item xs={12} md={6} key={guarantee.id}>
                  <GuaranteeCard
                    guarantee={guarantee}
                    onView={handleView}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      ) : (
        <>
          {/* Tabla con estilo Bootstrap igual a BCRA Archives */}
          <div className="card card-custom gutter-b">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-head-custom table-vertical-center overflow-hidden">
                  <thead>
                    <tr>
                      <th className="pl-7">
                        <span className="text-dark-75">Empresa</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Tipo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Monto</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Estado</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Riesgo</span>
                      </th>
                      <th>
                        <span className="text-dark-75">Fecha</span>
                      </th>
                      <th className="text-right pr-7">
                        <span className="text-dark-75">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosPaginados.map((guarantee) => (
                      <tr key={guarantee.id} className="border-bottom">
                        <td className="pl-7">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40 symbol-light mr-4">
                              <span className="symbol-label">
                                {getCompanyTypeIcon(guarantee.companyType)}
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <span className="text-dark font-weight-bolder">
                                  {guarantee.companyName}
                                </span>
                              </div>
                              <span className="text-muted font-weight-bold">
                                ID: {guarantee.id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {guarantee.companyType}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            ${(guarantee.amount / 1000000).toFixed(2)}M
                          </span>
                        </td>
                        <td>
                          <span
                            className={`label label-lg label-inline ${
                              guarantee.status === "approved"
                                ? "label-light-success"
                                : guarantee.status === "pending"
                                ? "label-light-warning"
                                : "label-light-danger"
                            }`}
                          >
                            {getStatusText(guarantee.status)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`label label-lg label-inline ${
                              guarantee.riskScore >= 80
                                ? "label-light-success"
                                : guarantee.riskScore >= 60
                                ? "label-light-warning"
                                : "label-light-danger"
                            }`}
                          >
                            {getRiskText(guarantee.riskScore)} (
                            {guarantee.riskScore}/100)
                          </span>
                        </td>
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {new Date(
                              guarantee.requestDate
                            ).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="text-right pr-7">
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-icon btn-light-primary btn-sm mr-2"
                              title="Ver"
                              onClick={() => handleView(guarantee)}
                            >
                              <VisibilityIcon style={{ fontSize: 18 }} />
                            </button>
                            {guarantee.status === "pending" && (
                              <>
                                <button
                                  className="btn btn-icon btn-success btn-sm mr-2"
                                  title="Aprobar"
                                  onClick={() => handleApprove(guarantee)}
                                >
                                  <ThumbUpIcon
                                    style={{ fontSize: 18, color: "white" }}
                                  />
                                </button>
                                <button
                                  className="btn btn-icon btn-danger btn-sm"
                                  title="Rechazar"
                                  onClick={() => handleReject(guarantee)}
                                >
                                  <ThumbDownIcon
                                    style={{ fontSize: 18, color: "white" }}
                                  />
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

          {/* Paginación para vista tabla */}
          {totalItems > 0 && (
            <div className="card card-custom mt-8">
              <div className="card-body">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={true}
                  showInfo={true}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Sin resultados */}
      {filteredGuarantees.length === 0 && (
        <Card className={classes.chartCard}>
          <CardContent style={{ textAlign: "center", padding: "80px 24px" }}>
            <SearchIcon
              style={{ fontSize: 64, color: "#7E8299", marginBottom: 16 }}
            />
            <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
              No se encontraron garantías
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginBottom: 24 }}
            >
              Intenta ajustar tus filtros o términos de búsqueda
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setFilters({
                  status: "Todos",
                  companyType: "Todos",
                  riskRange: "Todos",
                  amountRange: "Todos",
                  searchQuery: "",
                })
              }
            >
              Restablecer filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Métricas y Gráficos (movidos abajo) */}
      <Grid container spacing={3} style={{ marginTop: 24 }}>
        {/* Métricas principales */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontWeight: 600, marginBottom: 16 }}
          >
            Métricas Principales
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Garantías"
            value={data.summary.totalGuarantees}
            icon={<AccountBalanceIcon />}
            color="#3699FF"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Garantías Activas"
            value={data.summary.activeGuarantees}
            icon={<CheckCircleIcon />}
            color="#0BB783"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pendientes de Aprobación"
            value={data.summary.pendingApproval}
            icon={<WarningIcon />}
            color="#FFA800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Monto Total"
            value={data.summary.totalAmount}
            icon={<AttachMoneyIcon />}
            color="#1BC5BD"
          />
        </Grid>

        {/* Métricas secundarias */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Monto Aprobado"
            value={data.summary.approvedAmount}
            icon={<ThumbUpIcon />}
            color="#0BB783"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Monto Pendiente"
            value={data.summary.pendingAmount}
            icon={<ScheduleIcon />}
            color="#FFA800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Tiempo Promedio"
            value={`${data.summary.averageProcessingTime.toFixed(1)} días`}
            icon={<TimelineIcon />}
            color="#8950FC"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Tasa de Aprobación"
            value={`${data.summary.approvalRate.toFixed(1)}%`}
            icon={<TrendingUpIcon />}
            color="#1BC5BD"
          />
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontWeight: 600, marginBottom: 16, marginTop: 24 }}
          >
            Análisis y Distribución
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Distribución por Estado
              </Typography>
            </div>
            <CardContent>
              <Chart
                options={statusChartOptions}
                series={statusChartSeries}
                type="donut"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Distribución por Tipo de Empresa
              </Typography>
            </div>
            <CardContent>
              <Chart
                options={companyTypeChartOptions}
                series={companyTypeChartSeries}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Alertas del sistema */}
        <Grid item xs={12}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Alertas del Sistema
              </Typography>
              <Button size="small" variant="outlined">
                Ver Todas
              </Button>
            </div>
            <CardContent>
              {data.alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default GuaranteesPage;

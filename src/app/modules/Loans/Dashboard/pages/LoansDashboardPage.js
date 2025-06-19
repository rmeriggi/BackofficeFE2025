import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Payment as PaymentIcon,
  Refresh as RefreshIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSubheader } from "../../../../../_metronic/layout";
import { loansMock } from "../../__mocks__/loansMock";

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
  loanItem: {
    borderRadius: "8px",
    marginBottom: theme.spacing(1),
    border: "1px solid #eef0f3",
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

const ActionCard = ({ title, description, icon, color, onClick }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.actionCard} onClick={onClick}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Avatar
          className={classes.actionIcon}
          style={{ backgroundColor: color }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 4 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

const LoansDashboardPage = () => {
  const classes = useStyles();
  const subheader = useSubheader();
  const [data, setData] = useState(loansMock);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  subheader.setTitle("Dashboard de Préstamos");

  useEffect(() => {
    // Simular carga de datos
    setData(loansMock);
  }, []);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // Aquí se haría la llamada real al backend
  };

  // Configuración para el gráfico de evolución mensual
  const evolutionChartOptions = {
    chart: {
      id: "evolution-chart",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3699FF", "#0BB783", "#F64E60"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: data.monthlyEvolution.map((item) => item.month),
      labels: { style: { colors: "#7E8299" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${(val / 1000000).toFixed(1)}M`,
        style: { colors: "#7E8299" },
      },
    },
    grid: { borderColor: "#eff2f5" },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#3f4254" },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `$${(val / 1000000).toFixed(2)}M`,
      },
    },
  };

  const evolutionChartSeries = [
    {
      name: "Nuevos Préstamos",
      data: data.monthlyEvolution.map((item) => item.amount),
    },
    {
      name: "Pagos Recibidos",
      data: data.monthlyEvolution.map((item) => item.payments),
    },
  ];

  // Configuración para el gráfico de distribución por garantía
  const guaranteeChartOptions = {
    chart: { type: "donut", height: 350 },
    plotOptions: { pie: { donut: { size: "65%" } } },
    labels: ["Garantía Recíproca", "Hipotecaria", "Personal", "Vehículo"],
    colors: ["#3699FF", "#0BB783", "#F64E60", "#FFA800"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(1) + "%",
    },
    legend: { position: "bottom", horizontalAlign: "center" },
    tooltip: {
      y: { formatter: (value) => value.toFixed(1) + "%" },
    },
  };

  const guaranteeChartSeries = [
    data.byGuaranteeType.reciprocal.percentage,
    data.byGuaranteeType.mortgage.percentage,
    data.byGuaranteeType.personal.percentage,
    data.byGuaranteeType.vehicle.percentage,
  ];

  // Configuración para el gráfico de distribución por monto
  const amountChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
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
      categories: data.byAmount.map((item) => item.range),
      labels: { style: { colors: "#7E8299" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(1) + "%",
        style: { colors: "#7E8299" },
      },
    },
    grid: { borderColor: "#eff2f5" },
    tooltip: {
      y: { formatter: (value) => value.toFixed(1) + "%" },
    },
  };

  const amountChartSeries = [
    {
      name: "Distribución",
      data: data.byAmount.map((item) => item.percentage),
    },
  ];

  const quickActions = [
    {
      title: "Nuevo Préstamo",
      description: "Crear solicitud de préstamo",
      icon: <AddIcon />,
      color: "#3699FF",
      onClick: () => console.log("Nuevo préstamo"),
    },
    {
      title: "Procesar Pagos",
      description: "Gestionar cuotas y pagos",
      icon: <PaymentIcon />,
      color: "#0BB783",
      onClick: () => console.log("Procesar pagos"),
    },
    {
      title: "Análisis de Riesgo",
      description: "Evaluar cartera de préstamos",
      icon: <AssessmentIcon />,
      color: "#FFA800",
      onClick: () => console.log("Análisis de riesgo"),
    },
    {
      title: "Reportes",
      description: "Generar informes detallados",
      icon: <BarChartIcon />,
      color: "#8950FC",
      onClick: () => console.log("Reportes"),
    },
    {
      title: "Calendario",
      description: "Vencimientos y fechas clave",
      icon: <ScheduleIcon />,
      color: "#1BC5BD",
      onClick: () => console.log("Calendario"),
    },
    {
      title: "Configuración",
      description: "Ajustes del sistema",
      icon: <SecurityIcon />,
      color: "#F64E60",
      onClick: () => console.log("Configuración"),
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header con gradiente */}
      <Card className={classes.header}>
        <div className={classes.headerContent}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                Dashboard de Préstamos
              </Typography>
              <Typography variant="body1" style={{ opacity: 0.9 }}>
                Gestión integral de cartera de préstamos y análisis de riesgo
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
                  Nuevo Préstamo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Card>

      {/* Métricas principales */}
      <Grid container spacing={3} style={{ marginBottom: 24 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Préstamos"
            value={data.summary.totalLoans}
            change={data.summary.monthlyGrowth}
            changeLabel="vs mes anterior"
            icon={<AccountBalanceIcon />}
            color="#3699FF"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Monto Total"
            value={data.summary.totalAmount}
            change={5.2}
            changeLabel="vs mes anterior"
            icon={<AssessmentIcon />}
            color="#0BB783"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Pagado"
            value={data.summary.totalPaid}
            change={12.8}
            changeLabel="vs mes anterior"
            icon={<PaymentIcon />}
            color="#1BC5BD"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Pendiente"
            value={data.summary.totalPending}
            change={-2.1}
            changeLabel="vs mes anterior"
            icon={<ScheduleIcon />}
            color="#FFA800"
          />
        </Grid>
      </Grid>

      {/* Métricas secundarias */}
      <Grid container spacing={3} style={{ marginBottom: 24 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Préstamos Activos"
            value={data.summary.activeLoans}
            icon={<CheckCircleIcon />}
            color="#0BB783"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Préstamos Vencidos"
            value={data.summary.overdueLoans}
            icon={<WarningIcon />}
            color="#F64E60"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Índice de Riesgo"
            value={`${data.summary.riskIndex.toFixed(2)}%`}
            icon={<SecurityIcon />}
            color="#8950FC"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Tasa de Pago"
            value={`${data.performance.paymentRate.toFixed(2)}%`}
            icon={<TrendingUpIcon />}
            color="#1BC5BD"
          />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3} style={{ marginBottom: 24 }}>
        <Grid item xs={12} lg={8}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Evolución Mensual de Préstamos
              </Typography>
              <Button size="small" variant="outlined">
                Ver Detalles
              </Button>
            </div>
            <CardContent>
              <Chart
                options={evolutionChartOptions}
                series={evolutionChartSeries}
                type="line"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Distribución por Garantía
              </Typography>
            </div>
            <CardContent>
              <Chart
                options={guaranteeChartOptions}
                series={guaranteeChartSeries}
                type="donut"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginBottom: 24 }}>
        <Grid item xs={12} lg={6}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Distribución por Monto
              </Typography>
              <Button size="small" variant="outlined">
                Ver Detalles
              </Button>
            </div>
            <CardContent>
              <Chart
                options={amountChartOptions}
                series={amountChartSeries}
                type="bar"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Top 5 Préstamos Más Grandes
              </Typography>
              <Button size="small" variant="outlined">
                Ver Todos
              </Button>
            </div>
            <CardContent>
              <List>
                {data.topLoans.map((loan, index) => (
                  <React.Fragment key={loan.id}>
                    <ListItem className={classes.loanItem}>
                      <ListItemAvatar>
                        <Avatar
                          style={{
                            backgroundColor: index < 3 ? "#FFA800" : "#E1E3EA",
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="subtitle2"
                              style={{ fontWeight: 600 }}
                            >
                              {loan.client}
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{ fontWeight: 700, color: "#3699FF" }}
                            >
                              ${(loan.amount / 1000000).toFixed(1)}M
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Chip
                              label={loan.guarantee}
                              size="small"
                              style={{
                                backgroundColor:
                                  loan.guarantee === "Hipotecaria"
                                    ? "#E8F5E8"
                                    : "#E3F2FD",
                                color:
                                  loan.guarantee === "Hipotecaria"
                                    ? "#2E7D32"
                                    : "#1976D2",
                              }}
                            />
                            <Typography variant="body2" color="textSecondary">
                              Pagado: ${(loan.paid / 1000000).toFixed(1)}M
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < data.topLoans.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alertas del sistema y Acciones Rápidas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
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
        <Grid item xs={12} md={4}>
          <Card className={classes.chartCard}>
            <div className={classes.chartHeader}>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Acciones Rápidas
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </div>
            <CardContent>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={6} key={index}>
                    <ActionCard
                      title={action.title}
                      description={action.description}
                      icon={action.icon}
                      color={action.color}
                      onClick={action.onClick}
                    />
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

export default LoansDashboardPage;

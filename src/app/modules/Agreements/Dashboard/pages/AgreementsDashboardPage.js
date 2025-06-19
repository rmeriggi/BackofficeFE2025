import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  CheckCircle,
  CloudDownload,
  Print,
  Refresh,
  TrendingDown,
  TrendingUp,
  Warning,
} from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { agreementsMock } from "../../__mocks__/agreementsMock";

/* const COLORS = ["#3699FF", "#F64E60", "#1BC5BD", "#FFA800", "#8950FC"]; */

const AgreementsDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setData(agreementsMock);
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

  /*   const getStatusColor = (status) => {
    switch (status) {
      case "Activo":
        return "#1BC5BD";
      case "Vencido":
        return "#F64E60";
      default:
        return "#3699FF";
    }
  }; */

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!data) {
    return <Typography>Error al cargar los datos</Typography>;
  }

  // Datos para gráficos
  const utilizationData = data.utilizationTrends.daily;
  const statusData = [
    { name: "Activos", value: data.byStatus.active.count, color: "#1BC5BD" },
    { name: "Vencidos", value: data.byStatus.expired.count, color: "#F64E60" },
  ];
  const clientTypeData = [
    {
      name: "Individual",
      value: data.byClientType.individual.count,
      color: "#3699FF",
    },
    {
      name: "Empresa",
      value: data.byClientType.business.count,
      color: "#FFA800",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", color: "#3699FF" }}
        >
          Dashboard de Acuerdos
        </Typography>
        <Box>
          <Button variant="outlined" startIcon={<Refresh />} sx={{ mr: 1 }}>
            Actualizar
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloudDownload />}
            sx={{ mr: 1 }}
          >
            Exportar
          </Button>
          <Button variant="outlined" startIcon={<Print />}>
            Imprimir
          </Button>
        </Box>
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ color: "#1BC5BD", mr: 1 }} />
                <Typography variant="h6" color="textSecondary">
                  Total Acuerdos
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {data.summary.totalAgreements}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircle sx={{ color: "#1BC5BD", fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="textSecondary">
                  {data.summary.activeAgreements} activos
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingDown sx={{ color: "#F64E60", mr: 1 }} />
                <Typography variant="h6" color="textSecondary">
                  Sobregiro Total
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {formatCurrency(data.summary.totalOverdraftAmount)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Warning sx={{ color: "#F64E60", fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="textSecondary">
                  {data.performance.totalOverdraftClients} clientes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ color: "#3699FF", mr: 1 }} />
                <Typography variant="h6" color="textSecondary">
                  Monto Acordado
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {formatCurrency(data.summary.totalAgreedAmount)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  Promedio:{" "}
                  {formatCurrency(data.summary.averageAgreementAmount)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ color: "#FFA800", mr: 1 }} />
                <Typography variant="h6" color="textSecondary">
                  Tasa de Utilización
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {formatPercentage(data.summary.averageUtilizationRate)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  Disponible:{" "}
                  {formatCurrency(data.summary.totalAvailableAmount)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos y Métricas Secundarias */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Gráfico de Tendencias */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tendencias de Utilización (Últimos 10 días)
              </Typography>
              <ReactApexChart
                options={{
                  chart: {
                    type: "line",
                    height: 350,
                  },
                  series: [
                    {
                      name: "Utilización",
                      data: utilizationData.map((item) => item.utilization),
                    },
                  ],
                  xaxis: {
                    categories: utilizationData.map((item) => item.date),
                  },
                }}
                series={[
                  {
                    name: "Utilización",
                    data: utilizationData.map((item) => item.utilization),
                  },
                ]}
                type="line"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Métricas Secundarias */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Por Estado
                  </Typography>
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "donut",
                      },
                      series: statusData.map((item) => item.value),
                      labels: statusData.map((item) => item.name),
                      colors: statusData.map((item) => item.color),
                    }}
                    series={statusData.map((item) => item.value)}
                    type="donut"
                  />
                  <Box sx={{ mt: 2 }}>
                    {statusData.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: item.color,
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Por Tipo de Cliente
                  </Typography>
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "donut",
                      },
                      series: clientTypeData.map((item) => item.value),
                      labels: clientTypeData.map((item) => item.name),
                      colors: clientTypeData.map((item) => item.color),
                    }}
                    series={clientTypeData.map((item) => item.value)}
                    type="donut"
                  />
                  <Box sx={{ mt: 2 }}>
                    {clientTypeData.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: item.color,
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Alertas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {data.alerts.map((alert) => (
          <Grid item xs={12} md={4} key={alert.id}>
            <Alert
              severity={alert.type}
              sx={{ height: "100%" }}
              action={
                <Button color="inherit" size="small">
                  Ver
                </Button>
              }
            >
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.message}
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Cantidad: {alert.count} | Monto:{" "}
                  {formatCurrency(alert.amount)}
                </Typography>
              </Box>
            </Alert>
          </Grid>
        ))}
      </Grid>

      {/* Tablas */}
      <Grid container spacing={3}>
        {/* Top Clientes en Sobregiro */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Top Clientes en Sobregiro
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell align="right">Acuerdo</TableCell>
                      <TableCell align="right">Sobregiro</TableCell>
                      <TableCell align="right">Utilización</TableCell>
                      <TableCell align="center">Riesgo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.topOverdraftClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {client.clientName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {client.daysOverdraft} días en sobregiro
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {formatCurrency(client.agreementAmount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{ color: "#F64E60", fontWeight: "bold" }}
                          >
                            {formatCurrency(client.overdraftAmount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {formatPercentage(client.utilizationRate)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={client.riskLevel}
                            size="small"
                            sx={{
                              backgroundColor: getRiskColor(client.riskLevel),
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Acuerdos Próximos a Vencer */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Acuerdos Próximos a Vencer
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell align="right">Acuerdo</TableCell>
                      <TableCell align="right">Saldo</TableCell>
                      <TableCell align="center">Días</TableCell>
                      <TableCell align="center">Renovación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.expiringAgreements.map((agreement) => (
                      <TableRow key={agreement.id}>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {agreement.clientName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Vence: {agreement.expirationDate}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {formatCurrency(agreement.agreementAmount)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                agreement.currentBalance < 0
                                  ? "#F64E60"
                                  : "#1BC5BD",
                              fontWeight: "bold",
                            }}
                          >
                            {formatCurrency(agreement.currentBalance)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${agreement.daysToExpire} días`}
                            size="small"
                            sx={{
                              backgroundColor:
                                agreement.daysToExpire <= 7
                                  ? "#F64E60"
                                  : "#FFA800",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={agreement.renewalProbability}
                            size="small"
                            sx={{
                              backgroundColor:
                                agreement.renewalProbability === "Alta"
                                  ? "#1BC5BD"
                                  : agreement.renewalProbability === "Media"
                                  ? "#FFA800"
                                  : "#F64E60",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgreementsDashboardPage;

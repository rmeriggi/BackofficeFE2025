import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Person as PersonIcon,
  Star as StarIcon,
} from "@material-ui/icons";
import React from "react";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f5f8fa",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    },
  },
  cardHeader: {
    backgroundColor: "#f9fbfd",
    borderBottom: "1px solid #eef0f3",
    padding: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1.5),
    },
  },
  positiveChange: {
    color: "#0abb87",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
  negativeChange: {
    color: "#fd397a",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  },
  featuredBadge: {
    backgroundColor: "#ffd700",
    color: "#2d3748",
    fontWeight: 600,
    padding: theme.spacing(0.5, 1),
    borderRadius: "4px",
    marginLeft: theme.spacing(1),
  },
  avatar: {
    backgroundColor: "#3699ff",
  },
  riskTag: {
    fontWeight: 600,
    marginLeft: theme.spacing(1),
  },
  highRisk: {
    color: "#fd397a",
    backgroundColor: "rgba(253, 57, 122, 0.1)",
  },
  mediumRisk: {
    color: "#ffb822",
    backgroundColor: "rgba(255, 184, 34, 0.1)",
  },
  lowRisk: {
    color: "#0abb87",
    backgroundColor: "rgba(10, 187, 135, 0.1)",
  },
  investorList: {
    maxHeight: 400,
    overflow: "auto",
  },
}));

// Componente para las tarjetas de estadísticas
const StatCard = ({ title, value, change, changeLabel, color = "inherit" }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" style={{ fontWeight: 600, color }}>
          {value}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body2" className={classes.positiveChange}>
            <ArrowUpwardIcon fontSize="small" /> {change}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: 8 }}
          >
            {changeLabel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Componente para las tarjetas de inversiones destacadas
const InvestmentCard = ({ investment }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {investment.name.charAt(0)}
          </Avatar>
        }
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              {investment.name}
            </Typography>
            {investment.featured && (
              <Chip
                label="Destacado"
                size="small"
                className={classes.featuredBadge}
                icon={<StarIcon style={{ fontSize: 16 }} />}
              />
            )}
          </Box>
        }
        subheader={`${investment.type} | ${investment.market}`}
      />
      <CardContent>
        <StatRow
          label="Precio"
          value={`${investment.price} ${investment.currency}`}
        />
        <StatRow
          label="Cambio"
          value={`${Math.abs(investment.change)}%`}
          icon={
            investment.change > 0 ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            )
          }
          className={
            investment.change > 0
              ? classes.positiveChange
              : classes.negativeChange
          }
        />
        <StatRow
          label="Volumen"
          value={`${(investment.volume / 1000000).toFixed(1)}M`}
        />
        <StatRow
          label="Sector"
          value={<Chip label={investment.sector} size="small" />}
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end", padding: 16 }}>
        <Chip label={`PER: ${investment.peRatio}`} size="small" />
        <Chip label={`Beta: ${investment.beta}`} size="small" />
      </CardActions>
    </Card>
  );
};

// Componente para filas de estadísticas
const StatRow = ({ label, value, icon, className }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Typography
      variant="body1"
      className={className}
      style={{ display: "flex", alignItems: "center" }}
    >
      {icon}
      {value}
    </Typography>
  </Box>
);

// Componente para las tarjetas de mercados
const MarketCard = ({ market }) => {
  const classes = useStyles();

  const getRiskClass = (risk) => {
    switch (risk) {
      case "alto":
        return classes.highRisk;
      case "medio":
        return classes.mediumRisk;
      case "bajo":
        return classes.lowRisk;
      default:
        return classes.lowRisk;
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountBalanceIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            <Typography style={{ fontWeight: 600 }}>{market.nombre}</Typography>
            {market.destacado && (
              <StarIcon
                style={{ color: "#ffd700", marginLeft: 8, fontSize: 18 }}
              />
            )}
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="textPrimary">
              {market.descripcion}
            </Typography>
            <Box display="flex" mt={1} alignItems="center">
              <Chip
                label={`Rendimiento: ${market.rendimientoAnual}%`}
                size="small"
                style={{ backgroundColor: "#e1f0ff", color: "#3699ff" }}
              />
              <Chip
                label={`Riesgo: ${market.riesgo}`}
                size="small"
                className={`${classes.riskTag} ${getRiskClass(market.riesgo)}`}
                style={{ marginLeft: 8 }}
              />
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

// Componente para las tarjetas de inversores
const InvestorCard = ({ investor }) => {
  const getSegmentStyle = (segment) => {
    switch (segment) {
      case "Premium":
        return { backgroundColor: "#e1f0ff", color: "#3699ff" };
      case "Gold":
        return { backgroundColor: "#fff8dd", color: "#ffb822" };
      default:
        return { backgroundColor: "#e8fff3", color: "#0abb87" };
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontWeight: 600 }}>{investor.name}</Typography>
            <Chip
              label={investor.segment}
              size="small"
              style={{ ...getSegmentStyle(investor.segment), fontWeight: 600 }}
            />
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="textPrimary">
              {investor.email}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2">
                <Box component="span" fontWeight="600">
                  €{investor.totalInvestment.toLocaleString()}
                </Box>{" "}
                invertidos
              </Typography>
              <Typography variant="body2">
                {investor.projects} proyectos
              </Typography>
            </Box>
            <Box mt={1}>
              {investor.portfolio.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  size="small"
                  style={{ marginRight: 4, marginBottom: 4 }}
                />
              ))}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

// Datos de ejemplo
const featuredInvestments = [
  {
    id: "AAPL",
    name: "Apple Inc.",
    type: "Acción",
    market: "NASDAQ",
    price: 175.43,
    change: 1.25,
    volume: 52345678,
    currency: "USD",
    sector: "Tecnología",
    dividendYield: 0.58,
    peRatio: 29.8,
    beta: 1.2,
    featured: true,
  },
  {
    id: "MSFT",
    name: "Microsoft Corporation",
    type: "Acción",
    market: "NASDAQ",
    price: 305.65,
    change: -0.75,
    volume: 34567890,
    currency: "USD",
    sector: "Tecnología",
    dividendYield: 0.95,
    peRatio: 35.4,
    beta: 0.9,
    featured: true,
  },
  {
    id: "TSLA",
    name: "Tesla, Inc.",
    type: "Acción",
    market: "NASDAQ",
    price: 235.4,
    change: 3.15,
    volume: 78345621,
    currency: "USD",
    sector: "Automotriz",
    dividendYield: 0,
    peRatio: 68.2,
    beta: 1.8,
    featured: true,
  },
];

const topMarkets = [
  {
    id: 3001,
    nombre: "NASDAQ 100",
    tipo: "Acciones",
    descripcion:
      "Índice compuesto por las 100 principales empresas no financieras del NASDAQ",
    rentabilidadEsperada: "8-12%",
    riesgo: "alto",
    moneda: "USD",
    emisor: "NASDAQ",
    volatilidad: "Alta",
    liquidez: "Muy Alta",
    rendimientoAnual: 10.7,
    minInversion: 1000,
    comision: 0.25,
    calificacion: 4.8,
    destacado: true,
  },
  {
    id: 3002,
    nombre: "S&P 500",
    tipo: "Acciones",
    descripcion: "Índice de las 500 mayores empresas cotizadas en EE.UU.",
    rentabilidadEsperada: "7-10%",
    riesgo: "medio",
    moneda: "USD",
    emisor: "S&P Global",
    volatilidad: "Media",
    liquidez: "Muy Alta",
    rendimientoAnual: 9.2,
    minInversion: 500,
    comision: 0.15,
    calificacion: 4.7,
    destacado: true,
  },
  {
    id: 3003,
    nombre: "Bonos del Tesoro EE.UU.",
    tipo: "Bonos",
    descripcion:
      "Bonos de deuda pública emitidos por el gobierno estadounidense",
    rentabilidadEsperada: "2-4%",
    riesgo: "bajo",
    moneda: "USD",
    emisor: "Tesoro EE.UU.",
    volatilidad: "Baja",
    liquidez: "Alta",
    rendimientoAnual: 3.2,
    minInversion: 100,
    comision: 0.1,
    calificacion: 4.5,
    destacado: true,
  },
];

const investors = [
  {
    id: 1,
    name: "María García López",
    email: "maria.garcia@correo.com",
    phone: "+34 612 345 678",
    totalInvestment: 245000,
    projects: 7,
    lastInvestment: "2023-06-15",
    status: "Activo",
    segment: "Premium",
    type: "Individual",
    avatar: null,
    portfolio: ["Tecnología", "Energía", "Bienes Raíces"],
    notes: "Interesado en startups de inteligencia artificial",
  },
  {
    id: 2,
    name: "Carlos Rodríguez Martínez",
    email: "carlos.rodriguez@correo.com",
    phone: "+34 699 876 543",
    totalInvestment: 178000,
    projects: 5,
    lastInvestment: "2023-07-10",
    status: "Activo",
    segment: "Gold",
    type: "Individual",
    avatar: null,
    portfolio: ["Salud", "Tecnología"],
    notes: "Enfoque en inversiones sostenibles",
  },
  {
    id: 3,
    name: "Inversiones Globales S.A.",
    email: "contacto@inversionesglobales.com",
    phone: "+34 915 555 555",
    totalInvestment: 1200000,
    projects: 23,
    lastInvestment: "2023-07-22",
    status: "Activo",
    segment: "Platinum",
    type: "Corporativo",
    avatar: null,
    portfolio: ["Diversificado", "Mercados Emergentes"],
    notes: "Buscando oportunidades en energías renovables",
  },
  {
    id: 4,
    name: "Laura Fernández Jiménez",
    email: "laura.fernandez@correo.com",
    phone: "+34 644 222 333",
    totalInvestment: 89000,
    projects: 4,
    lastInvestment: "2023-07-18",
    status: "Activo",
    segment: "Silver",
    type: "Individual",
    avatar: null,
    portfolio: ["Bienes Raíces", "Tecnología"],
    notes: "Interesada en fintech",
  },
];

const InvestmentDashboard = () => {
  const classes = useStyles();

  // Configuración para el gráfico de rendimiento
  const performanceChartOptions = {
    chart: {
      id: "performance-chart",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3699ff", "#0abb87", "#fd397a"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      labels: { style: { colors: "#a1a5b7" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => val + "%",
        style: { colors: "#a1a5b7" },
      },
    },
    grid: { borderColor: "#eff2f5" },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#3f4254" },
    },
    tooltip: { theme: "light" },
  };

  const performanceChartSeries = [
    {
      name: "Tu Portfolio",
      data: [5.2, 7.1, 6.8, 8.2, 9.5, 11.3, 10.8, 12.5, 13.2, 15.1, 14.7, 16.5],
    },
    {
      name: "S&P 500",
      data: [3.8, 5.2, 4.5, 6.1, 7.2, 8.5, 7.8, 9.1, 10.2, 11.5, 10.8, 12.1],
    },
    {
      name: "NASDAQ",
      data: [4.5, 6.1, 5.8, 7.3, 8.5, 9.8, 9.1, 10.5, 11.8, 13.2, 12.5, 14.0],
    },
  ];

  // Configuración para el gráfico de asignación de activos
  const allocationChartOptions = {
    chart: { type: "donut", height: 350 },
    plotOptions: { pie: { donut: { size: "65%" } } },
    labels: [
      "Acciones",
      "Bonos",
      "Fondos",
      "Mercado Monetario",
      "Alternativos",
    ],
    colors: ["#3699ff", "#0abb87", "#fd397a", "#ffb822", "#8950fc"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val + "%",
    },
    legend: { position: "bottom", horizontalAlign: "center" },
    tooltip: {
      y: { formatter: (value) => value + "%" },
    },
  };

  const allocationChartSeries = [45, 25, 15, 10, 5];

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {/* Resumen Estadístico */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Valor Total del Portfolio"
              value="€245,320"
              change="5.2%"
              changeLabel="vs mes anterior"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Rendimiento Anual"
              value="12.7%"
              change="2.1%"
              changeLabel="vs S&P 500"
              color="#0abb87"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Inversiones Activas"
              value="24"
              change="3 nuevas"
              changeLabel="este trimestre"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Clientes Activos"
              value="42"
              change="8.3%"
              changeLabel="vs trimestre anterior"
            />
          </Grid>
        </Grid>

        {/* Gráficos principales */}
        <Grid container spacing={3} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={8}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Rendimiento del Portfolio
                  </Typography>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Chart
                  options={performanceChartOptions}
                  series={performanceChartSeries}
                  type="line"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Asignación de Activos
                  </Typography>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Chart
                  options={allocationChartOptions}
                  series={allocationChartSeries}
                  type="donut"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sección de inversiones destacadas */}
        <Box mt={5}>
          <Typography variant="h5" className={classes.sectionTitle}>
            <StarIcon /> Inversiones Destacadas
          </Typography>
          <Grid container spacing={3}>
            {featuredInvestments.map((investment) => (
              <Grid item xs={12} md={4} key={investment.id}>
                <InvestmentCard investment={investment} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sección inferior con mercados e inversores */}
        <Grid container spacing={3} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Mercados Destacados
                  </Typography>
                }
                className={classes.cardHeader}
              />
              <CardContent>
                <List>
                  {topMarkets.map((market) => (
                    <React.Fragment key={market.id}>
                      <MarketCard market={market} />
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Últimos Inversores
                  </Typography>
                }
                className={classes.cardHeader}
              />
              <CardContent>
                <List className={classes.investorList}>
                  {investors.map((investor) => (
                    <React.Fragment key={investor.id}>
                      <InvestorCard investor={investor} />
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default InvestmentDashboard;

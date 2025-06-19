import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Add,
  Edit,
  GetApp,
  Search,
  ViewList,
  ViewModule,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
/* import Pagination from "../../../../../components/Pagination"; */
import { agreementsAccountsMock } from "../../__mocks__/agreementsAccountsMock";

const AgreementsAccountsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "Todos",
    clientType: "Todos",
    riskLevel: "Todos",
    branch: "Todas",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setData(agreementsAccountsMock);
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
      case "Vencido":
        return "#F64E60";
      default:
        return "#3699FF";
    }
  };

  // Filtrar y buscar datos
  const filteredData =
    data?.accounts.filter((account) => {
      const matchesSearch =
        account.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNumber.includes(searchTerm);

      const matchesStatus =
        filters.status === "Todos" ||
        account.agreementStatus === filters.status;
      const matchesClientType =
        filters.clientType === "Todos" ||
        account.clientType === filters.clientType;
      const matchesRiskLevel =
        filters.riskLevel === "Todos" ||
        account.riskLevel === filters.riskLevel;
      const matchesBranch =
        filters.branch === "Todas" || account.branch === filters.branch;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClientType &&
        matchesRiskLevel &&
        matchesBranch
      );
    }) || [];

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
          Acuerdos en Cuenta
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ mr: 1 }}
          >
            Nuevo Acuerdo
          </Button>
          <Button variant="outlined" startIcon={<GetApp />} sx={{ mr: 1 }}>
            Exportar
          </Button>
        </Box>
      </Box>

      {/* Métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Cuentas
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {data.summary.totalAccounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Acuerdos Activos
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#1BC5BD" }}
              >
                {data.summary.activeAgreements}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Monto Total Acordado
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {formatCurrency(data.summary.totalAgreedAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Tasa Promedio de Utilización
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#FFA800" }}
              >
                {formatPercentage(data.summary.averageUtilizationRate)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros y Búsqueda */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar por cliente o cuenta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                    label="Estado"
                  >
                    {data.filters.statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Tipo Cliente</InputLabel>
                  <Select
                    value={filters.clientType}
                    onChange={(e) =>
                      setFilters({ ...filters, clientType: e.target.value })
                    }
                    label="Tipo Cliente"
                  >
                    {data.filters.clientTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Riesgo</InputLabel>
                  <Select
                    value={filters.riskLevel}
                    onChange={(e) =>
                      setFilters({ ...filters, riskLevel: e.target.value })
                    }
                    label="Riesgo"
                  >
                    {data.filters.riskLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Sucursal</InputLabel>
                  <Select
                    value={filters.branch}
                    onChange={(e) =>
                      setFilters({ ...filters, branch: e.target.value })
                    }
                    label="Sucursal"
                  >
                    {data.filters.branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ButtonGroup size="small">
                  <Button
                    variant={viewMode === "table" ? "contained" : "outlined"}
                    onClick={() => setViewMode("table")}
                    startIcon={<ViewList />}
                  >
                    Tabla
                  </Button>
                  <Button
                    variant={viewMode === "cards" ? "contained" : "outlined"}
                    onClick={() => setViewMode("cards")}
                    startIcon={<ViewModule />}
                  >
                    Tarjetas
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Paginación Superior */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Mostrando {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredData.length)} de{" "}
          {filteredData.length} cuentas
        </Typography>
        {/*    <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        /> */}
      </Box>

      {/* Vista de Tabla */}
      {viewMode === "table" && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cuenta</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="right">Acuerdo</TableCell>
                  <TableCell align="right">Saldo</TableCell>
                  <TableCell align="right">Disponible</TableCell>
                  <TableCell align="right">Utilización</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Riesgo</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {account.accountNumber}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {account.accountType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {account.clientName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {account.clientType} • {account.branch}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatCurrency(account.agreementAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            account.currentBalance < 0 ? "#F64E60" : "#1BC5BD",
                          fontWeight: "bold",
                        }}
                      >
                        {formatCurrency(account.currentBalance)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatCurrency(account.availableAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatPercentage(account.utilizationRate)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={account.agreementStatus}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(
                            account.agreementStatus
                          ),
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={account.riskLevel}
                        size="small"
                        sx={{
                          backgroundColor: getRiskColor(account.riskLevel),
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          sx={{ minWidth: "auto", px: 1 }}
                        >
                          Ver
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Edit />}
                          sx={{ minWidth: "auto", px: 1 }}
                        >
                          Editar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Vista de Tarjetas */}
      {viewMode === "cards" && (
        <Grid container spacing={3}>
          {currentItems.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {account.accountNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {account.accountType}
                      </Typography>
                    </Box>
                    <Chip
                      label={account.agreementStatus}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(
                          account.agreementStatus
                        ),
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {account.clientName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {account.clientType} • {account.branch}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Acuerdo
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {formatCurrency(account.agreementAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Saldo
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            account.currentBalance < 0 ? "#F64E60" : "#1BC5BD",
                          fontWeight: "bold",
                        }}
                      >
                        {formatCurrency(account.currentBalance)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Disponible
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {formatCurrency(account.availableAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Utilización
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {formatPercentage(account.utilizationRate)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={account.riskLevel}
                      size="small"
                      sx={{
                        backgroundColor: getRiskColor(account.riskLevel),
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Visibility />}
                        sx={{ minWidth: "auto", px: 1 }}
                      >
                        Ver
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        sx={{ minWidth: "auto", px: 1 }}
                      >
                        Editar
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Paginación Inferior */}
      {/* <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Box> */}
    </Box>
  );
};

export default AgreementsAccountsPage;

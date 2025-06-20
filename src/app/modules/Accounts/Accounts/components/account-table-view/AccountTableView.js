import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ArrowBack,
  AttachMoney,
  CloudDownload,
  FilterList,
  GridOn,
  List,
  Search,
  TrendingDown,
  TrendingUp,
  Visibility,
} from "@material-ui/icons";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { SnackbarMessage } from "../../../../../components";
import { ReceiptModal } from "../../../../../components/ReceiptModal";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { getExcel } from "../../../../../utils/exportExcel";
import { useAllTransactions, useOneAccount } from "../../utils/apiHooks";
import { AdjustCreditDebitModal } from "../AdjustCreditDebitModal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f8fa",
    minHeight: "100vh",
    padding: theme.spacing(3),
  },
  header: {
    background: "linear-gradient(135deg, #3699FF 0%, #1BC5BD 100%)",
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
  transactionCard: {
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
  creditButton: {
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
  debitButton: {
    backgroundColor: "#FFA800",
    color: "white",
    "&:hover": {
      backgroundColor: "#E69500",
    },
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 2px 8px rgba(255, 168, 0, 0.3)",
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
  filterCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    marginBottom: theme.spacing(3),
  },
  noResultsCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    textAlign: "center",
    padding: theme.spacing(8, 3),
  },
}));

/* const MetricCard = ({ title, value, icon, color }) => {
  const classes = useStyles();

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
    <Card className={classes.metricCard}>
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
      </CardContent>
    </Card>
  );
}; */

const TransactionCard = ({ transaction, onView }) => {
  const classes = useStyles();
  const isCredit = parseFloat(transaction.amount) > 0;

  return (
    <Card className={classes.transactionCard}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              style={{
                backgroundColor: isCredit ? "#E8F5E8" : "#FFEBEE",
                marginRight: 12,
              }}
            >
              <AttachMoney
                style={{
                  color: isCredit ? "#2E7D32" : "#C62828",
                }}
              />
            </Avatar>
            <Box>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                #{transaction.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {DateColumnFormatter(transaction.date)}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={isCredit ? "Crédito" : "Débito"}
            style={{
              backgroundColor: isCredit ? "#E8F5E8" : "#FFEBEE",
              color: isCredit ? "#2E7D32" : "#C62828",
            }}
            size="small"
          />
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Tipo
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {transaction.type}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary">
              Importe
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontWeight: 600,
                color: isCredit ? "#0BB783" : "#F64E60",
              }}
            >
              {AmountColumnFormatter(transaction.amount)}
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            size="small"
            variant="contained"
            className={classes.viewButton}
            startIcon={<Visibility style={{ fontSize: 16 }} />}
            onClick={() => onView(transaction.id)}
            style={{
              fontSize: "0.75rem",
              padding: "4px 8px",
              minWidth: "auto",
            }}
          >
            Ver Recibo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const filterData = (transactionsData, filter) => {
  let filteredData = transactionsData;
  if (
    filter &&
    (filter.searchText !== "" ||
      filter.type !== "" ||
      filter.amountMin !== "" ||
      filter.amountMax !== "" ||
      filter.dateFrom !== "" ||
      filter.dateTo !== "")
  ) {
    filteredData = transactionsData.filter((transaction) => {
      const searchTerm = (filter.searchText || "").toLowerCase();
      const typeFilter = (filter.type || "").toLowerCase();
      const amountMin = parseFloat(filter.amountMin) || 0;
      const amountMax = parseFloat(filter.amountMax) || Infinity;
      const dateFrom = filter.dateFrom ? new Date(filter.dateFrom) : null;
      const dateTo = filter.dateTo ? new Date(filter.dateTo) : null;

      // Búsqueda por texto
      const matchesSearch =
        !searchTerm ||
        (transaction.type?.toString() || "")
          .toLowerCase()
          .includes(searchTerm) ||
        (transaction.id?.toString() || "").toLowerCase().includes(searchTerm);

      // Filtro por tipo
      const matchesType =
        !typeFilter ||
        (transaction.type?.toString() || "").toLowerCase().includes(typeFilter);

      // Filtro por monto
      const transactionAmount = Math.abs(parseFloat(transaction.amount) || 0);
      const matchesAmount =
        transactionAmount >= amountMin && transactionAmount <= amountMax;

      // Filtro por fecha
      let matchesDate = true;
      if (dateFrom || dateTo) {
        const transactionDate = new Date(transaction.date);
        if (dateFrom && transactionDate < dateFrom) matchesDate = false;
        if (dateTo && transactionDate > dateTo) matchesDate = false;
      }

      return matchesSearch && matchesType && matchesAmount && matchesDate;
    });
  }
  return filteredData;
};

export default function AccountTableView() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMountedRef();
  const [showModal, setShowModal] = useState(false);
  const [idTransaction, setIdTransaction] = useState("");
  const [allTransactions, allTransactionsCompleted] = useAllTransactions(
    id,
    isMounted
  );
  const [oneAccount, oneAccountCompleted] = useOneAccount(id, isMounted);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustModalType, setAdjustModalType] = useState("credit");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "El ajuste fue realizado correctamente."
  );
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    searchText: "",
    type: "",
    amountMin: "",
    amountMax: "",
    dateFrom: "",
    dateTo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { hasAccountsSettingasAccess } = useSelector(
    ({ auth }) => ({
      hasAccountsSettingasAccess: auth.access["accounts.Ajustes"],
    }),
    shallowEqual
  );

  const openReceipt = (id) => {
    setShowModal(true);
    setIdTransaction(id);
  };

  const closeReceipt = () => {
    setShowModal(false);
  };

  if (!(allTransactionsCompleted && oneAccountCompleted)) {
    return <LayoutSplashScreen />;
  }

  const { transactions } = allTransactions;
  const { account } = oneAccount;

  // Filtros y búsqueda
  const filteredData = filterData(transactions, localFilters);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const backToAccountsList = () => {
    history.push(`/accounts/accounts`);
  };

  const applyFilter = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setLocalFilters({
      searchText: "",
      type: "",
      amountMin: "",
      amountMax: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const reportData = filteredData.map((transaction) => ({
      ...transaction,
      amount: AmountColumnFormatter(transaction.amount),
      date: DateColumnFormatter(transaction.date),
    }));

    const propertiesData = {
      header: ["ID", "Fecha", "Tipo", "Importe"],
      properties: ["id", "date", "type", "amount"],
      array: reportData,
    };
    getExcel(
      propertiesData,
      `Transacciones_${account?.businessName || "Cuenta"}`
    );
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  // Calcular métricas en tiempo real con los filtros aplicados
  const totalCredits = filteredData
    .filter((t) => parseFloat(t.amount) > 0)
    .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

  const totalDebits = filteredData
    .filter((t) => parseFloat(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

  return (
    <div className={classes.root}>
      {/* Encabezado principal */}
      <Card className={classes.header}>
        <div className={classes.headerContent}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box>
              <Typography
                variant="h3"
                style={{ fontWeight: 700, marginBottom: 1 }}
              >
                Transacciones de Cuenta
              </Typography>
              <Typography variant="h6" style={{ opacity: 0.9 }}>
                <Box display="flex" flexWrap="wrap">
                  <span style={{ marginRight: 24, marginBottom: 4 }}>
                    Razón Social: {account?.businessName}
                  </span>
                  <span style={{ marginRight: 24, marginBottom: 4 }}>
                    CUIT: {account?.cuit}
                  </span>
                </Box>
                <Box display="flex" flexWrap="wrap">
                  <span style={{ marginRight: 24, marginBottom: 4 }}>
                    Alias: {account?.alias}
                  </span>
                  <span style={{ marginBottom: 4 }}>CVU: {account?.cvu}</span>
                </Box>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {filteredData.length > 0 && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    marginRight: 8,
                  }}
                  startIcon={<CloudDownload />}
                  onClick={exportToExcel}
                >
                  Exportar
                </Button>
              )}
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  marginRight: 8,
                }}
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filtros
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  marginRight: 8,
                }}
                startIcon={viewMode === "grid" ? <List /> : <GridOn />}
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? "Lista" : "Grid"}
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
                startIcon={<ArrowBack />}
                onClick={backToAccountsList}
              >
                Volver
              </Button>
            </Box>
          </Box>

          {/* Métricas */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 700, marginBottom: 1 }}
                >
                  {filteredData.length}
                </Typography>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Total Transacciones
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 700, marginBottom: 1 }}
                >
                  {AmountColumnFormatter(totalCredits)}
                </Typography>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Total Créditos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 700, marginBottom: 1 }}
                >
                  {AmountColumnFormatter(totalDebits)}
                </Typography>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Total Débitos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 700, marginBottom: 1 }}
                >
                  {AmountColumnFormatter(totalCredits - totalDebits)}
                </Typography>
                <Typography variant="body2" style={{ opacity: 0.9 }}>
                  Balance Neto
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Botones de ajuste */}
          {hasAccountsSettingasAccess && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                className={classes.creditButton}
                startIcon={<TrendingUp />}
                onClick={() => {
                  setAdjustModalType("credit");
                  setShowAdjustModal(true);
                }}
                style={{ marginRight: 16 }}
              >
                Ajuste Crédito
              </Button>
              <Button
                variant="contained"
                className={classes.debitButton}
                startIcon={<TrendingDown />}
                onClick={() => {
                  setAdjustModalType("debit");
                  setShowAdjustModal(true);
                }}
              >
                Ajuste Débito
              </Button>
            </Box>
          )}
        </div>
      </Card>

      {/* Filtros */}
      {showFilters && (
        <Card className={classes.filterCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
              Filtros Avanzados
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box display="flex" alignItems="center">
                  <Search style={{ marginRight: 8, color: "#7E8299" }} />
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Buscar por ID, tipo..."
                    value={localFilters.searchText}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        searchText: e.target.value,
                      })
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Tipo de transacción"
                  value={localFilters.type}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      type: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <input
                  type="number"
                  className="form-control form-control-solid"
                  placeholder="Monto mínimo"
                  value={localFilters.amountMin}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      amountMin: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <input
                  type="number"
                  className="form-control form-control-solid"
                  placeholder="Monto máximo"
                  value={localFilters.amountMax}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      amountMax: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Box display="flex">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 8 }}
                    onClick={applyFilter}
                  >
                    Aplicar Filtros
                  </Button>
                  <Button variant="outlined" onClick={clearFilters}>
                    Limpiar
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 16 }}>
              <Grid item xs={12} md={3}>
                <input
                  type="date"
                  className="form-control form-control-solid"
                  placeholder="Fecha desde"
                  value={localFilters.dateFrom}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      dateFrom: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <input
                  type="date"
                  className="form-control form-control-solid"
                  placeholder="Fecha hasta"
                  value={localFilters.dateTo}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      dateTo: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Título del listado */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Listado de Transacciones
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {filteredData.length} transacciones encontradas
        </Typography>
      </Box>

      {/* Listado de transacciones */}
      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {currentItems.map((transaction) => (
            <Grid item xs={12} md={6} lg={4} key={transaction.id}>
              <TransactionCard transaction={transaction} onView={openReceipt} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card className={classes.tableContainer}>
          <CardContent style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="table table-head-custom table-vertical-center overflow-hidden">
                <thead>
                  <tr>
                    <th className="pl-7">
                      <span className="text-dark-75">ID</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Fecha</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Tipo</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Importe</span>
                    </th>
                    <th>
                      <span className="text-dark-75">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((transaction) => (
                    <tr key={transaction.id} className="border-bottom">
                      <td className="pl-7">
                        <span className="text-dark font-weight-bolder">
                          #{transaction.id}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {DateColumnFormatter(transaction.date)}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder">
                          {transaction.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`text-dark font-weight-bolder ${
                            parseFloat(transaction.amount) > 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {AmountColumnFormatter(transaction.amount)}
                        </span>
                      </td>
                      <td>
                        <Button
                          size="small"
                          variant="contained"
                          className={classes.viewButton}
                          startIcon={<Visibility style={{ fontSize: 16 }} />}
                          onClick={() => openReceipt(transaction.id)}
                          style={{
                            fontSize: "0.75rem",
                            padding: "4px 8px",
                            minWidth: "auto",
                          }}
                        >
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sin resultados */}
      {filteredData.length === 0 && (
        <Card className={classes.noResultsCard}>
          <CardContent>
            <Search
              style={{ fontSize: 64, color: "#7E8299", marginBottom: 16 }}
            />
            <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
              No se encontraron transacciones
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginBottom: 24 }}
            >
              Intenta ajustar tus filtros o términos de búsqueda
            </Typography>
            <Button variant="contained" color="primary" onClick={clearFilters}>
              Restablecer filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Paginación */}
      {filteredData.length > 0 && (
        <Card style={{ marginTop: 24 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginRight: 16 }}
                >
                  Mostrando {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredData.length)} de{" "}
                  {filteredData.length} transacciones
                </Typography>
                <select
                  className="form-control form-control-solid w-auto"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 por página</option>
                  <option value={10}>10 por página</option>
                  <option value={25}>25 por página</option>
                  <option value={50}>50 por página</option>
                </select>
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{ marginRight: 8 }}
                >
                  Anterior
                </Button>
                <Typography variant="body2" style={{ margin: "0 16px" }}>
                  Página {currentPage} de {totalPages}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{ marginLeft: 8 }}
                >
                  Siguiente
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Modales */}
      <ReceiptModal
        allowReversar={hasAccountsSettingasAccess}
        show={showModal}
        onHide={closeReceipt}
        idTransaction={idTransaction}
        setId={setIdTransaction}
        setOpenSnackbar={setOpenSnackbar}
        setVariant={setVariant}
        setMessage={setMessage}
      />
      <AdjustCreditDebitModal
        type={adjustModalType}
        show={showAdjustModal}
        onHide={() => setShowAdjustModal(false)}
        setOpenSnackbar={setOpenSnackbar}
        setVariant={setVariant}
        setMessage={setMessage}
      />
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </div>
  );
}

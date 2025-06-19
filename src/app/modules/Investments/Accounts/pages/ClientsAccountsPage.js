import {
  AccountBalance,
  AccountBalanceWallet,
  Add,
  ArrowBack,
  BarChart,
  Business,
  CloudDownload,
  Edit,
  ExpandMore,
  FilterList,
  Group,
  MonetizationOn,
  MoreVert,
  Person,
  Print,
  Search,
  Star,
  StarBorder,
  TableChart,
  Visibility,
} from "@material-ui/icons";
import React, { useState } from "react";

// Mock data para las cuentas de clientes
const clientAccountsData = [
  {
    id: 1,
    clientId: 1,
    clientName: "María García López",
    clientEmail: "maria.garcia@correo.com",
    clientSegment: "Premium",
    clientType: "Individual",
    clientStatus: "Activo",
    accounts: [
      {
        id: "ACC001",
        accountNumber: "1234567890",
        accountType: "Cuenta Corriente",
        currency: "ARS",
        balance: 245000,
        availableBalance: 235000,
        status: "Activa",
        openingDate: "2022-03-15",
        lastTransaction: "2023-06-15",
        transactionsCount: 156,
        isPrimary: true,
        accountAlias: "Cuenta Principal",
        bankCode: "BANCO001",
        cbu: "1234567890123456789012",
        cvu: "0000003100012345678901",
      },
      {
        id: "ACC002",
        accountNumber: "0987654321",
        accountType: "Cuenta de Ahorro",
        currency: "USD",
        balance: 15000,
        availableBalance: 15000,
        status: "Activa",
        openingDate: "2022-05-20",
        lastTransaction: "2023-06-10",
        transactionsCount: 89,
        isPrimary: false,
        accountAlias: "Ahorros USD",
        bankCode: "BANCO002",
        cbu: "9876543210987654321098",
        cvu: "0000003100098765432109",
      },
    ],
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Carlos Rodríguez S.A.",
    clientEmail: "contacto@carlosrodriguez.com",
    clientSegment: "VIP",
    clientType: "Corporativo",
    clientStatus: "Activo",
    accounts: [
      {
        id: "ACC003",
        accountNumber: "5555666677",
        accountType: "Cuenta Corriente Empresarial",
        currency: "ARS",
        balance: 850000,
        availableBalance: 820000,
        status: "Activa",
        openingDate: "2021-08-10",
        lastTransaction: "2023-06-02",
        transactionsCount: 342,
        isPrimary: true,
        accountAlias: "Cuenta Empresarial",
        bankCode: "BANCO003",
        cbu: "5555666677555566667755",
        cvu: "0000003100055556666775",
      },
      {
        id: "ACC004",
        accountNumber: "7777888899",
        accountType: "Cuenta de Inversión",
        currency: "USD",
        balance: 25000,
        availableBalance: 25000,
        status: "Activa",
        openingDate: "2022-01-15",
        lastTransaction: "2023-05-28",
        transactionsCount: 67,
        isPrimary: false,
        accountAlias: "Inversiones USD",
        bankCode: "BANCO004",
        cbu: "7777888899777788889977",
        cvu: "0000003100077778888997",
      },
      {
        id: "ACC005",
        accountNumber: "9999000011",
        accountType: "Cuenta de Ahorro",
        currency: "EUR",
        balance: 18000,
        availableBalance: 18000,
        status: "Activa",
        openingDate: "2022-11-30",
        lastTransaction: "2023-06-01",
        transactionsCount: 45,
        isPrimary: false,
        accountAlias: "Ahorros EUR",
        bankCode: "BANCO005",
        cbu: "9999000011999900001199",
        cvu: "0000003100099990000119",
      },
    ],
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Ana Martínez Fernández",
    clientEmail: "ana.martinez@email.com",
    clientSegment: "Estándar",
    clientType: "Individual",
    clientStatus: "Activo",
    accounts: [
      {
        id: "ACC006",
        accountNumber: "1111222233",
        accountType: "Cuenta Corriente",
        currency: "ARS",
        balance: 120000,
        availableBalance: 115000,
        status: "Activa",
        openingDate: "2022-09-05",
        lastTransaction: "2023-05-28",
        transactionsCount: 78,
        isPrimary: true,
        accountAlias: "Cuenta Personal",
        bankCode: "BANCO006",
        cbu: "1111222233111122223311",
        cvu: "0000003100011112222331",
      },
    ],
  },
  {
    id: 4,
    clientId: 4,
    clientName: "Inversiones Globales SL",
    clientEmail: "info@inversionesglobales.es",
    clientSegment: "VIP",
    clientType: "Corporativo",
    clientStatus: "Activo",
    accounts: [
      {
        id: "ACC007",
        accountNumber: "4444555566",
        accountType: "Cuenta Corriente Empresarial",
        currency: "ARS",
        balance: 1500000,
        availableBalance: 1450000,
        status: "Activa",
        openingDate: "2020-12-01",
        lastTransaction: "2023-06-10",
        transactionsCount: 567,
        isPrimary: true,
        accountAlias: "Cuenta Principal Global",
        bankCode: "BANCO007",
        cbu: "4444555566444455556644",
        cvu: "0000003100044445555664",
      },
      {
        id: "ACC008",
        accountNumber: "6666777788",
        accountType: "Cuenta de Inversión",
        currency: "USD",
        balance: 50000,
        availableBalance: 50000,
        status: "Activa",
        openingDate: "2021-03-20",
        lastTransaction: "2023-06-05",
        transactionsCount: 234,
        isPrimary: false,
        accountAlias: "Inversiones Internacionales",
        bankCode: "BANCO008",
        cbu: "6666777788666677778866",
        cvu: "0000003100066667777886",
      },
    ],
  },
  {
    id: 5,
    clientId: 5,
    clientName: "Javier Pérez Ruiz",
    clientEmail: "javier.perez@dominio.com",
    clientSegment: "Estándar",
    clientType: "Individual",
    clientStatus: "Prospecto",
    accounts: [
      {
        id: "ACC009",
        accountNumber: "8888999900",
        accountType: "Cuenta Corriente",
        currency: "ARS",
        balance: 75000,
        availableBalance: 70000,
        status: "Pendiente",
        openingDate: "2023-04-22",
        lastTransaction: "2023-04-22",
        transactionsCount: 12,
        isPrimary: true,
        accountAlias: "Cuenta Nueva",
        bankCode: "BANCO009",
        cbu: "8888999900888899990088",
        cvu: "0000003100088889999008",
      },
    ],
  },
  {
    id: 6,
    clientId: 6,
    clientName: "Fondo Capital Innovación",
    clientEmail: "contacto@fci.es",
    clientSegment: "VIP",
    clientType: "Corporativo",
    clientStatus: "Activo",
    accounts: [
      {
        id: "ACC010",
        accountNumber: "2222333344",
        accountType: "Cuenta Corriente Empresarial",
        currency: "ARS",
        balance: 3200000,
        availableBalance: 3100000,
        status: "Activa",
        openingDate: "2019-06-15",
        lastTransaction: "2023-06-18",
        transactionsCount: 892,
        isPrimary: true,
        accountAlias: "Cuenta Fondo Principal",
        bankCode: "BANCO010",
        cbu: "2222333344222233334422",
        cvu: "0000003100022223333442",
      },
      {
        id: "ACC011",
        accountNumber: "3333444455",
        accountType: "Cuenta de Inversión",
        currency: "USD",
        balance: 75000,
        availableBalance: 75000,
        status: "Activa",
        openingDate: "2020-01-10",
        lastTransaction: "2023-06-12",
        transactionsCount: 445,
        isPrimary: false,
        accountAlias: "Inversiones USD",
        bankCode: "BANCO011",
        cbu: "3333444455333344445533",
        cvu: "0000003100033334444553",
      },
      {
        id: "ACC012",
        accountNumber: "4444555566",
        accountType: "Cuenta de Ahorro",
        currency: "EUR",
        balance: 45000,
        availableBalance: 45000,
        status: "Activa",
        openingDate: "2021-08-25",
        lastTransaction: "2023-06-08",
        transactionsCount: 178,
        isPrimary: false,
        accountAlias: "Ahorros EUR",
        bankCode: "BANCO012",
        cbu: "4444555566444455556644",
        cvu: "0000003100044445555664",
      },
    ],
  },
];

const ClientsAccountsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClient, setExpandedClient] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("cards");
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const toggleExpandClient = (id) => {
    if (expandedClient === id) {
      setExpandedClient(null);
    } else {
      setExpandedClient(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredClients = clientAccountsData.filter((client) => {
    const typeMatch =
      activeFilter === "all" ||
      (activeFilter === "featured" && client.clientSegment === "VIP") ||
      activeFilter === client.clientType.toLowerCase();

    const segmentMatch =
      segmentFilter === "all" ||
      segmentFilter === client.clientSegment.toLowerCase();

    const statusMatch =
      statusFilter === "all" ||
      statusFilter === client.clientStatus.toLowerCase();

    const searchMatch =
      client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.clientType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.accounts.some(
        (account) =>
          account.accountNumber.includes(searchQuery) ||
          account.accountAlias.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return typeMatch && segmentMatch && statusMatch && searchMatch;
  });

  // Calcular estadísticas
  const totalClients = clientAccountsData.length;
  const totalAccounts = clientAccountsData.reduce(
    (sum, client) => sum + client.accounts.length,
    0
  );
  const totalBalance = clientAccountsData.reduce(
    (sum, client) =>
      sum +
      client.accounts.reduce((accSum, account) => accSum + account.balance, 0),
    0
  );
  const vipClients = clientAccountsData.filter(
    (client) => client.clientSegment === "VIP"
  ).length;

  // Contar por tipo
  const clientTypes = [
    ...new Set(clientAccountsData.map((client) => client.clientType)),
  ];
  const typeCounts = clientTypes.map((type) => ({
    type,
    count: clientAccountsData.filter((client) => client.clientType === type)
      .length,
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
        return "#FFA800";
      case "Premium":
        return "#8950FC";
      default:
        return "#3699FF";
    }
  };

  // Obtener color basado en el estado de la cuenta
  const getAccountStatusColor = (status) => {
    switch (status) {
      case "Activa":
        return "#0BB783";
      case "Pendiente":
        return "#FFA800";
      case "Suspendida":
        return "#F64E60";
      default:
        return "#7E8299";
    }
  };

  // Formatear moneda
  const formatCurrency = (amount, currency = "ARS") => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
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

  // Componente para mostrar una cuenta individual
  const AccountCard = ({ account, clientName }) => (
    <div
      className="card card-custom gutter-b shadow-sm border-left-primary"
      style={{ borderLeftWidth: "4px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-50 symbol-circle mr-4">
              <span className="symbol-label bg-light-primary">
                <AccountBalanceWallet
                  style={{ fontSize: 24, color: "#3699FF" }}
                />
              </span>
            </div>
            <div>
              <h5 className="text-dark font-weight-bolder mb-0">
                {account.accountAlias}
              </h5>
              <span className="text-muted font-weight-bold">
                {account.accountNumber}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            {account.isPrimary && (
              <span className="label label-sm label-primary label-inline font-weight-bold mr-2">
                Principal
              </span>
            )}
            <span
              className="label label-sm label-inline font-weight-bold"
              style={{
                backgroundColor: getAccountStatusColor(account.status),
                color: "#fff",
              }}
            >
              {account.status}
            </span>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold mb-1">
                Saldo Total
              </span>
              <span className="text-dark font-weight-bolder font-size-h5">
                {formatCurrency(account.balance, account.currency)}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold mb-1">
                Saldo Disponible
              </span>
              <span className="text-success font-weight-bolder font-size-h5">
                {formatCurrency(account.availableBalance, account.currency)}
              </span>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold mb-1">
                Tipo de Cuenta
              </span>
              <span className="text-dark font-weight-bold">
                {account.accountType}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold mb-1">
                Transacciones
              </span>
              <span className="text-primary font-weight-bolder">
                {account.transactionsCount}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-muted font-weight-bold d-block mb-2">
            Información de Pago:
          </span>
          <div className="bg-light-primary rounded p-3">
            <div className="row">
              <div className="col-6">
                <small className="text-muted d-block">CBU</small>
                <span className="text-dark font-weight-bold">
                  {account.cbu}
                </span>
              </div>
              <div className="col-6">
                <small className="text-muted d-block">CVU</small>
                <span className="text-dark font-weight-bold">
                  {account.cvu}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted d-block">Última Transacción</small>
            <span className="text-dark font-weight-bold">
              {formatDate(account.lastTransaction)}
            </span>
          </div>
          <div className="d-flex">
            <button className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2">
              <Visibility style={{ color: "#3699FF" }} />
            </button>
            <button className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2">
              <Edit style={{ color: "#FFA800" }} />
            </button>
            <button className="btn btn-clean btn-hover-light-primary btn-sm btn-icon">
              <MoreVert style={{ color: "#B5B5C3" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                  Cuentas de Clientes
                </span>
              </span>
              <span className="text-muted mt-2 font-weight-bold font-size-lg">
                Gestión integral de cuentas bancarias de nuestros clientes
                inversores
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button className="btn btn-light-primary font-weight-bold mr-4">
                <BarChart className="mr-2" /> Análisis de Cuentas
              </button>
              <button className="btn btn-primary font-weight-bold">
                <Add className="mr-2" /> Nueva Cuenta
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
                  <Group style={{ fontSize: 24, color: "#3699FF" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Clientes Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-primary">
                  {totalClients}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-success mr-4">
                <span className="symbol-label bg-white">
                  <AccountBalance style={{ fontSize: 24, color: "#0BB783" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Cuentas Totales
                </div>
                <div className="font-size-h3 font-weight-bolder text-success">
                  {totalAccounts}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="symbol symbol-50 symbol-light-warning mr-4">
                <span className="symbol-label bg-white">
                  <MonetizationOn style={{ fontSize: 24, color: "#FFA800" }} />
                </span>
              </div>
              <div>
                <div className="font-size-sm text-muted font-weight-bold">
                  Saldo Total
                </div>
                <div className="font-size-h3 font-weight-bolder text-warning">
                  {formatCurrency(totalBalance)}
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
                  Clientes VIP
                </div>
                <div className="font-size-h3 font-weight-bolder text-info">
                  {vipClients}
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
                {clientTypes.map((type) => (
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

              {/* Filtro por estado */}
              <div className="ml-4">
                <select
                  className="form-control form-control-solid"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los Estados</option>
                  <option value="activo">Activo</option>
                  <option value="prospecto">Prospecto</option>
                  <option value="suspendido">Suspendido</option>
                </select>
              </div>
            </div>

            {/* Búsqueda */}
            <div className="d-flex align-items-center flex-grow-1 mb-4">
              <div className="input-icon input-icon-right w-100">
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Buscar cliente, cuenta, número..."
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
                {viewMode === "cards" ? <TableChart /> : <AccountBalance />}
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
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="col-xl-6 col-xxl-4 col-lg-6 col-md-12 mb-8"
            >
              <div
                className={`card card-custom gutter-b shadow-sm ${
                  client.clientSegment === "VIP"
                    ? "border-left-warning"
                    : client.clientSegment === "Premium"
                    ? "border-left-primary"
                    : "border-left-info"
                }`}
                style={{ borderLeftWidth: "4px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-60 symbol-circle mr-5">
                        <span className="symbol-label bg-light-primary">
                          {getTypeIcon(client.clientType)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark font-weight-bolder mb-0">
                          {client.clientName}
                        </h4>
                        <div className="d-flex align-items-center mt-1">
                          <span
                            className="label label-sm label-inline font-weight-bold"
                            style={{
                              backgroundColor: getSegmentColor(
                                client.clientSegment
                              ),
                              color: "#fff",
                            }}
                          >
                            {client.clientSegment}
                          </span>
                          <span className="label label-sm label-light-info label-inline font-weight-bold ml-2">
                            {client.clientType}
                          </span>
                          <span
                            className={`label label-sm label-inline font-weight-bold ml-2 ${
                              client.clientStatus === "Activo"
                                ? "label-success"
                                : "label-warning"
                            }`}
                          >
                            {client.clientStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <button
                        className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                        onClick={() => toggleFavorite(client.id)}
                      >
                        {favorites.includes(client.id) ? (
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
                          href={`mailto:${client.clientEmail}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {client.clientEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Total de Cuentas
                        </span>
                        <span className="text-dark font-weight-bolder font-size-h5">
                          {client.accounts.length}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold mb-1">
                          Saldo Total
                        </span>
                        <span className="text-success font-weight-bolder font-size-h5">
                          {formatCurrency(
                            client.accounts.reduce(
                              (sum, account) => sum + account.balance,
                              0
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable accounts */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link btn-sm p-0 d-flex align-items-center text-primary font-weight-bold"
                      onClick={() => toggleExpandClient(client.id)}
                    >
                      <span>Ver cuentas ({client.accounts.length})</span>
                      <ExpandMore
                        className={`ml-1 transition ${
                          expandedClient === client.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expandedClient === client.id && (
                      <div className="mt-4 pt-4 border-top">
                        <div className="row">
                          {client.accounts.map((account) => (
                            <div key={account.id} className="col-12 mb-4">
                              <AccountCard
                                account={account}
                                clientName={client.clientName}
                              />
                            </div>
                          ))}
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
                    <th className="min-w-200px">Cliente</th>
                    <th className="min-w-150px">Contacto</th>
                    <th className="min-w-120px">Tipo</th>
                    <th className="min-w-100px">Segmento</th>
                    <th className="min-w-100px">Estado</th>
                    <th className="min-w-120px">Cuentas</th>
                    <th className="min-w-120px">Saldo Total</th>
                    <th className="min-w-100px">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="symbol symbol-40 symbol-circle mr-4">
                            <span className="symbol-label bg-light-primary">
                              {getTypeIcon(client.clientType)}
                            </span>
                          </div>
                          <div>
                            <span className="text-dark font-weight-bolder d-block">
                              {client.clientName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href={`mailto:${client.clientEmail}`}
                          className="text-dark text-hover-primary d-block"
                        >
                          {client.clientEmail}
                        </a>
                      </td>
                      <td>
                        <span className="text-muted font-weight-bold">
                          {client.clientType}
                        </span>
                      </td>
                      <td>
                        <span
                          className="label label-inline font-weight-bold"
                          style={{
                            backgroundColor: getSegmentColor(
                              client.clientSegment
                            ),
                            color: "#fff",
                          }}
                        >
                          {client.clientSegment}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`label label-inline font-weight-bold ${
                            client.clientStatus === "Activo"
                              ? "label-success"
                              : "label-warning"
                          }`}
                        >
                          {client.clientStatus}
                        </span>
                      </td>
                      <td>
                        <span className="text-primary font-weight-bolder">
                          {client.accounts.length}
                        </span>
                      </td>
                      <td>
                        <span className="text-dark font-weight-bolder d-block">
                          {formatCurrency(
                            client.accounts.reduce(
                              (sum, account) => sum + account.balance,
                              0
                            )
                          )}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon mr-2"
                            onClick={() => toggleFavorite(client.id)}
                          >
                            {favorites.includes(client.id) ? (
                              <Star style={{ color: "#FFA800" }} />
                            ) : (
                              <StarBorder style={{ color: "#B5B5C3" }} />
                            )}
                          </button>
                          <button
                            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                            onClick={() => toggleExpandClient(client.id)}
                          >
                            <ExpandMore
                              className={`transition ${
                                expandedClient === client.id
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
      {filteredClients.length === 0 && (
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
                setStatusFilter("all");
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

export default ClientsAccountsPage;

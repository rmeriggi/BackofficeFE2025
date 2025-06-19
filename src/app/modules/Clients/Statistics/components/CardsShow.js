import {
  AccountBalance,
  AccountBalanceWallet,
  /*   Analytics, */
  Business,
  CalendarToday,
  CheckCircle,
  CloudDownload,
  ExpandLess,
  ExpandMore,
  GridOn,
  Info,
  List,
  MonetizationOn,
  MoreVert,
  Payment,
  Print,
  Refresh,
  Security,
  Share,
  Speed,
  TrendingDown,
  TrendingUp,
  Visibility,
} from "@material-ui/icons";
import React from "react";
import { formatAmount } from "../../../../utils/formatData";

function dataArrayCards(statistics) {
  const { balances } = statistics;
  const dataCards = [
    {
      amount: balances.master,
      title: "Saldo master cuenta",
      icon: <AccountBalance style={{ fontSize: 28, color: "#3699FF" }} />,
      color: "primary",
      bgColor: "light-primary",
      trend: "+8.5%",
      trendDirection: "up",
      subtitle: "Saldo total en cuenta master",
      status: "active",
    },
    {
      amount: balances.accounts,
      title: "Saldo sum cuentas",
      icon: <AccountBalanceWallet style={{ fontSize: 28, color: "#0BB783" }} />,
      color: "success",
      bgColor: "light-success",
      trend: "+12.3%",
      trendDirection: "up",
      subtitle: "Suma de todas las cuentas",
      status: "active",
    },
    {
      amount: balances.itau,
      title: "Saldo Banco Sponsor",
      icon: <Business style={{ fontSize: 28, color: "#FFA800" }} />,
      color: "warning",
      bgColor: "light-warning",
      trend: "+5.2%",
      trendDirection: "up",
      subtitle: "Saldo en banco patrocinador",
      status: "active",
    },
    {
      amount: balances.cashin,
      title: "Sum cash-in",
      icon: <MonetizationOn style={{ fontSize: 28, color: "#0BB783" }} />,
      color: "success",
      bgColor: "light-success",
      trend: "+15.7%",
      trendDirection: "up",
      subtitle: "Total de ingresos",
      status: "active",
    },
    {
      amount: balances.cashout,
      title: "Sum cash-out",
      icon: <Payment style={{ fontSize: 28, color: "#F64E60" }} />,
      color: "danger",
      bgColor: "light-danger",
      trend: "+3.1%",
      trendDirection: "up",
      subtitle: "Total de egresos",
      status: "active",
    },
  ];
  return dataCards;
}

export default function CardsShow({ data }) {
  const [viewMode, setViewMode] = React.useState("grid");
  const [sortBy, setSortBy] = React.useState("amount");
  const [showDetails, setShowDetails] = React.useState(false);

  const dataCards = dataArrayCards(data);
  const formatedCards = formatAmount(dataCards);

  const handleSort = (field) => {
    setSortBy(field);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const sortedCards = [...formatedCards].sort((a, b) => {
    if (sortBy === "amount") {
      return (
        parseFloat(b.amount.replace(/[^\d.-]/g, "")) -
        parseFloat(a.amount.replace(/[^\d.-]/g, ""))
      );
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="mb-8">
      {/* Header de la sección */}
      <div className="card card-custom gutter-b bg-light-info mb-6">
        <div className="card-body py-6 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-50 symbol-light-info mr-6">
                {/*    <span className="symbol-label bg-white">
                  <Analytics style={{ fontSize: 24, color: "#3699FF" }} />
                </span> */}
              </div>
              <div>
                <h2 className="text-dark font-weight-bolder font-size-h3 mb-1">
                  Resumen de Saldos
                </h2>
                <p className="text-muted font-size-lg mb-0">
                  Vista detallada de todos los saldos y movimientos
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-4">
                <span className="text-dark font-weight-bold mr-3">
                  Ordenar por:
                </span>
                <select
                  className="form-control form-control-sm w-150px"
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="amount">Monto</option>
                  <option value="title">Título</option>
                </select>
              </div>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={toggleViewMode}
                title={viewMode === "grid" ? "Vista lista" : "Vista grilla"}
              >
                {viewMode === "grid" ? <List /> : <GridOn />}
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={toggleDetails}
                title={showDetails ? "Ocultar detalles" : "Mostrar detalles"}
              >
                {showDetails ? <ExpandLess /> : <ExpandMore />}
              </button>
              <button className="btn btn-light btn-icon mr-2" title="Exportar">
                <CloudDownload />
              </button>
              <button className="btn btn-light btn-icon mr-2" title="Compartir">
                <Share />
              </button>
              <button className="btn btn-light btn-icon" title="Imprimir">
                <Print />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards mejoradas */}
      <div className={`${viewMode === "grid" ? "row" : ""}`}>
        {sortedCards.map((card, index) => (
          <div
            key={card.title}
            className={`${
              viewMode === "grid"
                ? "col-xl col-lg-3 col-md-4 col-sm-6 mb-6"
                : "mb-4"
            }`}
          >
            <div
              className={`card card-custom gutter-b shadow-sm hover-elevate-up ${
                viewMode === "list" ? "card-stretch" : ""
              }`}
            >
              <div
                className={`card-body ${viewMode === "list" ? "p-8" : "p-6"}`}
              >
                <div
                  className={`d-flex ${
                    viewMode === "list"
                      ? "align-items-center"
                      : "flex-column text-center"
                  }`}
                >
                  {/* Icono */}
                  <div
                    className={`symbol symbol-50 symbol-light-${card.color} ${
                      viewMode === "list" ? "mr-6" : "mb-4"
                    }`}
                  >
                    <span className="symbol-label bg-white">{card.icon}</span>
                  </div>

                  {/* Contenido */}
                  <div
                    className={`flex-grow-1 ${
                      viewMode === "list"
                        ? "d-flex align-items-center justify-content-between"
                        : ""
                    }`}
                  >
                    <div className={viewMode === "list" ? "flex-grow-1" : ""}>
                      <div className="text-muted font-weight-bold font-size-sm mb-1">
                        {card.title}
                      </div>
                      <div
                        className={`font-size-h3 font-weight-bolder text-${card.color} mb-2`}
                      >
                        {card.amount}
                      </div>

                      {/* Trend indicator */}
                      <div className="d-flex align-items-center mb-2">
                        {card.trendDirection === "up" ? (
                          <TrendingUp
                            style={{
                              fontSize: 16,
                              color: "#0BB783",
                              marginRight: 4,
                            }}
                          />
                        ) : (
                          <TrendingDown
                            style={{
                              fontSize: 16,
                              color: "#F64E60",
                              marginRight: 4,
                            }}
                          />
                        )}
                        <span
                          className={`text-${
                            card.trendDirection === "up" ? "success" : "danger"
                          } font-weight-bold font-size-sm`}
                        >
                          {card.trend} vs mes anterior
                        </span>
                      </div>

                      {/* Subtitle */}
                      <div className="text-muted font-size-sm">
                        {card.subtitle}
                      </div>
                    </div>

                    {/* Status indicator para vista lista */}
                    {viewMode === "list" && (
                      <div className="d-flex align-items-center">
                        <div
                          className={`badge badge-${
                            card.status === "active" ? "success" : "warning"
                          } badge-pill mr-3`}
                        >
                          {card.status === "active" ? "Activo" : "Pendiente"}
                        </div>
                        <button className="btn btn-light btn-icon btn-sm">
                          <MoreVert />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detalles expandibles */}
                {showDetails && (
                  <div className="mt-6 pt-6 border-top">
                    <div className="row">
                      <div className="col-6">
                        <div className="d-flex align-items-center mb-3">
                          <Speed
                            style={{
                              fontSize: 16,
                              color: "#3699FF",
                              marginRight: 8,
                            }}
                          />
                          <div>
                            <div className="text-muted font-size-xs">
                              Velocidad
                            </div>
                            <div className="font-weight-bold font-size-sm">
                              Alta
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center mb-3">
                          <Security
                            style={{
                              fontSize: 16,
                              color: "#0BB783",
                              marginRight: 8,
                            }}
                          />
                          <div>
                            <div className="text-muted font-size-xs">
                              Seguridad
                            </div>
                            <div className="font-weight-bold font-size-sm">
                              Verificado
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center mb-3">
                          <CheckCircle
                            style={{
                              fontSize: 16,
                              color: "#FFA800",
                              marginRight: 8,
                            }}
                          />
                          <div>
                            <div className="text-muted font-size-xs">
                              Estado
                            </div>
                            <div className="font-weight-bold font-size-sm">
                              Activo
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center mb-3">
                          <CalendarToday
                            style={{
                              fontSize: 16,
                              color: "#8950FC",
                              marginRight: 8,
                            }}
                          />
                          <div>
                            <div className="text-muted font-size-xs">
                              Última actualización
                            </div>
                            <div className="font-weight-bold font-size-sm">
                              Hace 2h
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Acciones rápidas */}
                    <div className="d-flex justify-content-between mt-4">
                      <button className="btn btn-light-primary btn-sm">
                        <Visibility className="mr-1" />
                        Ver detalles
                      </button>
                      <button className="btn btn-light-success btn-sm">
                        <CloudDownload className="mr-1" />
                        Exportar
                      </button>
                      <button className="btn btn-light-warning btn-sm">
                        <Share className="mr-1" />
                        Compartir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con estadísticas */}
      <div className="card card-custom gutter-b bg-light-gray-100">
        <div className="card-body py-4 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Info
                style={{ fontSize: 20, color: "#3699FF", marginRight: 8 }}
              />
              <span className="text-muted font-size-sm">
                Mostrando {sortedCards.length} de {sortedCards.length} saldos
              </span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted font-size-sm mr-4">
                Total:{" "}
                {formatedCards
                  .reduce((sum, card) => {
                    const amount =
                      parseFloat(card.amount.replace(/[^\d.-]/g, "")) || 0;
                    return sum + amount;
                  }, 0)
                  .toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
              </span>
              <button className="btn btn-light btn-sm">
                <Refresh className="mr-1" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const DashboardPage = lazy(() => import("./Dashboard/pages/DashboardPage.js"));

const OperationsPage = lazy(() =>
  import("./Operations/pages/OperationsPage.js")
);

const ProductsPPRouter = lazy(() =>
  import("./ProductsPP/pages/ProductsPPRouter.js")
);
const PpRouter = lazy(() => import("./PP/pages/PpRouter.js"));

const PpInvestmentsRouter = lazy(() =>
  import("./PpInvestments/pages/PpInvestmentsRouter.js")
);

const ManagementPpRouter = lazy(() =>
  import("./ManagementPP/pages/ManagementPpRouter.js")
);

const CreatePpRouter = lazy(() => import("./CreatePp/pages/CreatePpRouter.js"));

const AccountsPage = lazy(() => import("./Accounts/pages/AccountsPage.js"));

const AgentsPage = lazy(() => import("./Agents/pages/AgentsPage.js"));

const ClientsPage = lazy(() => import("./Clients/pages"));

const ComisionsPage = lazy(() => import("./Comisions/pages/ComisionsPage.js"));

const DepositaryCompaniesPage = lazy(() =>
  import("./Depositary-companies/pages/DepositaryCompaniesPage.js")
);

const IntegrationsPage = lazy(() =>
  import("./Integrations/pages/IntegrationsPage.js")
);

const InvestmentClientsPage = lazy(() =>
  import("./Investment-clients/pages/InvestmentClientsPage.js")
);

const ManagingCompaniesPage = lazy(() =>
  import("./Managing-companies/pages/ManagingCompaniesPage.js")
);

const MarketPage = lazy(() => import("./Market/pages/MarketPage.js"));

const NormativePage = lazy(() => import("./Normative/pages/NormativePage.js"));

const OperatorsDashboardPage = lazy(() =>
  import("./Operators-dashboard/pages/OperatorsDashboardPage.js")
);

const ProductsPage = lazy(() => import("./Products/pages/ProductsPage.js"));
const SettlementsRouter = lazy(() =>
  import("./Settlements/pages/SettlementsRouter.js")
);

const TransactionsPage = lazy(() =>
  import("./Transactions/pages/TransactionsPage.js")
);

const TestTablePage = lazy(() => import("./Test-Table/pages/TestTablePage.js"));

const ExternalTablePage = lazy(() =>
  import("./External-Client/pages/ExternalClientPage.js")
);

const WalletPage = lazy(() => import("./Wallet/pages/WalletPage.js"));

const BlotterPage = lazy(() => import("./Blotter/pages/BlotterPage.js"));

const BlotterCashPage = lazy(() =>
  import("./BlotterCash/pages/BlotterCashPage.js")
);

const BlotterPnlPage = lazy(() =>
  import("./Blotterpnl/pages/BlotterPnlPage.js")
);

const BlotterCounterpartsPage = lazy(() =>
  import("./BlotterCounterparts/pages/BlotterCounterpartsPage.js")
);

const SpeciesPage = lazy(() => import("./Species/pages/SpeciesPage.js"));

const InvestmentsToolsPage = lazy(() =>
  import("./InvestmentsTools/pages/InvestmentsTools.js")
);

const InvestmentsClientsPage = lazy(() =>
  import("./InvestmentsClients/pages/InvestmentsClients.js")
);

export default function InvestmentsRouter() {
  const access = useSelector((state) => state.auth.access);
  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/dashboard"}
        component={checkRouteAccess(
          "investments.Dashboard inversiones",
          DashboardPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/products"}
        component={checkRouteAccess(
          "investments.Productos de Inversión",
          ProductsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/accounts"}
        component={checkRouteAccess(
          "investments.Cuentas de Inversión",
          AccountsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/clients"}
        component={checkRouteAccess(
          "investments.Inversiones Clientes",
          ClientsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/operations"}
        component={checkRouteAccess(
          "investments.Operaciones",
          OperationsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/transactions"}
        component={checkRouteAccess(
          "investments.Transacciones Ctas. Inv.",
          TransactionsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/normative"}
        component={checkRouteAccess(
          "investments.Normativa",
          NormativePage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/agents"}
        component={checkRouteAccess("investments.Agentes", AgentsPage, access)}
      />
      <Route
        path={baseRouterUrl + "/managing-companies"}
        component={checkRouteAccess(
          "investments.Socidades Gerente",
          ManagingCompaniesPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/depositary-companies"}
        component={checkRouteAccess(
          "investments.Sociedades Depositarias",
          DepositaryCompaniesPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/integrations"}
        component={checkRouteAccess(
          "investments.Integraciones",
          IntegrationsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/operators-dashboard"}
        component={checkRouteAccess(
          "investments.Dashboard Operadores",
          OperatorsDashboardPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/comisions"}
        component={checkRouteAccess(
          "investments.Comisiones Operadores",
          ComisionsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/investment-clients"}
        component={checkRouteAccess(
          "investments.Clientes de Inversión",
          InvestmentClientsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/market"}
        component={checkRouteAccess("investments.Mercados", MarketPage, access)}
      />
      <Route
        path={baseRouterUrl + "/testtable"}
        component={checkRouteAccess(
          "investments.Mercados",
          TestTablePage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/external"}
        component={checkRouteAccess(
          "investments.Mercados",
          ExternalTablePage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/wallet"}
        component={checkRouteAccess("investments.Mercados", WalletPage, access)}
      />
      <Route
        path={baseRouterUrl + "/blotter"}
        component={checkRouteAccess("investments.Blotter", BlotterPage, access)}
      />
      <Route
        path={baseRouterUrl + "/blottercahs"}
        component={checkRouteAccess(
          "investments.Blotter",
          BlotterCashPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/pnl"}
        component={checkRouteAccess(
          "investments.Blotter",
          BlotterPnlPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/contrapartes"}
        component={checkRouteAccess(
          "investments.Blotter",
          BlotterCounterpartsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/species"}
        component={checkRouteAccess(
          "investments.Especies",
          SpeciesPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/productspp"}
        component={checkRouteAccess(
          "investments.Productos Plazo Fijo",
          ProductsPPRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/pp"}
        component={checkRouteAccess(
          "investments.Plazos Fijos",
          PpRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/newpp"}
        component={checkRouteAccess(
          "investments.Creación Plazo Fijo",
          CreatePpRouter,
          access
        )}
      />

      <Route
        path={baseRouterUrl + "/adminpp"}
        component={checkRouteAccess(
          "investments.Gestión Plazos Fijos",
          ManagementPpRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/liquidationpp"}
        component={checkRouteAccess(
          "investments.Liquidaciones",
          SettlementsRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/pfinvesments"}
        component={checkRouteAccess(
          "investments.Plazo Fijo Inversiones",
          PpInvestmentsRouter,
          access
        )}
      />

      <Route
        path={baseRouterUrl + "/tools"}
        component={checkRouteAccess(
          "investments.Plazo Fijo Inversiones",
          InvestmentsToolsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/clients-tools"}
        component={checkRouteAccess(
          "investments.Clientes de Inversión",
          InvestmentsClientsPage,
          access
        )}
      />

      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

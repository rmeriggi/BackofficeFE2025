import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const AccountsPage = lazy(() =>
  import("../Accounting/Accounts/pages/AccountsPage")
);

const AuxiliaryAccounts = lazy(() =>
  import("../Accounting/AuxiliaryAccounts/pages/AuxiliaryAccountsPage")
);

const DashboardPage = lazy(() => import("./dashboard/pages/DashboardPage"));

const AccountingGroupsPage = lazy(() =>
  import("./AccountingGroups/pages/AccountingGroupsPage")
);

const SubaccountsPage = lazy(() =>
  import("./Subaccounts/pages/SubaccountsPage")
);

const AccountingEntriesPage = lazy(() =>
  import("./AccountingEntries/pages/AccountingEntriesPage")
);

const AccountingPlanPage = lazy(() =>
  import("./AccountingPlan/pages/AccountingPlanPage")
);

const TemplatesEntriesPage = lazy(() =>
  import("./TemplatesEntries/pages/TemplatesEntriesPage")
);

const BalancesPage = lazy(() => import("./Balances/pages/BalancesPage"));

const DiaryBookPage = lazy(() => import("./DiaryBook/pages/DiaryBookPage"));

const MayorBookPage = lazy(() => import("./MayorBook/pages/MayorBookPage"));

const VatSalesPage = lazy(() => import("./VatSales/pages/VatSalesPage"));

const VatPurchasesPage = lazy(() =>
  import("./VatPurchases/pages/VatPurchasesPage")
);
const LedgerBalancePage = lazy(() =>
  import("./LedgerBalance/pages/LedgerBalancePage")
);

const ConciliationPage = lazy(() =>
  import("./Conciliation/pages/ConciliationPage")
);

export default function AccountingRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/accounting";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/dashboard"}
        component={checkRouteAccess(
          "accounting.Dashboard",
          DashboardPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/accounts"}
        component={checkRouteAccess("accounting.Cuentas", AccountsPage, access)}
      />
      <Route
        path={baseRouterUrl + "/auxiliary-accounts"}
        component={checkRouteAccess(
          "accounting.Cuenta Auxiliar",
          AuxiliaryAccounts,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/accounting-groups"}
        component={checkRouteAccess(
          "accounting.Grupos Contables",
          AccountingGroupsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/subaccounts"}
        component={checkRouteAccess(
          "accounting.Subcuentas",
          SubaccountsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/auxiliary-accounts"}
        component={checkRouteAccess(
          "accounting.Cuentas Auxiliares",
          SubaccountsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/accounting-entries"}
        component={checkRouteAccess(
          "accounting.Asientos Contables",
          AccountingEntriesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/accounting-plan"}
        component={checkRouteAccess(
          "accounting.Plan Contable",
          AccountingPlanPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/templates-entries"}
        component={checkRouteAccess(
          "accounting.Plantillas Asientos",
          TemplatesEntriesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/balances"}
        component={checkRouteAccess(
          "accounting.Sumas y Saldos",
          BalancesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/diaryBook"}
        component={checkRouteAccess(
          "accounting.Libro diario",
          DiaryBookPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/mayorBook"}
        component={checkRouteAccess(
          "accounting.Libro mayor",
          MayorBookPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/ivaventas"}
        component={checkRouteAccess(
          "accounting.IVA Ventas",
          VatSalesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/ivacompras"}
        component={checkRouteAccess(
          "accounting.IVA Compras",
          VatPurchasesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/ledgerBalance"}
        component={checkRouteAccess(
          "accounting.Mayor de Saldos",
          LedgerBalancePage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/conciliation"}
        component={checkRouteAccess(
          "accounting.Conciliación Bancaria",
          ConciliationPage,
          access
        )}
      />

      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const AccountsPage = lazy(() =>
     import("./Accounts/pages/AccountsPage.js")
);

const TransactionsPage = lazy(() =>
     import("./Transactions/pages/TransactionsPage.js")
);

const AdjustmentPage = lazy(() =>
    import("./Adjustment/pages/AdjustmentPage.js")
);

const DashboardPage = lazy(() => 
    import("./Dashboard/pages/DashboardPage.js")
);

const BalancesPage = lazy(() => 
    import("./Balances/pages/BalancesPage.js")
);

export default function AccountsRouter() {

    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/accounts';

    return (
        <Switch>
            <ContentRoute
                path={baseRouterUrl + '/accounts'}
                component={checkRouteAccess('accounts.Cuentas', AccountsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/transactions'}
                component={checkRouteAccess('accounts.Transacciones', TransactionsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/settings'}
                component={checkRouteAccess('accounts.Ajustes', AdjustmentPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/dashboard'}
                component={checkRouteAccess('accounts.Dashboard', DashboardPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/balances'}
                component={checkRouteAccess('accounts.Saldos', BalancesPage, access)} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

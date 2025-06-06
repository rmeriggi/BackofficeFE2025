import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const ColectionPage = lazy(() =>
     import("./Collection/pages/CollectionPage.js")
);

const OperationsPage = lazy(() =>
     import("./Operations/pages/OperationsPage.js")
);

const ItauMovementsPage = lazy(() =>
     import("./Itau/pages/ItauMovementsPage.js")
);

const BankValuesPage = lazy(() =>
     import("./BankValues/pages/BankValuesMovementsPage.js")
);

const CollectionsNCPage = lazy(() =>
     import("./CollectionsNC/pages/CollectionsNCPage.js")
);

const BalancesItauPage = lazy(() =>
     import("./BalancesItau/pages/BalancesItauPage.js")
);

export default function CashRouter() {

    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/cash';

    return (
        <Switch>
            <Route path={baseRouterUrl + '/collection'} component={checkRouteAccess('cash.Cobranzas', ColectionPage, access)} />
            <Route path={baseRouterUrl + '/operations'} component={OperationsPage} />
            <Route path={baseRouterUrl + '/itau'} component={ItauMovementsPage} />
            <Route path={baseRouterUrl + '/values'} component={BankValuesPage} />
            <Route path={baseRouterUrl + '/nccollections'} component={CollectionsNCPage} />
            <Route path={baseRouterUrl + '/balances-itau'} component={BalancesItauPage} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

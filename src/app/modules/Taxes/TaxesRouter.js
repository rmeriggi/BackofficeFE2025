import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const TaxesPage = lazy(() =>
     import("./Taxes/pages/TaxesPage.js")
);

const LiquidationsPage = lazy(() =>
     import("./Liquidations/pages/LiquidationsPage.js")
);

export default function TaxesRouter() {

    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/taxes';

    return (
        <Switch>
            <Route path={baseRouterUrl + '/taxes'} component={checkRouteAccess('taxes.Impuestos', TaxesPage, access)} />
            <Route path={baseRouterUrl + '/liquidations'} component={checkRouteAccess('taxes.Liquidaciones', LiquidationsPage, access)} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";

const ReportsPage = lazy(() =>
     import("./pages/ReportsPage.js")
);

export default function ReportsRouter() {

    const baseRouterUrl = '/reports';

    return (
        <Switch>
            <Route path={baseRouterUrl + '/clients'} component={ ReportsPage} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

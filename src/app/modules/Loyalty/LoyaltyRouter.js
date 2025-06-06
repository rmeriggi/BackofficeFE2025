import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const ProgramsPage = lazy(() =>
     import("./Programs/pages/ProgramsPage")
);

export default function ProgramsRouter() {
    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/loyalty';

    return (
        <Switch>
            <ContentRoute
                path={baseRouterUrl + '/programs'}
                component={checkRouteAccess('loyalty.Programas', ProgramsPage, access)} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

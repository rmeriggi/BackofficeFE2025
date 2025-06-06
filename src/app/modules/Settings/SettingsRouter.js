import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { AccessDeniedPage } from '../../pages/AccessDeniedPage';
import ErrorPageMenu from "../../pages/ErrorPageMenu";

const ManagementUsersPage = lazy(() =>
     import("./ManagementUsers/pages/ManagementUsersPage.js")
);

const ScoreparamsPage = lazy(() =>
     import("./Scoreparams/pages/ScoreparamsPage.js")
);

const ScoresubPage = lazy(() =>
     import("./Scoresub/pages/ScoresubPage.js")
);

export default function SettingsRouter() {

    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/settings';

    return (
        <Switch>
            <Route 
                path={baseRouterUrl + '/scoresub'} 
                component={access['settings.Scoresub'] === 0 ? AccessDeniedPage : ScoresubPage} />
            <Route 
                path={baseRouterUrl + '/scoreparams'} 
                component={access['settings.Scoreparams'] === 0 ? AccessDeniedPage : ScoreparamsPage} />
            <Route 
                path={baseRouterUrl + '/user-management'} 
                component={access['settings.Gestión de Usuarios'] === 0 ? AccessDeniedPage : ManagementUsersPage} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}
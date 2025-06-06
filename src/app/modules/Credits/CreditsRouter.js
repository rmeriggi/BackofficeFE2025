import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const ProductsPage = lazy(() =>
     import("./Products/pages/ProductsPage")
);

const CreditsPage = lazy(() =>
     import("../Credits/Credits/pages/CreditsPage")
);

const CollectionsPage = lazy(() =>
     import("../Credits/Collections/pages/CollectionsPage")
);

const WalletsPage = lazy(()=> 
    import("../Credits/Wallets/pages/WalletsPage")
);

const QueryPage = lazy(() =>
     import("../Credits/Queries/pages/QueryPage")
);

const SettingsPage = lazy(() =>
     import("../Credits/Settings/pages/SettingsPage")
);

const CollectionsDashboardPage = lazy(() =>
     import("../Credits/CollectionsDashboard/pages/CollectionsDashboardPage")
);

const CreditsDashboardPage = lazy(() =>
     import("./ProductsDashboard/pages/CreditsDashboardPage.js")
);

const ExternalImputationsPage = lazy(() =>
     import("./External-Imputations/pages/ExternalImputationsPage.js")
);

const CreditsManagementPage = lazy(() =>
     import("../Credits/CreditsManagement/pages/CreditsPage")
);

const CollectionsCampaignsPage = lazy(() =>
     import("../Credits/CollectionsCampaigns/pages/CollectionsCampaignsPage")
);

export default function ProductsRouter() {
    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/credits';

    return (
        <Switch>
            <ContentRoute
                path={baseRouterUrl + '/products'}
                component={checkRouteAccess('credits.Oferta de productos', ProductsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/credits'}
                component={checkRouteAccess('credits.Créditos/Adelantos', CreditsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/dashboard'}
                component={checkRouteAccess('credits.Dashboard productos', CreditsDashboardPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/management'}
                component={checkRouteAccess('credits.Gestion de Cobranzas', CollectionsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/wallet'}
                component={checkRouteAccess('credits.Asignar cartera', WalletsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/query-assignment'}
                component={checkRouteAccess('credits.Consulta asignación', QueryPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/settings-collections'}
                component={checkRouteAccess('credits.Ajustes de Cobranzas', SettingsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/dashboard-collections'}
                component={checkRouteAccess('credits.Dashboard de cobranzas', CollectionsDashboardPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/external-imputations'}
                component={checkRouteAccess('credits.Imputaciones externas', ExternalImputationsPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/creditsmanagement'}
                component={checkRouteAccess('credits.Créditos/Adelantos', CreditsManagementPage, access)} />
            <ContentRoute
                path={baseRouterUrl + '/campaings'}
                component={checkRouteAccess('credits.Campañas Cobranzas', CollectionsCampaignsPage, access)} />
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

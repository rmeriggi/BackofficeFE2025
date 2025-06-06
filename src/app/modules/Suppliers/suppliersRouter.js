import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";


const ReceiptPage = lazy(()=> 
     import("./Receipt/pages/ReceiptPage")
);

const IvoicesPage = lazy(()=> 
     import("./Invoices/pages/InvoicePage")
);

export default function SuppliersRouter() {
    const access = useSelector(state => state.auth.access);
    const baseRouterUrl = '/suppliers';

    return (
        <Switch>           
            <Route path={baseRouterUrl + '/invoices'} component={checkRouteAccess('settings.Comprobantes', IvoicesPage, access)} />     
            <Route path={baseRouterUrl + '/suppliers'} component={checkRouteAccess('settings.Proveedores', ReceiptPage, access)} />      
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}
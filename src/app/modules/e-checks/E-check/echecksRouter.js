import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorPageMenu from "../../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../../utils/access";


const EcheckPage = lazy(()=> 
     import("../E-check/pages/EcheckPage")
);


export default function EchecksRouter() {
    const access = useSelector(state => state.auth.access);
    const baseRouterUrl = '/echeqs';

    return (
        <Switch>           
            <Route path={baseRouterUrl + '/list'} component={checkRouteAccess('schema.Lista Echeqs', EcheckPage, access)} />          
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}
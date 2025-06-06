import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import {checkRouteAccess} from "../../utils/access";

const CashinPage = lazy(() =>
     import("./Cashin/pages/CashinPage.js")
);

const CashoutPage = lazy(() =>
     import("./Cashout/pages/CashoutPage.js")
);

const CvuPage = lazy(() =>
     import("./Cvu/pages/CvuPage.js")
);

const CahoutBankPage = lazy(() =>
     import("./CashoutBank/pages/CashoutBankPage.js")
);

const Afip = lazy(() => 
  import("../Bcra/Afip/pages/AfipPage.js"
));

export default function PspRouter() {

    const access = useSelector(state => state.auth.access);

    const baseRouterUrl = '/psp';

    return (
        <Switch>
            <Route path={baseRouterUrl + '/cashin'} component={checkRouteAccess('psp.Cashin', CashinPage, access)} />
            <Route path={baseRouterUrl + '/cashout'} component={checkRouteAccess('psp.Cashout', CashoutPage, access)} />
            <Route path={baseRouterUrl + '/cvu'} component={checkRouteAccess('psp.Alta CVU', CvuPage, access)} />
            <Route path={baseRouterUrl + "/afip"} component={checkRouteAccess('psp.Reg. AFIP', Afip, access)} />
            <Route path={baseRouterUrl + '/banco-cashout'} component={CahoutBankPage} />            
            <Route component={ErrorPageMenu} />
        </Switch>
    )
}

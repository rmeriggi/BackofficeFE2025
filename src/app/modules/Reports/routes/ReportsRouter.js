import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import ErrorPageMenu from "../../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../../utils/access";
import { LayoutSplashScreen } from "../../../../_metronic/layout/index";
import {
  KPIReportsPage,
  BusinessProfitability,
  CreditScoring,
  DelinquencyCollectionsPage,
  MaturityCashflow,
  CreditsConvertion,
  CreditsCross,
  LegalCredits,
  ComplianceMonitoring,
  ActivePortfolio,
} from "./lazyImports";

export default function ReportsRouter() {
  const access = useSelector((state) => state.auth.access);
  const baseRouterUrl = "/reports";

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {" "}
      {/* Agregar Suspense para lazy loading */}
      <Switch>
        <ContentRoute
          exact
          path={baseRouterUrl}
          component={() => <div>Seleccione un reporte</div>} // Ruta base opcional
        />
        <ContentRoute
          path={baseRouterUrl + "/kpi"}
          component={checkRouteAccess(
            "reports.KPIs Créditos",
            KPIReportsPage,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/deliquency-collections"}
          component={checkRouteAccess(
            "reports.Morosidad Créditos",
            DelinquencyCollectionsPage,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/business-profitability"}
          component={checkRouteAccess(
            "reports.Rentabilidad Créditos",
            BusinessProfitability,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/maturity-cashflow"}
          component={checkRouteAccess(
            "reports.Vencimientos Créditos",
            MaturityCashflow,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/credit-scoring"}
          component={checkRouteAccess(
            "reports.Scoring Créditos",
            CreditScoring,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/loan-conversion"}
          component={checkRouteAccess(
            "reports.Conversión Créditos",
            CreditsConvertion,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/recurring-cross-selling"}
          component={checkRouteAccess(
            "reports.Cross-Selling Créditos",
            CreditsCross,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/legal-cases"}
          component={checkRouteAccess(
            "reports.Legal Créditos",
            LegalCredits,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/compliance-monitoring"}
          component={checkRouteAccess(
            "reports.Compliance Créditos",
            ComplianceMonitoring,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/active-portfolio"}
          component={checkRouteAccess(
            "reports.Cartera Activa Créditos",
            ActivePortfolio,
            access
          )}
        />
        <Route component={ErrorPageMenu} />
      </Switch>
    </Suspense>
  );
}

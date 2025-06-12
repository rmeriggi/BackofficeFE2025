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
import Interchange from "../interChange/pages/InterChange";
import Clearing from "../Clearing/pages/Clearing";
import DailyOperations from "../DailyOperations/pages/DailyOperations";
import CommercialCards from "../Commercial/pages/ComercialCards";
import Fraud from "../Fraud/pages/Fraud";
import Regulations from "../Regulations/pages/Regulations";

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
        <ContentRoute
          path={baseRouterUrl + "/interchange"}
          component={checkRouteAccess(
            "reports.Interchange Tarjetas",
            Interchange,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/clearing"}
          component={checkRouteAccess(
            "reports.Clearing Tarjetas",
            Clearing,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/Daily"}
          component={checkRouteAccess(
            "reports.Op. Diario Tarjetas",
            DailyOperations,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/comercial"}
          component={checkRouteAccess(
            "reports.Comercial Tarjetas",
            CommercialCards,
            access
          )}
        />
        <ContentRoute
          path={baseRouterUrl + "/fraud"}
          component={checkRouteAccess("reports.Fraude Tarjetas", Fraud, access)}
        />
        <ContentRoute
          path={baseRouterUrl + "/regulation"}
          component={checkRouteAccess(
            "reports.Regulatorio Tarjetas",
            Regulations,
            access
          )}
        />
        <Route component={ErrorPageMenu} />
      </Switch>
    </Suspense>
  );
}

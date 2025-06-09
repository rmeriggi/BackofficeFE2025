import { lazy } from "react";

const KPIReportsPage = lazy(() => import("../KPIReports/pages/KPIReports"));
const DelinquencyCollectionsPage = lazy(() =>
  import("../DeliquencyCollections/pages/DelinquencyCollectionsPage")
);
const BusinessProfitability = lazy(() =>
  import("../BusinessProfitability/pages/BusinessProfitabilityPage")
);
const MaturityCashflow = lazy(() =>
  import("../MaturityCashflow/pages/MaturityCashflowPage")
);
const CreditScoring = lazy(() =>
  import("../CreditScoring/Pages/CreditScoringPage")
);
const CreditsConvertion = lazy(() =>
  import("../CreditsConvertion/pages/CreditsConvertionPage")
);
const CreditsCross = lazy(() =>
  import("../CreditsCross/pages/CreditsCrossPage")
);
const LegalCredits = lazy(() =>
  import("../LegalCredits/pages/LegalCreditsPage")
);
const ComplianceMonitoring = lazy(() =>
  import("../ComplianceMonitoring/pages/ComplianceMonitoringPage")
);
const ActivePortfolio = lazy(() =>
  import("../ActivePortfolio/pages/ActivePortfolioPage")
);

export {
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
};

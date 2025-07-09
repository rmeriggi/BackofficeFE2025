import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";

const FilesPage = lazy(() => import("./FilesPage"));
const FileDetailPage = lazy(() => import("./FileDetailPage"));

export default function FilesRouter() {
  return (
    <React.Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route exact path="/cash/files" component={FilesPage} />
        <Route path="/cash/files/detail/:fileId" component={FileDetailPage} />
      </Switch>
    </React.Suspense>
  );
}

/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import { ErrorPage } from "./pages/ErrorsPage";
import {getFirstPageLinkWithAccess} from "./utils/access";

export function Routes() {
  const { isAuthorized, menu, access } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
        menu: auth.menu,
        access: auth.access
    }),
    shallowEqual
  );

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) :
        /*Otherwise redirect to root page (`/`)*/
          typeof menu == 'undefined' || typeof access == 'undefined' ? (<Route component={null} />) : (<Redirect from="/auth" to={getFirstPageLinkWithAccess(menu, access)} />)
      }

      <Route path="/error" component={ErrorPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}

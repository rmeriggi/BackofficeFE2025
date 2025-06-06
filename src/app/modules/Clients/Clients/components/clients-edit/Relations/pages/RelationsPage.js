import React from "react";
import { Switch } from "react-router";
import { IdentityEditForm } from "../../IdentityEditForm";
import { ContentRoute } from "../../../../../../../../_metronic/layout";
import { RelationsContextProvider } from "../contex/RelationsContext";
export default function RelationsPage() {
  return (
    <Switch>
      <ContentRoute
        path="/clients/relations/new"
        exact
        component={IdentityEditForm}
        ContextProvider={RelationsContextProvider}
      />   
    </Switch>
  );
}

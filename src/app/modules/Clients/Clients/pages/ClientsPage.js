import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ClientEdit } from "../components/clients-edit/ClientEdit";
/* import { RelationsEditForm } from '../components/RelationsEditForm'; */
import { ClientsContextProvider } from "../context/ClientsContext";
import { RelationsEdit } from "../components/RelationsEdit";
import Listing from "./Listing";

const ClientsPage = () => {
  return (
    <Switch>
      <ContentRoute
        exact
        path="/clients/clients"
        component={Listing}
        ContextProvider={ClientsContextProvider}
      />
      <ContentRoute
        path="/clients/clients/edit/:id"
        component={ClientEdit}
        ContextProvider={ClientsContextProvider}
      />
      <ContentRoute
        path="/clients/clients/relations/edit/:id"
        component={RelationsEdit}
        ContextProvider={ClientsContextProvider}
      />
    </Switch>
  );
};

export default ClientsPage;

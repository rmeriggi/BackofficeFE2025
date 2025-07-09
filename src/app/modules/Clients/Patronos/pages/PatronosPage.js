import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { PatronosContextProvider } from "../context/PatronosContext";
import Listing from "./Listing";

const PatronosPage = () => {
  return (
    <Switch>
      <ContentRoute
        exact
        path="/clients/patronos"
        component={Listing}
        ContextProvider={PatronosContextProvider}
      />
    </Switch>
  );
};

export default PatronosPage;

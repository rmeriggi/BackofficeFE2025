import React from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { Listing } from "./Listing";
import { ListingTableContextProvider } from "../../Providers/pages/Listing/ListingTableContext";

const IssuersPage = () => {
  return (
    <Switch>
      <ContentRoute
        exact
        path="/cards/cardsrs"
        component={Listing}
        ContextProvider={ListingTableContextProvider}
      />
    </Switch>
  );
};

export default IssuersPage;

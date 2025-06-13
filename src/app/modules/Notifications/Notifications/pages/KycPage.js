import React from "react";
import Listing from "../components/kyc/Listing";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";
import { ListingTableContextProvider } from "../components/kyc/Listing/ListingTableContext";

const KycPage = () => {
  const baseRouterUrl = "/compliance/kyc";

  return (
    <>
      <Switch>
        <ContentRoute
          exact
          path={baseRouterUrl}
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />
      </Switch>
    </>
  );
};

export default KycPage;

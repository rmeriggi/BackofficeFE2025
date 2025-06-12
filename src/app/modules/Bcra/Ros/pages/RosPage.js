import React from "react";
import { Switch } from "react-router";
import { ContentRoute } from "../../../../../_metronic/layout";
import Listing from "../components/Listing/index";
import { ListingTableContextProvider } from "../components/Listing/ListingTableContext";
import RosEdit from "../components/RosEdit/RosEdit";
import RosDetails from "../components/RosDetail/RosDetails";
const RosPage = () => {
  const baseRouterUrl = "/compliance/ros";

  return (
    <>
      <Switch>
        <ContentRoute
          exact
          path={baseRouterUrl}
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />
        <ContentRoute
          path={baseRouterUrl + "/view/:id"}
          component={RosDetails}
        />
        <ContentRoute path={baseRouterUrl + "/edit/:id"} component={RosEdit} />
      </Switch>
    </>
  );
};

export default RosPage;

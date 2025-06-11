import React from "react";
import { Switch } from "react-router";
import { Listing } from "../components/Listing/index";
import { ContentRoute } from "../../../../../_metronic/layout";
import { CardDetail } from "../components/CardDetail/CardDetail";
import { CardIssue } from "../components/CardIssue/CardIssue";
import { ListingTableContextProvider } from "../components/Listing/ListingTableContext";

export default function CardsIssuedPage() {
  const baseRouterUrl = "/cards/cards";
  return (
    <>
      <Switch>
        <ContentRoute
          path={baseRouterUrl}
          exact
          component={Listing}
          ContextProvider={ListingTableContextProvider}
        />
        <ContentRoute
          path={baseRouterUrl + "/issue/edit/:id"}
          component={CardDetail}
        />
        <ContentRoute
          path={baseRouterUrl + "/issue/single"}
          component={CardIssue}
        />
        <ContentRoute
          path={baseRouterUrl + "/issue/all"}
          component={CardDetail}
        />
      </Switch>
    </>
  );
}

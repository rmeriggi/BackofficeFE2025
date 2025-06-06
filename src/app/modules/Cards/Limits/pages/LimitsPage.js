import React from 'react';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { Listing } from "../../Cards-Issued/components/Listing/index";
import { ListingTableContextProvider } from '../../Cards-Issued/components/Listing/ListingTableContext';
import {CardDetail} from "../../Cards-Issued/components/CardDetail/CardDetail"

export default function LimitsPage () {

    const baseRouterUrl = "/cards"
    return (
      <>
      <Switch>
        <ContentRoute 
          path={baseRouterUrl + "/limits"}
          exact
          component={Listing} 
          ContextProvider={ListingTableContextProvider} 
        />
        <ContentRoute 
          path={baseRouterUrl + "/cards/edit/:id"}
          component={CardDetail} 
        />
      </Switch>  
      </> 
    )
  }
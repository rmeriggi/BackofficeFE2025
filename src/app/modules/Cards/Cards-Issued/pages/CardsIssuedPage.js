import React from 'react'
import { Switch } from 'react-router'
import  {Listing}  from '../components/Listing/index'
import { ContentRoute } from '../../../../../_metronic/layout'
import {CardDetail} from "../components/CardDetail/CardDetail"
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext'

export default function CardsIssuedPage() {

  const baseRouterUrl = "/cards"
  return (
    <>
    <Switch>
      <ContentRoute 
        path={baseRouterUrl + "/cards"}
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

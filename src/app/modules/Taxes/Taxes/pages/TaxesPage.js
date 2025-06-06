import React from 'react'
import { Route, Switch } from 'react-router'
import { ContentRoute } from '../../../../../_metronic/layout'
import CreateTax from '../components/CreateTax'
import EditTax from '../components/EditTax'
import  Listing  from '../components/Listing/index'
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext'

export default function TaxesPage() {

  const baseRouterUrl = "/taxes"
  return (
    <>
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + "/taxes"}
        component={Listing} 
        ContextProvider={ListingTableContextProvider} 
      />
      <Route
        path={baseRouterUrl + "/taxes/new"}
        component={CreateTax}
      />
      <Route 
        path={baseRouterUrl + "/taxes/edit/:id"} 
        component={EditTax}     
      />
    </Switch>  
    </> 
  )
}

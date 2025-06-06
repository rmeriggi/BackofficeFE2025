import React from 'react'
import { Switch } from 'react-router'
import { ContentRoute } from '../../../../../_metronic/layout'
import  Listing  from '../components/Listing/index'
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext'

export default function CashinPage() {

  const baseRouterUrl = "/psp"
  return (
    <>
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + "/cashin"}
        component={Listing} 
        ContextProvider={ListingTableContextProvider} 
      />
    </Switch>  
    </> 
  )
}

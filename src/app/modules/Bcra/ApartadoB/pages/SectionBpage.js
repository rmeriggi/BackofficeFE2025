import React from 'react'
import { Switch } from 'react-router'
import { ContentRoute } from '../../../../../_metronic/layout'
import  Listing  from '../components/Listing/index'
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext'

export default function SectionBPage() {

  const baseRouterUrl = "/bcra"
  return (
    <>
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + "/sectionB"}
        component={Listing} 
        ContextProvider={ListingTableContextProvider} 
      />
    </Switch>  
    </> 
  )
}

import React from 'react'
import { Route, Switch } from 'react-router'
import EditUser from '../components/EditUser'
import  Listing  from '../components/Listing/index'
import { ContentRoute } from '../../../../../_metronic/layout'
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext'

export default function ManagementUSersPage() {

  const baseRouterUrl = "/settings"
  return (
    <>
    <Switch>
      <ContentRoute 
        exact
        path={baseRouterUrl + "/user-management"}
        component={Listing} 
       ContextProvider={ListingTableContextProvider} 
      />
      <Route 
        path={baseRouterUrl + "/user-management/edit/:id"} 
        component={EditUser}     
      />
    </Switch>  
    </> 
  )
}

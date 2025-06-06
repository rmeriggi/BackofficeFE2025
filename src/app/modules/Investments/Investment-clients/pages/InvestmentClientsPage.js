import React from 'react'
import { Switch } from 'react-router-dom'
import { ContentRoute } from '../../../../../_metronic/layout'
import EditPage from './Edit/EditPage'
import InvestmentPage from './Investment/InvestmentPage'
import { Listing } from './Listing'
import { ListingTableContextProvider } from './Listing/ListingTableContext'

const InvestmentClientsPage = () => {

  const baseRouterUrl = '/investments';

  return (
    <Switch>
      <ContentRoute exact path={baseRouterUrl + '/investment-clients'} component={Listing} ContextProvider={ListingTableContextProvider}/>
      <ContentRoute path={baseRouterUrl + '/investment-clients/edit/:id'} component={EditPage} />
      <ContentRoute path={baseRouterUrl + '/investment-clients/investments/:id'} component={InvestmentPage} />
    </Switch>
  )
}

export default InvestmentClientsPage
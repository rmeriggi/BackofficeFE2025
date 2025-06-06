import React from 'react'
import { Route } from 'react-router-dom';
import ClientInvestmentContextProvider from '../context/ClientInvestmentContext'
import ClientDetailPage from './Detail/ClientDetailPage';
import Listing from './Listing';

const ClientsPage = () => {

  const baseRouterUrl = '/investments';

  return (
    <ClientInvestmentContextProvider>
      <Route exact path={baseRouterUrl + '/clients'} component={Listing} />
      <Route path={baseRouterUrl + '/clients/edit/:id'} component={ClientDetailPage} />
    </ClientInvestmentContextProvider>
  )
}

export default ClientsPage

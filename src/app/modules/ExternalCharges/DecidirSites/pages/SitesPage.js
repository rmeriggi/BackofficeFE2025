import React from 'react'
import { Switch } from 'react-router-dom'
import { ContentRoute } from '../../../../../_metronic/layout'
import CreateSite from './CreateSite'
import EditSite from './EditSite'
import Listing from './Listing'

export default function SitesPage () {

  const baseRouterUrl = "/externalcharges"

  return (
    <Switch>
      <ContentRoute exact path={baseRouterUrl + '/sites'} component={Listing}/>
      <ContentRoute exact path={baseRouterUrl + '/sites/new'} component={CreateSite} />
      <ContentRoute exact path={baseRouterUrl + '/sites/edit/:id'} component={EditSite} />
    </Switch>
  )
}
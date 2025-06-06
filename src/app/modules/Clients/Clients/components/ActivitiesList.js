import React from 'react'
import { ListingTableContextProvider } from './ListingTableContext';
import {Card, CardBody, CardHeader} from "../../../../../_metronic/_partials/controls";
import ActivityTable from './ActivityTable';
  
export default function ActivitiesList({activities}) {

  return (
    <Card>
      <CardHeader title="Actividades" />
      <CardBody>
      <ListingTableContextProvider >
        <ActivityTable activities={activities} />
      </ListingTableContextProvider>
      </CardBody>
    </Card>
  )
}

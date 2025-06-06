import React from 'react'
import ListingFilter from './ListingFilter'
import { ListingTable } from './ListingTable'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls'
import { useSubheader } from '../../../_metronic/layout'
import { LoadingList } from '../LoadingList'
import { Button } from '@material-ui/core'
import { DownloadArchive } from '../DownloadArchive'

export const Listing = ({
  title = '', 
  listing = [],
  loading,
  filterProps,
  tableProps,
  initialValuesFilters = { 
    searchText : '',
    status: 0,
    from: null,
    to: null
  },
  othersFilters,
  dataForButtons = [],
  downloadList = false,
  downloadFormatList = false,
  contextValues
}) => {
  
  const subHeader = useSubheader()
  subHeader.setTitle(title)

  return (
    <Card>
      <CardHeader title={
          <LoadingList fetched={loading}/>
        }
      >
        <CardHeaderToolbar>
          <ListingFilter  
            disabled={listing.length === 0} 
            reportData={listing}
            initialValuesFilters={initialValuesFilters}
            contextValues={contextValues}
            {...filterProps}
          />
          {
            othersFilters && othersFilters
          }
          {
            dataForButtons.map(data =>(
              <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => data.fn()}
            >
                {data.title ? data.title : 'Agregar'}
            </Button>
            ))
          }
          {
            downloadList &&
            <DownloadArchive listing={listing} data={tableProps.columns} name={tableProps.name} />
          }
          {
            downloadFormatList && 
            <DownloadArchive listing={downloadFormatList.listing} data={downloadFormatList.columns} name={tableProps.name} />
          }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable 
          listingData={listing} 
          contextValues={contextValues}
          {...tableProps}
        /> 
      </CardBody>
    </Card>
  )
}

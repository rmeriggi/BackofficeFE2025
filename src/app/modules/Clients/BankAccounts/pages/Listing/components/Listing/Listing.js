import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import ListingFilter from './ListingFilter'
import { ListingTable } from './ListingTable'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../../../_metronic/_partials/controls'
import { useSubheader } from '../../../../../../../../_metronic/layout'
import { LoadingList } from '../../components/LoadingList'
import { Button } from '@material-ui/core'
import { DownloadArchive } from '../../components/DownloadArchive'
import { useFetchClientById } from '../../../../../../../hooks/useFetchClientById';

export const Listing = ({
  title = '', 
  listing = [],
  idClient='',
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
  const idParam = useParams().id; 
  useEffect(() => {
    console.log(idParam)
  }, [idParam]);
  const subHeader = useSubheader()
  subHeader.setTitle(title)
  
  const [client, loadingClient] = useFetchClientById(idParam)
  return (
    <Card>
      <CardHeader title={
          <LoadingList client={client} fetched={loadingClient}/>
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
                disabled={loadingClient}
                onClick={() => data.fn()}
            >
                {data.title ? data.title : 'Agregar'}
            </Button>
            ))
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

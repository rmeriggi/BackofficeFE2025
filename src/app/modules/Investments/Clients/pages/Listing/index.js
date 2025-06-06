import React from 'react'
import { Listing } from '../../../../../components'
import { ActionColumnFormatter } from '../../../../../utils/column-formatter/ActionColumnFormatter'
import { useClientInvestmentContext } from '../../context/ClientInvestmentContext'
import { useHistory } from 'react-router-dom'
import { filterData, columnsInvestmentClient } from '../../context/ContextHelper'
import { useCallAPI } from '../../../../../hooks'
import { getListInvestmentsClients } from '../../services/service'
import { LayoutSplashScreen } from '../../../../../../_metronic/layout'

const ListingClient = () => {

  const {listing, setListing,...values} = useClientInvestmentContext()
  const history = useHistory()
  const [loading] = useCallAPI(getListInvestmentsClients, setListing)

  const formats = [
    {
      key: 'Acción', 
      data: {
        formatter: ActionColumnFormatter, 
        formatExtraData: {
          tooltip: 'Ver detalle', 
          fnAction : ({id}) => {
            history.push(`/investments/clients/edit/${id}`)
          }, 
          icon: 'Files/File.svg'
        }
      }
    }
  ]

  if(!listing) return <LayoutSplashScreen />

  return (
    <Listing 
      loading={loading}
      listing={listing}
      title='Inversiones Clientes'
      filterProps={{placeholder: 'Busqueda por DNI o CUIL'}}
      downloadList
      tableProps={{
        columns: columnsInvestmentClient, 
        fnFilter: filterData, 
        formatsColumns: formats,
        name: 'clientes'
      }}
      contextValues={values}
    />
  )
}

export default ListingClient
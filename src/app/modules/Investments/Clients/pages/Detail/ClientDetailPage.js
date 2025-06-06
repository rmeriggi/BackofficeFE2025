import React from 'react'
import { Button } from '@material-ui/core'
import { LayoutCard } from '../../../../../components/LayoutCard/LayoutCard'
import { useHistory, useParams } from 'react-router-dom'
import { fieldsToDetail } from '../../context/ContextHelper'
import { useClientInvestmentContext } from '../../context/ClientInvestmentContext'
import { useCallAPI } from '../../../../../hooks'
import { getInvestmentClient } from '../../services/service'
import { LayoutSplashScreen } from '../../../../../../_metronic/layout'

const ClientDetailPage = () => {

  const history = useHistory()
  const {id} = useParams()
  const { client, setClient } = useClientInvestmentContext()

  useCallAPI(getInvestmentClient, setClient, id)

  if(!client) return <LayoutSplashScreen />

  const fields = fieldsToDetail(client)

  return (
    <LayoutCard
      title='Detalle del cliente'
      name='Detalle'
      renderToolbar={
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          onClick={() => history.push('/investments/clients')}
        >
          Volver
        </Button>
      }
    >
      {
        fields.map((field, i) => 
        <div key={i} className='row'>
          {
            field.map((f, i) => (
              <div className='col-3 mb-5' key={i}>
                <label>{f.label}</label> 
                <input
                  value={f.value}
                  className='form-control form-control-solid'
                  disabled
                />
              </div>
            ))
          } 
        </div>
      )}
    </LayoutCard>
  )
}

export default ClientDetailPage
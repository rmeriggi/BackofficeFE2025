import React, { useRef, useState } from 'react'
import { useSubheader } from '../../../../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls'
import FormBalancesItau from '../../components/FormBalancesItau'
import { Button, CircularProgress} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createBalanceItau } from '../../utils/service';
import { withSnackbar } from '../../../../../HOCs/withSnackbar';
import moment from 'moment';
import { getEntities } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';

const CreatePage = ({setOpenMessage}) => {

  const subHeader = useSubheader()
  subHeader.setTitle('Crear')
  const history = useHistory()
  const btnRef = useRef();
  const [loading, setLoading] = useState(false)
  const [entities] = useFetchCombos('entities', getEntities)

  const createClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const handleBack = () => {
    history.push("/cash/balances-itau")
  }

  const createBalance = async(values) => {
    
    setLoading(true)
    const req = {
      idEntity: values.entity,
      year: moment(values.date).format('YYYY'),
      month: moment(values.date).format('MM'), 
      day: moment(values.date).format('DD'),
      balance: values.amount
    }

    try {
        await createBalanceItau(req)
        setOpenMessage("success", "Saldo creado correctamente")
        setTimeout(() => {
          handleBack()
        }, 2500);
        setLoading(false)
        setTimeout(() => {
          history.push("/cash/balances-itau")
        }, 2000);
    } catch (e) {
      setOpenMessage("error", "Lo sentimos, la operación no se pudo realizar correctamente. Intente más tarde")
      setLoading(false)
    }
  }

  const initialValues = {
    entity: 34,
    amount: "",
    date: moment().format('YYYY-MM-DD')
  }

  return (
    <Card>
      <CardHeader title="Crear" >
        <CardHeaderToolbar >
          <div>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              className="mr-2"
              onClick={() => handleBack()}
              >
                Volver
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => createClick()}
              endIcon={
                loading && <CircularProgress size={20} color="secondary"/>  
              }
              disabled={loading}
              >
                  Crear
            </Button> 
          </div>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FormBalancesItau
          btnRef={btnRef}
          data={initialValues}
          createBalance={createBalance}
          entities={entities}
        />
      </CardBody>
    </Card>
  )
}

export default withSnackbar(CreatePage)  
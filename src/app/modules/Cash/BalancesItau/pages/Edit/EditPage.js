import React, { useEffect, useRef, useState } from 'react'
import { LayoutSplashScreen, useSubheader } from '../../../../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls'
import FormBalancesItau from '../../components/FormBalancesItau'
import { Button, CircularProgress} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { editBalanceItau, getOneBalanceItau } from '../../utils/service';
import { withSnackbar } from '../../../../../HOCs/withSnackbar';
import moment from 'moment';
import { adaptedBalance } from '../../adapter/adapterBalancesItau';
import { getEntities } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';

const EditPage = ({setOpenMessage}) => {

  const subHeader = useSubheader()
  subHeader.setTitle('Editar')
  const history = useHistory()
  const btnRef = useRef();
  const {id} = useParams()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false)
  const [entities] = useFetchCombos('entities', getEntities)

  useEffect(() => {
    const getOneToEdit = async() => {
      try {
        const response = await getOneBalanceItau(id)
        const adaptedBalanceToData = adaptedBalance(response.balanceItau)
        setData(adaptedBalanceToData)
      } catch (error) {
        setData("Sin datos")
      }
    }
    getOneToEdit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const editClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const handleBack = () => {
    history.push("/cash/balances-itau")
  }

  const editBalance = async(values) => {
    setLoading(true)

    const req = {
      idEntity: values.entity,
      year: moment(values.date).format('YYYY'),
      month: moment(values.date).format('MM'), 
      day: moment(values.date).format('DD'),
      balance: values.amount
    }

    try {
        await editBalanceItau(values.id,req)
        setOpenMessage("success", "Saldo modificado correctamente")
        setTimeout(() => {
          handleBack()
        }, 2500);
        setLoading(false)
    } catch (e) {
      setOpenMessage("error", "Lo sentimos, la operación no se pudo realizar correctamente. Intente más tarde")
      setLoading(false)
    }
  }

  if (!(data)) return <LayoutSplashScreen />
  if(data === "Sin datos") return <div><h5>No se pudo cargar los datos, intente más tarde</h5></div>

  return (
    <Card>
      <CardHeader title="Editar" >
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
              onClick={() => editClick()}
              endIcon={
                loading && <CircularProgress size={20} color="secondary"/>  
              }
              disabled={loading}
              >
                Guardar
            </Button> 
          </div>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FormBalancesItau
          btnRef={btnRef}
          data={data}
          editBalance={editBalance}
          entities={entities}
          edit
        />
      </CardBody>
    </Card>
  )
}

export default withSnackbar(EditPage)  
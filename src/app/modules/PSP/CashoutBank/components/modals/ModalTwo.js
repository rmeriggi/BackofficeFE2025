import { Button } from '@material-ui/core'
import React from 'react'
import { ModalWrapper } from '../../../../../components/ModalWrapper'
import { formatNumberToMoney } from '../../../../../utils/formatData'
import moment from "moment";
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { useCashoutTransactionsConsult } from '../../utils/apiHooks';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';

const convertToArray =(obj) => {
  return [
    {
        name : "Detalle",
        description: obj
      },
  ]
}


const ModalDetailBankCashout = ({ show, onHide, id }) => {

  const isMountedRef = useIsMountedRef()
  const [cashOutBankconsultData, cashOutBankconsultDataCompleted] = useCashoutTransactionsConsult(id, isMountedRef)

  if(!id) return null

  if(!cashOutBankconsultDataCompleted) return <LayoutSplashScreen />

  const details = convertToArray(cashOutBankconsultData)

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title="Detalle de Transaccion"
      footer={() =>
        (
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => onHide()}
        >
          Volver
        </Button>)
      }
    >
      {
        details.map((d,i ) => <Boxes  key={i} name={d.name} description={d.description}/>)
      }
    </ModalWrapper>
  )
}

const Boxes = ({name, description}) => {
  return (
    <div className="my-10, m-10">
      <h6>{name}</h6>
      <span>{JSON.stringify(description)}</span>
    </div>
  )
}

export default ModalDetailBankCashout
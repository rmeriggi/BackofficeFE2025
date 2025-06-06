import React, { useState } from 'react'
import RequestedCreditsTable from './RequestedCreditsTable';
import { ListingTableContextProvider } from './ListingTableContext';
import useIsMountedRef from '../../../../../../hooks/useIsMountedRef';
import { CreditReceipt } from '../../../../../../components/CreditReceipt';
import { LayoutSplashScreen } from '../../../../../../../_metronic/layout';
import { useStatusCredits } from '../../../../../Credits/Credits/utils/apiHook';
import {Card, CardBody, CardHeader} from "../../../../../../../_metronic/_partials/controls";

export default function RequestedCreditsList({data}) {

  const isMounted = useIsMountedRef();
  const [statusCredits, statusCreditsComplete] = useStatusCredits(isMounted)

  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState("")

  const openReceipt = (id) => {
    setShowModal(true)
    setId(id)
  }

  const closeReceipt = () => {
    setShowModal(false)
  }
  if(!statusCreditsComplete) return <LayoutSplashScreen />

  const {creditsStatus} = statusCredits

  return (
    <Card>
      <CardHeader title="Créditos solicitados" />
      <CardBody>
        <ListingTableContextProvider >
          <RequestedCreditsTable 
            movements={data}
            openReceipt={openReceipt}
            creditsStatus={creditsStatus} 
          />
          <CreditReceipt
            show={showModal}
            onHide={closeReceipt}
            id={id}
          />
        </ListingTableContextProvider >
      </CardBody>
    </Card>
  )
}

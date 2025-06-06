import React, { useState } from 'react'
import { DataCreditDetail } from './DataCreditDetail'
import ListingCredits from './ListingCredits'
import ListingDetailsCredits from './ListingDetailsCredits'
import useIsMountedRef from '../../../../../../../hooks/useIsMountedRef';
import { PaymentLinkModal } from './modals/PaymentLinkModal'
import { ListingTableCreditsContextProvider } from './ListingCredits/ListingTableCreditsContext'
import { ListingTableDetailsCreditsContextProvider } from './ListingDetailsCredits/ListingTableDetailsCreditsContext'
import { useModal } from '../../../../../../../hooks/useModal'
import { CollectionDetailModal } from './modals/CollectionDetailModal'
import { useOneClient } from '../../../../../../Clients/Clients/utils/apiHooks';
import { clientAdapter } from '../../../../../../Clients/Clients/adapters/clientAdapter';


export function CreditDetailInfo({creditDetail, idClient}) {

  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState(false)
  const [idPayment, setIdPayment] = useState("")
  const isMounted = useIsMountedRef();  
  const [action, setAction] = useState(1);
  const [quotaNumber, setQuotaNumber] = useState("")
  const [show, openModal, closeCollectionModal, id] = useModal()
  const [idCredit, setIdCredit] = useState("")
  const [quotasDetail, setQuotasDetail] = useState()
  const [clientData] = useOneClient(idClient, isMounted)
  
  
  const client = clientAdapter(clientData.client);

  const clientPhone = client.client.phone

  const openPaymentLinkModal = (id, quota) => {
    setShowPaymentLinkModal(true)
    setIdPayment(id)
    setQuotaNumber(quota)
  }
  const closeModal = () => {
    setShowPaymentLinkModal(false)
  }

  return (
    <>
      <DataCreditDetail 
        values={creditDetail} 
        openModal={openPaymentLinkModal} 
        show={showPaymentLinkModal} 
        setAction={setAction}
        quotasDetail={quotasDetail}
      />
      <div className='mb-10'>
        <ListingTableDetailsCreditsContextProvider>
          <ListingDetailsCredits 
            openModal={openPaymentLinkModal} 
            setAction={setAction} 
            openCollectionDetail={openModal} 
            setIdCredit={setIdCredit} 
            setQuotaNumber={setQuotaNumber}
            setQuotasDetail={setQuotasDetail}
          />
        </ListingTableDetailsCreditsContextProvider>    
      </div>
      <ListingTableCreditsContextProvider>
        <h3>Otros créditos</h3>
        <ListingCredits idClient={creditDetail.idClient}/>
      </ListingTableCreditsContextProvider>
      <PaymentLinkModal 
        show={showPaymentLinkModal} 
        onHide={closeModal} 
        clientPhone = {clientPhone}
        idPayment={idPayment} 
        action={action} 
        quotaNumber={quotaNumber}
        idManagment={creditDetail.user.id}
      />
      <CollectionDetailModal 
        show={show} 
        onHide={closeCollectionModal} 
        id={id} 
        idCredit={idCredit} 
        quotaNumber={quotaNumber}
      />
    </>
  )
}

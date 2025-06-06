import React, { useState } from 'react'
import DataCreditDetail  from './DataCreditDetail'
import ListingCredits from './ListingCredits'
import ListingDetailsCredits from './ListingDetailsCredits'
import { PaymentLinkModal } from './modals/PaymentLinkModal'
import { ListingTableCreditsContextProvider } from './ListingCredits/ListingTableCreditsContext'
import { ListingTableDetailsCreditsContextProvider } from './ListingDetailsCredits/ListingTableDetailsCreditsContext'
import { useModal } from '../../../../../../../hooks/useModal'
import { CollectionDetailModal } from '../../../../../Collections/pages/CreditDetail/Flaps/CreditDetailInfo/modals/CollectionDetailModal'

export function CreditDetailInfo({ creditDetail, idClient}) {

  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState(false)
  const [idPayment, setIdPayment] = useState("")
  const [quotaNumber, setQuotaNumber] = useState("")
  const [show, openModal, closeCollectionModal, id] = useModal()
  const [quotasDetail, setQuotasDetail] = useState()
  const [idCredit, setIdCredit] = useState("")

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
      <DataCreditDetail values={creditDetail}  quotasDetail={quotasDetail} />
      <div className='mb-10'>
        <ListingTableDetailsCreditsContextProvider>
          <ListingDetailsCredits 
            openModal={openPaymentLinkModal} 
            openCollectionDetail={openModal} 
            setIdCredit={setIdCredit}
            setQuotaNumber={setQuotaNumber}
            setQuotasDetail={setQuotasDetail}
          />
        </ListingTableDetailsCreditsContextProvider>
      </div>
      <ListingTableCreditsContextProvider>
        <h3>Otros créditos</h3>
        <ListingCredits idClient={idClient}/>
      </ListingTableCreditsContextProvider>
      <PaymentLinkModal 
        show={showPaymentLinkModal} 
        onHide={closeModal} 
        idPayment={idPayment} 
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

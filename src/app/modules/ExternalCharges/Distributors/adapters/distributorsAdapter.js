export const distributorsAdapter = (distributors) => {
  if(!distributors) return []
  const formatedPaymentLinks = distributors.map((s) => {
      const formattedCollection = {
        id:                      s.id,
        idClient:                s.idClient,
        token:                   s.token,
        name:                    s.name,
        idCurrency:              s.idCurrency,
        amount:                  s.amount,
        cards:                   s.cards,
        reference:               s.reference,
        expirationDate:          s.expirationDate,
        urlok:                   s.urlok,
        urlko:                   s.urlko,
        activePercentage:        s.activePercentage,
        distributorUser:         s.distributorUser,
        distributorId:           s.distributorId,
        distributorUserId:       s.distributorUserId,
        agreementId:             s.agreementId,
        voucheAfip:              s.voucheAfip,
        clientCuit:              s.clientCuit,
        clientName:              s.clientName,
        quantity:                s.quantity,
        paymentMethodId:         s.paymentMethodId,
        paymentMethod:           s.paymentMethod,
        voucher:                 s.voucher,
        days:                    s.days,    
        beneficiary:             s.beneficiario,
        distributor:             s.distribuidor,
      }
      return formattedCollection
    })
  return formatedPaymentLinks
}
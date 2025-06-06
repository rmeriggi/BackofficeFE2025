export const cashoutsAdapter = (cashouts) => {
  if(!cashouts) return []
  const formattedCashouts = cashouts.map((c) => {
      const formattedCashout = {
        id: c.id,
        cbu:  c.cbu,
        cuit: c.cuit,
        ownerName: c.ownerName,
        amount:  c.amount,
        currency:  c.currency,
        date:  c.timestamp,
        transferId:  c.transferId,
        uri: c.uri,
        code: c.code,
        descripcion: c.descripcion,
      }
      return formattedCashout
    })
  return formattedCashouts
}

export const cashoutsConsultAdapter = (consult) => {
  if(!consult) return []
  const formattedCashoutsConsult = consult.map((o) => {
      const formattedCashoutConsult = {
        agreement:  o.agreement,
        amount: o.amount,
        creditAccount: o.creditAccount,
        currency:  o.currency,
        debitAccount:  o.debitAccount,
        status:  o.status,
        trackingId: o.trackingId,
        transferConcept: o.transferConcept,
        transferDate: o.transferDate,
      }
      return formattedCashoutConsult
    })
  return formattedCashoutsConsult
}
export const paymentLinksAdapter = (sites) => {
  if(!sites) return []
  const formatedPaymentLinks = sites.map((s) => {
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
        dni:                     s.clientDni,
      }
      return formattedCollection
    })
  return formatedPaymentLinks
}
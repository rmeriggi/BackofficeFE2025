export const collectionsNCAdapter = (collections) => {
  if(!collections) return []
  const formattedNCCollections = collections.map((s) => {
      const formattedCollection = {
        id:                      s.id,
        amountDate:              s.amountDate,
        reference:               s.reference,
        amount:                  s.amount,
        collectionChannelId:     s.collectionChannelId,
        batch:                   s.batch,
        description:             s.description,
        paymentMethodId:         s.paymentMethodId,    
      }
      return formattedCollection
    })
  return formattedNCCollections
}
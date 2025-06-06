export const operationsAdapter = (operations) => {
  if(!operations) return []
  const formattedOperations = operations.map((o) => {
      const formattedCollection = {
        id:                 o.id,
        account:            o.account,
        type:               o.type,
        amount:             o.amount,
        date:               o.date,
        description:        o.description,
        origin:             o.origin,
        destiny:            o.destiny
      }
      return formattedCollection
    })
  return formattedOperations
}
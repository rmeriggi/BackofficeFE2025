export const detailCollectionAdapter = (collection) => {
  const formattedCollection = collection.map((c) => {
    const formattedCollection = {
      id:                c.id,
      investment:        c.investment,
      iva:               c.iva,
      interest:          c.interest,
      expenses:          c.expenses,
      punitives:         c.punitives,
      totalAmount:       c.totalAmount,
      movementType:      c.movementType,
      movementDate:      c.movementDate,
      transactionNumber: c.transactionNumber,
      paymentChanel:     c.paymentChanel,
      methodOfPayment:   c.methodOfPayment,
      imputationDay:     c.imputationDay,
      expensesIva:       c.expensesIva,
      punitivesIva:      c.punitivesIva,
          
    }
    formattedCollection.interest = Number(formattedCollection.interest) + Number(formattedCollection.iva);
    formattedCollection.expenses = Number(formattedCollection.expenses) + Number(formattedCollection.expensesIva);
    formattedCollection.punitives = Number(formattedCollection.punitives) + Number(formattedCollection.punitivesIva);
    return formattedCollection
  })
  return formattedCollection
}
import moment from "moment"

export const collectionsAdapter = (collections) => {
  if(!collections) return []
  const formattedCollections = collections.map((c) => {
      const formattedCollection = {
        id:            c.id,
        entity:        c.idEntity,
        currency:      c.idCurrency,
        movementDate:  moment(c.movementDate).format('DD/MM/YYYY'),
        valueDate:  moment(c.valueDate).format('DD/MM/YYYY'),
        idProduct:      c.idProduct,
        paymentChanel: c.paymentChanel,
        amount:        Number(c.amount),
        movementType:  c.movementType,
        quota:  c.quota,
        product:  c.product,
        transactionNumber:  c.transactionNumber,
        user: c.user,
        reference: c.reference,
        idClient: c.idClient,
        passport: c.passport,
        surname: c.surname,
        name: c.name,
        city: c.city,
        postalCode: c.postalCode,
        collectionChannel: c.collectionChannel,
        dueDate: c.dueDate,
        quotaAmount: c.quotaAmount,
        status: c.status,
        manager: c.manager,
        lote: c.lote,
        idMigra: c.idMigra,
        idSeat: c.idSeat,
        idOrigin: c.idOrigin,
        capital: c.capital,
        interest: c.interest,
        expenses: c.expenses,
        ivaExpenses: c.ivaExpenses,
        punitives: c.punitives,
        ivaPunitives: c.ivaPunitives,
        others: c.others,
        ivaOthers: c.ivaOthers,
        terminalNumber: c.terminalNumber,
      }
      return formattedCollection
    })
  return formattedCollections
}
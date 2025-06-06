export const movementsAdapter = (movements) => {
  if(!movements) return []
  const formattedMovements = movements.map((m) => {
      const formattedCollection = {
        id:                       m.id,
        accountId:                m.accountId,
        account:                  m.account,
        typeId:                   m.typeId,
        type:                     m.type,
        amount:                   m.amount,
        date:                     m.date,
        executionDate:            m.executionDate,
        statusId:                 m.statusId,
        status:                   m.status,
        description:              m.description,
        message:                  m.message,
        origin:                   m.origin,
        destiny:                  m.destiny,
        paymentLinkId:            m.paymentLinkId,
        paymentLink:              m.paymentLink,
        operationNumber:          m.operationNumber,
        operationCode:            m.operationCode,
        authorizationNumber:      m.authorizationNumber,
        clientId:                 m.clientId,
        client:                   m.client,
        paymentMethodId:          m.paymentMethodId,
        paymentMethod:            m.paymentMethod,
        groupState:               m.groupState,
        reason:                   m.reason,
        errorType:                m.errorType
      }
      return formattedCollection
    })
  return formattedMovements
}
export const movementsAdapter = (movements) => {
  if(!movements) return []
  const formattedMovements = movements.map((m) => {
      const formattedCollection = {
        id:                       m.id,
        movementDate:             m.movementDate,
        dateValue:                m.dateValue,
        event:                    m.event,
        date:                     m.date,
        shortEventDescription:    m.shortEventDescription,
        longEventDescription:     m.longEventDescription,
        ticketNumber:             m.ticketNumber,
        value:                    m.value,
        indicator:                m.indicator,
        movementPassword:         m.movementPassword
      }
      return formattedCollection
    })
  return formattedMovements
}
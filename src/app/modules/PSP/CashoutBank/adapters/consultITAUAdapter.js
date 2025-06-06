export const cashoutsAdapter = (consult) => {
    if(!consult) return []
    const formattedCashouts = consult.map((c) => {
        const formattedCashout = {
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
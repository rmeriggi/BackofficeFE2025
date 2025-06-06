export const accountsAdapter = (accounts) => {
    if(!accounts) return []
    const formattedAccounts = accounts.map((a) => {
        const formattedCashout = {
          id:            a.id,
          cuit:          a.cuit,
          bussinesName:  a.bussinesName,
          alias:         a.alias,
          cvu:           a.cvu,
          amount:        a.amount
        }
        return formattedCashout
      })
    return formattedAccounts
  }

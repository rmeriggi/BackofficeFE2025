export const accountsAdapter = (accounts) => {
    if(!accounts) return []
    const formattedAccounts = accounts.map((a) => {
        const formattedCashout = {
            accountName:            a.accountName,
            accountNumber:          a.accountNumber,
            date:                   a.date,
            currency:               a.currency,
            status:                 a.status,
            client:                 a.client,
            cuit:                   a.cuit,
        }
        return formattedCashout
      })
    return formattedAccounts
  }

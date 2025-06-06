export const accountsAdapter = (accounts) => {
    if(!accounts) return []
    const formattedAccounts = accounts.map((a) => {
        const formattedAccounts = {
            accountName:            a.accountName,
            bank:                   a.bank,
            type:                   a.type,
            currency:               a.currency,
        }
        return formattedAccounts
      })
    return formattedAccounts
  }

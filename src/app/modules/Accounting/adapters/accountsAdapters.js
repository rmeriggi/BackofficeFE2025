export const accountsAdapter = (accounts) => {
  if(!accounts) return []
  const formattedAccounts = accounts.map((a) => {
    const formattedAccount = {
      id: a.id,
      idGroup: a.idGroup,
      account: a.account
    }
    return formattedAccount
  })
  return formattedAccounts
}
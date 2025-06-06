export const accountsAuxAdapter = (accountsAux) => {
  if(!accountsAux) return []
  const formattedAccountsAux = accountsAux.map((a) => {
    const formattedAccountAux = {
      id:           a.id,
      idSubAccount: a.idSubAccount,
      auxiliary:    a.auxiliary
    }
    return formattedAccountAux
  })
  return formattedAccountsAux
}
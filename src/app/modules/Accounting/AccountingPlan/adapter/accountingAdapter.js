export const accountingAdapter = (accountings) => {
  if(!accountings) return []
  let id = 0
  const accountingsFormatted = accountings.map((a) => {
    const accountingFormatted = {
      id:           id++,
      idEntity:     a.idEntity,
      idCurrency:   a.idCurrency,
      idGroup:      a.idGroup,
      group:        a.group,
      idAccount:    a.idAccount,
      account:      a.account,
      idSubAccount: a.idSubAccount,
      subAccount:   a.subAccount,
      idAuxiliary:  a.idAuxiliary,
      auxiliary:    a.auxiliary
    }
    return accountingFormatted
  })
  return accountingsFormatted
}
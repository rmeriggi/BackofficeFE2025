export const balancesAdapter = (balances) => {
  if(!balances) return {total: "Sin datos", balances: []}
  const formattedBalances = {
    total: balances.total ? balances.total : "Sin datos",
    balances: balances.map((b) => {
      const formattedBalances = {
        entity:           b.idEntity,
        currency:         b.idCurrency,
        idSubAccount:     b.idSubAccount,
        subAccount:       b.subAccount,
        idAuxiliary:      b.idAuxiliary,
        auxiliary:        b.auxiliary,
        sumsDebit:        b.should,
        sumsAssets:       b.have,
        balancesDebtor:   b.debitBalance,
        balancesCreditor: b.creditBalance
      }
      return formattedBalances ? formattedBalances : []
    })
  }

  return formattedBalances
}
import { formatFieldToTypeNumber, formatNumberToMoney } from "../../../../utils/formatData"

export const adapterBalancesItau = (balances) => {
  if(!balances) return []
  const adaptedBalances = balances.map(b => {
    const adaptedBalance = {
      id : Number(b.id),
      entity: b.idEntity,
      amount: b.balance,
      date: `${b.day}/${b.month}/${b.year}`
    }
    return adaptedBalance
  })
  return adaptedBalances
}

export const adaptedBalance = (balance) => {

  const month = balance.month < 10 ? `0${balance.month}` : balance.month
  const day = balance.day < 10 ? `0${balance.day}` : balance.day

  const adapted = {
      id : Number(balance.id),
      entity: Number(balance.idEntity),
      amount: formatFieldToTypeNumber(formatNumberToMoney(balance.balance)),
      date: `${balance.year}-${month}-${day}`
  }
  return adapted
}
export const mayorBookAdapter = (mayorBook) => {
  if(!mayorBook) return []
  const formattedMayorBook = mayorBook.map((m) => {
    const formattedMayorBook = {
      id:            m.id,
      seatNumber:    m.asiento,
      date:          m.fecha,
      description:   m.descripcion,
      accountNumber: m.idauxiliar,
      detailAccount: m.auxiliar,
      debit:         m.debe,
      assets:        m.haber,
      balances:      m.saldo
    }
    return formattedMayorBook
  })
  return formattedMayorBook
}
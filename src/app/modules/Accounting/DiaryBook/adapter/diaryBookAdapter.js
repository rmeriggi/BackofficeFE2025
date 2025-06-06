export const diaryBookAdapter = (diaryBook) => {
  if(!diaryBook) return []
  const formattedDiaryBook = diaryBook.map((d) => {
    const formattedDiaryBook = {
      id:            d.idauxiliar,
      seatNumber:    d.asiento,
      date:          d.fecha,
      description:   d.descripcion,
      accountNumber: d.idauxiliar,
      detailAccount: d.auxiliar,
      debit:         d.debe,
      assets:        d.haber
    }
    return formattedDiaryBook
  })
  return formattedDiaryBook
}
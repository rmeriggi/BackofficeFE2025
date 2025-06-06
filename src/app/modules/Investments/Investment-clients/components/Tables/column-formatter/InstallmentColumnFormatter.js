
export const InstallmentColumnFormatter = (cellContent,row) => {
  return (
    `${row.installment}/${row.totalInstallments}`
  )
}

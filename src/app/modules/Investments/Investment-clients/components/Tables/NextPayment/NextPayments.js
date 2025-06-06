import React from 'react'
import { sortCaret, headerSortingClasses } from '../../../../../../../_metronic/_helpers'
import { PaginatedTable } from '../../../../../../components/PaginatedTable'
import { TableNoRecordsFoundMessage } from '../../../../../../components/TableNoRecordsFound'
import { AmountColumnFormatter } from '../../../../../../utils/column-formatter/AmountColumnFormatter'
import { DateColumnFormatter } from '../../../../../../utils/column-formatter/DateColumnFormatter'
import { PercentageColumnFormatter } from '../../../../../../utils/column-formatter/PercentageColumnFormatter'
import { InstallmentColumnFormatter } from "../column-formatter/InstallmentColumnFormatter"
import { useListingTableContext } from './ListingTableContext'
import { defaultSorted, sizePerPageList } from './ListingTableHelpers'

const columns = [
  {
    dataField: "proyect",
    text: "Proyecto",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: "date",
    text: "Fecha",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
    formatter: DateColumnFormatter
  },
  {
    dataField: "amount",
    text: "Monto",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
    formatter: AmountColumnFormatter
  },
  {
    dataField: "tna",
    text: "TNA",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
    formatter: PercentageColumnFormatter
  },
  {
    dataField: "installment",
    text: "Cuota",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
    formatter: InstallmentColumnFormatter
  },
]


export const NextPayments = ({data}) => {

  const {
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const paginationOptions = {
    custom: true,
    totalSize: data.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return (
    <div className='w-50 pt-5 pl-5'>
      <p className='h5'>Próximos pagos</p>
      { data.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Próximos pagos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={data}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )}
    </div>
  )
}

import React from 'react'
import { sortCaret, headerSortingClasses } from '../../../../../../../_metronic/_helpers'
import { AmountColumnFormatter } from '../../../../../../utils/column-formatter/AmountColumnFormatter'
import { DateColumnFormatter } from '../../../../../../utils/column-formatter/DateColumnFormatter'
import { useListingTableContext } from './ListingTableContext'
import { defaultSorted, sizePerPageList } from './ListingTableHelpers'
import { PaginatedTable } from '../../../../../../components/PaginatedTable'
import { TableNoRecordsFoundMessage } from '../../../../../../components/TableNoRecordsFound'

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: "type",
    text: "Tipo",
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
    dataField: "product",
    text: "Producto",
    sort: true,
    headerClasses: "text-center",
    classes: "text-center",
    sortCaret: sortCaret,
    headerSortingClasses,
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
]

export const LastOperations = ({data}) => {

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
    <div className='w-50 pt-5 pr-5 border-right'>
      <p className='h5'>Últimas operaciones</p>
     { data.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"últimas operaciones"}/>
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

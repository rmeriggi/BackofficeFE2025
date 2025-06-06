import { sortCaret, headerSortingClasses } from "../../_metronic/_helpers"

export const useTableColumns = (columns, formatsColumns) => {
  const mappedColumns = columns.header.map((header, i) => {
    const restProps = formatsColumns?.find(f => header === f.key)?.data
    if(restProps){
      return {
        dataField: columns.properties[i],
        text: header,
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses,
        ...restProps
      }
    }
    return {
      dataField: columns.properties[i],
      text: header,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }
  })
  return mappedColumns
}
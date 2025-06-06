import React from "react";
import propTypes from 'prop-types';
import { deleteProgram } from "../../../../utils/service";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";

export function ListingTable( { programData, setVariant, setMessage, setOpen } ) {

    const removeProgram = async(id) => {
        try {
          await deleteProgram(id);
          setVariant('success')
          setMessage('El programa fue eliminado correctamente.')
          setOpen(true)
        } catch  {
          setVariant('error')
          setMessage('El programa no pudo ser eliminado correctamente. Por favor, volvé a intentar.')
          setOpen(true)
        }
    }

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "program",
            text: "Programa",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "action",
            text: "accion",
            formatter: ActionColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            formatExtraData: {
                removeProgram
            }
        }
    ]
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: programData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        programData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"programas"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={programData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    programData: []
};

ListingTable.propTypes = {
    programData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        idCredits: propTypes.string,
        idProgram: propTypes.string,
        program: propTypes.string,
    }))
}

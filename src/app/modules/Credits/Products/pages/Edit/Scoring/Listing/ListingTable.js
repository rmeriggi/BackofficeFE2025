import React from "react";
import propTypes from 'prop-types';
import { deleteScoring } from "../../../../utils/service";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";

export function ListingTable( { scoringData, setVariant, setMessage, setOpen } ) {

    const removeScoring = async(id) => {
        try {
          await deleteScoring(id);
          setVariant('success')
          setMessage('Scoring fue eliminado correctamente.')
          setOpen(true)
        } catch  {
          setVariant('error')
          setMessage('Scoring no pudo ser eliminado correctamente. Por favor, volvé a intentar.')
          setOpen(true)
        }
    }

    const columns = [
        {
            dataField: "idScoreSource",
            text: "Fuente score",
            sort: true,
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "idScoreParams",
            text: "Paramentros de score",
            sort: true,
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "minValue",
            text: "Mínimo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "maxValue",
            text: "Máximo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "textValue",
            text: "Otros parámetros",
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
                removeScoring
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
        totalSize: scoringData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        scoringData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"scoring"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={scoringData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    scoringData: []
};

ListingTable.propTypes = {
    scoringData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        source: propTypes.string,
        variable: propTypes.string,
        min: propTypes.string,
        max: propTypes.string,
        value: propTypes.string,
    }))
}

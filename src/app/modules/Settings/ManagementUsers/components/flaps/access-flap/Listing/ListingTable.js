import React from "react";
import propTypes from 'prop-types';
import { deleteAccess } from "../../../../utils/service";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../../../utils/column-formatter/DateColumnFormatter";

const filterData = (accessData, filter) => {
    let filteredData = accessData;
    if (filter.description !== "") {
        filteredData = accessData.filter(access => {
            if (
                access.description.toLowerCase().includes(filter.description.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { accessData, setOpen, setVariant, setMessage } ) {

    const deletePermission = async(idUser, idModule) => {
        try {
            await deleteAccess(idUser, idModule)
            setVariant('success')
            setMessage('Permiso borrado correctamente.')  
            setOpen(true)
        } catch (error) {
            setVariant('error')
            setMessage('El permiso no pudo ser borrado correctamente. Por favor, volvé a intentar.')
            setOpen(true)
        }
    }

    const columns = [
        {
            dataField: "idPermission",
            text: "id Permiso",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
        },
        {
            dataField: "description",
            text: "Descripción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "acción",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                deletePermission
            }
        }
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(accessData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        accessData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"permisos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
                keyField="idPermission"
            />
        )
    )
}

 
ListingTable.defaultProps = {
    accessData: []
};

ListingTable.propTypes = {
    accessData: propTypes.arrayOf(propTypes.shape({
        idPermission: propTypes.string,
        date: propTypes.string,
        description: propTypes.string,
    }))
}

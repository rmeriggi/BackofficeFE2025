import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {useModal} from "../../../../../../../../hooks/useModal"
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import { ActivityRegisterModal } from "../modal/ActivityRegisterModal";
import {PaginatedTable} from "../../../../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../../../../components/TableNoRecordsFound";
import { DateWithHoursColumnFormatter } from "../../../../../../../../utils/column-formatter/DateWithHoursColumnFormatter";

export function ListingTable( { activitiesRegisters, contactsTypes } ) {

    const [show, openModal, closeModal, id] = useModal()

    const columns = [
        {
            dataField: "contactType",
            text: "Tipo de contacto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha y hora",
            formatter: DateWithHoursColumnFormatter,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "manager",
            text: "Gestor",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: activitiesRegisters.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        activitiesRegisters.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Registros de actividad"}/>
        ) : (
            <>
                <PaginatedTable
                    columns={columns}
                    data={activitiesRegisters}
                    defaultSorted={defaultSorted}
                    setQueryParams={setQueryParams}
                    paginationOptions={paginationOptions}
                    openModal={openModal}
                    hover
                    rowStyle
                />
                <ActivityRegisterModal 
                    show={show} 
                    onHide={closeModal} 
                    id={id} 
                    contactsTypes={contactsTypes}
                />
            </>
        )
    )
}

 
ListingTable.defaultProps = {
    usersData: []
};

ListingTable.propTypes = {
    usersData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        user: propTypes.string,
        password: propTypes.string,
        email: propTypes.string,
        status: propTypes.number,
    }))
}

import React from "react";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";
import { MovementTypeColumnFormatter } from "./column-formatters/MovementTypeColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { RemoveDetailColumnFormatter } from "./column-formatters/RemoveDetailColumnFormatter";

export function ListingTable( { seatingTemplates, openEditModal, setlist } ) {

    const columns = [
        {
            dataField: "groupName",
            text: "Grupo",
            classes: "text-center",
            headerClasses: "text-center",
        },
        {
            dataField: "accountName",
            text: "Cuenta",
            classes: "text-center",
            headerClasses: "text-center",
        },
        {
            dataField: "subAccountName",
            text: "Subcuenta",
            classes: "text-center",
            headerClasses: "text-center",
        },
        {
            dataField: "auxName",
            text: "Cuenta auxiliar",
            classes: "text-center",
            headerClasses: "text-center",
        },
        {
            dataField: "movementType",
            text: "",
            formatter: MovementTypeColumnFormatter,
            classes: "text-right",
        },
        {
            dataField: "",
            text: "Editar",
            formatter: ActionColumnFormatter,
            classes: "text-right",
            headerClasses: 'text-center',
            formatExtraData: {
                openEditModal
            }
        },
        {
            dataField: ".",
            text: "Eliminar",
            formatter: RemoveDetailColumnFormatter,
            classes: "text-right",
            headerClasses: 'text-center',
            formatExtraData: {
                setlist
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
        totalSize: seatingTemplates.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        seatingTemplates.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Detalles"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={seatingTemplates}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    seatingTemplates: []
};
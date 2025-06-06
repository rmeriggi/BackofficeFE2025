/* eslint-disable no-undef */
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components";
import { sortCaret, headerSortingClasses } from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { deleteSupplier } from "../../../../../_redux/suppliers/suppliersCrud";
import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { DeleteColumnFormatter } from "./column-formatters/DeleteColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { DeleteSupplierModal } from "../../../../Clients/BankAccounts/pages/Listing/components/DeleteSuplierModal";

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.business_name !== "") {
        filteredData = accountsData.filter(account => {
            if (account?.business_name?.trim().toLowerCase().includes(filter.business_name.toLowerCase())) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
};

export function ListingTable({ pnlData, setEditInitialData, setShowEditModal, refetchSuppliers }) { 
    const history = useHistory();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);

    const handleOpenDeleteModal = (id) => {
        setSelectedSupplierId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSupplier(id);
            console.log("Proveedor eliminado correctamente.");
            refetchSuppliers(); // Llama a la función para recargar la lista de proveedores
        } catch (error) {
            console.error("Error al eliminar el proveedor:", error);
        }
    };

    const columns = [
        {
            dataField: "business_name",
            text: "NOMBRE / RAZÓN SOCIAL",
            headerStyle: { textAlign: 'left' },
            align: 'left',
            sort: true,
            sortValue: (cell) => parseInt(cell, 10),
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "category_id",
            text: "CATEGORÍA",
            headerStyle: { textAlign: 'right' },
            align: 'center',  
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "cuit",
            text: "CUIT",
            headerStyle: { textAlign: 'right' },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "center_id",
            text: "CENTRO DE COSTOS",
            headerStyle: { textAlign: 'right' },
            align: 'center',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "",
            text: "",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                fnAction: (data) => {
                    history.push(`/suppliers/suppliers/edit/${data.id}`)                  
                },      
            }
        },
        {
            dataField: "",
            text: "",
            formatter: DeleteColumnFormatter,
            formatExtraData: {
                fnAction: (data) => {
                    handleOpenDeleteModal(data.id); 
                },      
            }
        }
    ];

    const {
        queryParamsInstrument,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(pnlData, queryParamsInstrument.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        <>
            {filteredData.length === 0 ? (
                <TableNoRecordsFoundMessage entities={"registros"} />
            ) : (
                <PaginatedTable
                    columns={columns}
                    data={filteredData}
                    defaultSorted={defaultSorted}
                    paginationOptions={paginationOptions}
                    setSize={setSize}
                    setPageNumber={setPageNumber}
                />
            )}
            <DeleteSupplierModal 
                show={showDeleteModal} 
                setShow={setShowDeleteModal} 
                supplierId={selectedSupplierId} 
                refetchSuppliers={refetchSuppliers} 
            />
        </>
    );
}

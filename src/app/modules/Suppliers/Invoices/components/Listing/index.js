import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchInvoices } from "../../../../../hooks/useFetchInvoices";
import { createNewInvoice } from "../../../../../_redux/invoices/InvoicesActions";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import { DeleteInvoiceModal } from "../Modal/DeleteModal";

export default function Listing() {    
    const dispatch = useDispatch();
    const [invoices, loading, reloadInvoices] = useFetchInvoices(); 
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editInitialData, setEditInitialData] = useState({});
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);

    const handleCreateInvoice = (invoiceData) => {
        dispatch(createNewInvoice(invoiceData)).then(() => {
            setShowCreateModal(false);
            reloadInvoices(); 
        });
    };

    const handleDeleteSuccess = () => {
        setShowDeleteModal(false);
        reloadInvoices(); 
    };

    const openDeleteModal = (id) => {
        setInvoiceToDelete(id);
        setShowDeleteModal(true);
    };

    if (!invoices || loading) {
        return <LayoutSplashScreen />;
    }

    return (
        <>
        <Card>
            <CardHeader className="py-8" title="COMPROBANTES">
                <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={invoices.length === 0} 
                        data={invoices}
                        setShowCreateModal={setShowCreateModal} 
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable
                        pnlData={invoices}
                        setShowEditModal={setShowEditModal}
                        setEditInitialData={setEditInitialData}
                        openDeleteModal={openDeleteModal}
                    />
                }
            </CardBody>
            <CreateModal
                show={showCreateModal}
                setShow={setShowCreateModal}
                onSubmit={handleCreateInvoice}
            />
            <EditModal
                show={showEditModal}
                setShow={setShowEditModal}    
                editInitialData={editInitialData}           
            />
            <DeleteInvoiceModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                invoiceId={invoiceToDelete}
                onDeleteSuccess={handleDeleteSuccess}
            />
        </Card>       
        </>
    );
}

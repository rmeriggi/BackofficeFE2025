import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { useFetchSignaturesByClient } from "../../../../../hooks/useFetchSignaturesByClient";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import { useParams } from "react-router-dom";

export default function ListingSignatures() {
    const { id } = useParams();
    const [signaturesByClient, loadingSignaturesByClient] = useFetchSignaturesByClient(id);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editInitialData, setEditInitialData] = useState({});

    if (!signaturesByClient || loadingSignaturesByClient) {
        return <LayoutSplashScreen />;
    }

    return (
        <>
            <Card>
                <CardHeader title="Firmantes">
                    <CardHeaderToolbar>
                        <ListingFilter
                            disabled={signaturesByClient.length === 0}
                            data={signaturesByClient}
                            setShowCreateModal={setShowCreateModal}
                        />
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    {loadingSignaturesByClient ?
                        <CircularProgress size={20} color="secondary" />
                        :
                        <ListingTable
                            setShowEditModal={setShowEditModal}
                            setEditInitialData={setEditInitialData}
                            signaturesByClienData={signaturesByClient}
                        />
                    }
                </CardBody>
                <CreateModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    setShow={setShowCreateModal}
                />
                <EditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    setShow={setShowEditModal}
                    editInitialData={editInitialData}
                />
            </Card>
        </>
    );
}

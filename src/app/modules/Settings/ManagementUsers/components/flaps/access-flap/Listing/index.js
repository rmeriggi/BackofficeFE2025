import React, { useState } from "react";
import { useParams } from "react-router";
import { Button } from "@material-ui/core";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CreateAccessModal } from "../../../modals/CreateAccessModal";
import { SnackbarMessage } from "../../../../../../../components/SnackbarMessage";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import { useAllAccess } from "../../../../utils/apiHooks";
import { LayoutSplashScreen } from "../../../../../../../../_metronic/layout";

export default function Listing() {
    const isMounted = useIsMountedRef();
    const { id } = useParams()
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState("Permiso creado correctamente.")
    const [permissionsData, permissionsCompleted] = useAllAccess(isMounted, id, open);

    if (!permissionsCompleted) {
        return <LayoutSplashScreen />;
    }
      
    const { permissions } = permissionsData

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const openCreateNewAccess = () => {
        setShowModal(true)
    }
    const closeCreateNewAccess = () => {
        setShowModal(false)
    }

    return (
        <Card>
            <CardHeader title="Permisos">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={permissions.length === 0}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateNewAccess() }
                    >
                        Crear Permiso
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <CreateAccessModal
                    show={showModal}
                    onHide={closeCreateNewAccess}
                    idUser={id}
                    setOpen={setOpen}
                    setVariant={setVariant}
                    setMessage={setMessage}
                />
                <ListingTable 
                    accessData={permissions}
                    setOpen={setOpen}
                    setVariant={setVariant}
                    setMessage={setMessage}
                />
                <SnackbarMessage
                    handleClose={handleClose}
                    open={open}
                    variant={variant}
                    message={message}
                />
            </CardBody>
        </Card>
    )
}
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {ListingTable} from "./ListingTable";
import { useAllPrograms} from "../../../../utils/apiHook"
import { useParams } from "react-router-dom";
import { CreateProgramModal } from "../modals/CreateProgramModal";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import {LayoutSplashScreen} from "../../../../../../../../_metronic/layout"
import { SnackbarMessage } from "../../../../../../../components/SnackbarMessage";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState("El programa fue creado correctamente.")

    const [showModal, setShowModal] = useState(false)

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    const openCreateNewProgram = () => {
        setShowModal(true)
    }

    const closeCreateProgram = () => {
        setShowModal(false)
    }

    const isMounted = useIsMountedRef();
    const {id} = useParams()

    const [programData, programCompleted] = useAllPrograms(isMounted, id, open); 

    if (!programCompleted) {
        return <LayoutSplashScreen />;
    }

    const { programs } = programData

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateNewProgram() }
                    >
                        Crear Programa
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <CreateProgramModal 
                    show={showModal}
                    onHide={closeCreateProgram}
                    setOpen={setOpen}
                    setVariant={setVariant}
                    setMessage={setMessage}
                />
                <ListingTable 
                    programData={programs}
                    setVariant={setVariant}
                    setMessage={setMessage}
                    setOpen={setOpen}
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
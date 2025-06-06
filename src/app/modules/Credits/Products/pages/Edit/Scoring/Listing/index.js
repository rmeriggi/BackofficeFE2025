/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {ListingTable} from "./ListingTable";
import { useAllScoring} from "../../../../utils/apiHook"
import { useEditContext } from "../../Context/EditContext";
import { CreateScoringModal } from "../modals/CreateScoringModal";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";
import {LayoutSplashScreen} from "../../../../../../../../_metronic/layout"
import { SnackbarMessage } from "../../../../../../../components/SnackbarMessage";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../../_metronic/_partials/controls";
import { useParams } from "react-router-dom";

export default function Listing() {

    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState("Scoring fue creado correctamente.")
    const {scoreSourceData, scoreParamsData } = useEditContext()
    const [showModal, setShowModal] = useState(false)
    const {id} = useParams()

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    const openCreateNewScoring = () => {
        setShowModal(true)
    }

    const closeCreateScoring = () => {
        setShowModal(false)
    }

    const isMounted = useIsMountedRef();
    const [scoringData, scoringCompleted] = useAllScoring(isMounted, open, id);

    if (!scoringCompleted) {
        return <LayoutSplashScreen />;
    }
    
    const { scoring } = scoringData
    const {scoreSource} = scoreSourceData
    const {scoreParams} = scoreParamsData

    const newArr = scoring.map(s => {
        const idScoreSource = scoreSource.find(source => s.idScoreSource == source.id).source || "Sin datos"
        const idScoreParams = scoreParams.find(params => s.idScoreParams == params.id).scoreParam || "Sin datos"
        return {
            ...s,
            idScoreSource,
            idScoreParams
        }
    })
  
    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateNewScoring() }
                    >
                        Crear Segmentación
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <CreateScoringModal 
                    show={showModal}
                    onHide={closeCreateScoring}
                    setOpen={setOpen}
                    setVariant={setVariant}
                    setMessage={setMessage}
                />
                <ListingTable 
                    scoringData={newArr}
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
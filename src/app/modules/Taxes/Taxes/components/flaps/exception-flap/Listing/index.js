import React, { useState } from "react";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {CreateExceptionModal} from "../../../modals/CreateExceptionModal"
import { useParams } from "react-router";
import { Button } from "@material-ui/core";

export default function Listing({ exceptions }) {

    const {id} = useParams()

    const [showModal, setShowModal] = useState(false)

    const openCreateClientException = () => {
        setShowModal(true)
    }
    const closeCreateClientException = () => {
        setShowModal(false)
    }

    return (
        <Card>
            <CardHeader title="Excepciones">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={exceptions.length === 0}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateClientException() }
                        >
                        Crear Excepción
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                    <CreateExceptionModal
                        show={showModal}
                        onHide={closeCreateClientException}
                        idTax={id}
                    />
                    <ListingTable exceptionsData={exceptions}/>
            </CardBody>
        </Card>
    )
}
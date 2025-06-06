import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CreateUserModal } from "../modals/CreateUserModal";
import {LayoutSplashScreen} from "../../../../../../_metronic/layout"
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useCallAPI } from "../../../../../hooks";
import { getAllUsers } from "../../../../../utils/service";

const formatIds = (users) => {
    const usersformatted = users.map((e) => {
        e.id = Number(e.id)
        return e
    })
    return usersformatted
}

export default function Listing() {

    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState("El usuario fue creado correctamente.")
    const [usersData, setUsers] = useState()
    const [showModal, setShowModal] = useState(false)

    useCallAPI(getAllUsers, setUsers)

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    const openCreateNewUser = () => {
        setShowModal(true)
    }

    const closeCreateUser = () => {
        setShowModal(false)
    }

    if (!usersData) {
        return <LayoutSplashScreen />;
    }
    
    const { users } = usersData

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={users.length === 0}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateNewUser() }
                    >
                        Crear Usuario
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <CreateUserModal 
                    show={showModal}
                    onHide={closeCreateUser}
                    setOpen={setOpen}
                    setVariant={setVariant}
                    setMessage={setMessage}
                />
                <ListingTable usersData={formatIds(users)}/>
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
import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../_metronic/_partials/controls";
import { accountsAdapter } from "./adapters/accountsAdapters";
import { Button } from "@material-ui/core";
import { useModal } from '../../../../../../hooks/useModal'
import { AddBankModal } from "./addBankModal/AddBankModal";
import { useSnackBar } from "../../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";

const accountMock = {
    accounts: [
        {
            accountName: "Cuenta 1",
            bank: "Banco 1",
            type: "Tipo 1",
            currency: "Moneda 1",
        },
        {
            accountName: "Cuenta 2",
            bank: "Banco 2",
            type: "Tipo 2",
            currency: "Moneda 2",
        }
    ]
}

export default function ListingBanks() {

    const [show, openModal, closeModal] = useModal()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()

    const accounts = accountsAdapter(accountMock.accounts);

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={accounts.length === 0} 
                    data={accounts} 
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className="ml-4"
                    size="large"
                    onClick={() => openModal()}
                >
                    Agregar Cuenta
                </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    data={accounts} 
                />
            </CardBody>
            <AddBankModal
                show={show}
                onHide={closeModal}
                setOpenMessage={setOpenMessage}
            />
            <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
            />
        </Card>
    )
}
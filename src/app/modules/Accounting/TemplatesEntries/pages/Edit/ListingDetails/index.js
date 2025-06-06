import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../_metronic/_partials/controls";
import { ModalEditTemplate } from "./modal/modalEditTemplate";
import { ModalCreateTemplate } from "./modal/modalCreateTemplate";
import { Button, CircularProgress } from "@material-ui/core";

export default function Listing(props) {
    
    const openCreateModal = () => {
        props.setShow(true)
    }

    const handleCloseCreate = () => {
        props.setShow(false)
    }

    return (
        <Card>
            <CardHeader title="Detalle">
                <CardHeaderToolbar>
                    {props.loading && (<CircularProgress size={20} color="secondary" />)}
                    <Button
                        variant="contained"
                        color="secondary"
                        className="ml-4"
                        size="large"
                        onClick={()=> openCreateModal() }
                    >
                        Agregar Detalle
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    seatingTemplates={props.data} 
                    openEditModal={props.openModal}
                />
                {props.show && 
                    <ModalEditTemplate 
                        show={props.show}
                        hide={props.closeModal}
                        data={props.data} 
                        id={props.id}
                        idHeader={props.idHeader} 
                        accounts={props.accounts}
                        subAccounts={props.subAccounts}
                        auxiliariesAccounts={props.auxiliariesAccounts}
                        groups={props.accountingGroups}
                        setlist={props.setlist}
                        setLoading={props.setLoading}
                    />
                }
                {props.showCreate && 
                    <ModalCreateTemplate
                        show={props.showCreate}
                        hide={handleCloseCreate}
                        data={props.data} 
                        idHeader={props.idHeader} 
                        accounts={props.accounts}
                        subAccounts={props.subAccounts}
                        auxiliariesAccounts={props.auxiliariesAccounts}
                        groups={props.accountingGroups}
                        setlist={props.setlist}
                        setLoading={props.setLoading}
                    />
                }
            </CardBody>
        </Card>
    )
}
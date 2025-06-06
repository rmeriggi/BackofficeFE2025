import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useFetchCombos } from "../../../../../hooks";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import {  getCounterparties } from "../../../../../_redux/combos/combosActions";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {
    const [counterparties] = useFetchCombos('counterparties', getCounterparties)  
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editInitialData, setEditInitialData]=useState({})

    if(!counterparties){
        return <LayoutSplashScreen />
      }

    return (
        <>
        <Card>
            <CardHeader title="Contrapartes">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={counterparties.length === 0} 
                        data={counterparties} 
                        setShowCreateModal={setShowCreateModal} 
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>             
                    <ListingTable
                      setShowEditModal={setShowEditModal}
                      setEditInitialData={setEditInitialData}
                      counterparties={counterparties}/>                
            </CardBody>
            <CreateModal
                show={showCreateModal}
                onHide={!showCreateModal}
                setShow={setShowCreateModal}             
            />
               <EditModal
                show={showEditModal}
                onHide={!showEditModal}
                setShow={setShowEditModal}    
                editInitialData={editInitialData}           
            />
         </Card>             
        </>
    )
}

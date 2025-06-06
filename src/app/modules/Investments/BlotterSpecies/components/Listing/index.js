import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import { useFetchCombos } from "../../../../../hooks";
import { getSpecies } from "../../../../../_redux/combos/combosActions";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {

    const [species] = useFetchCombos('species', getSpecies)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editInitialData, setEditInitialData]=useState({})


    if(!species){
        return <LayoutSplashScreen />
      }

    return (
        <>
        <Card>
            <CardHeader title="Especies">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={species.length === 0} 
                        data={species} 
                        setShowCreateModal={setShowCreateModal}                        
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>             
                    <ListingTable
                     setShowEditModal={setShowEditModal}
                     setEditInitialData={setEditInitialData}
                     species={species}/>                
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

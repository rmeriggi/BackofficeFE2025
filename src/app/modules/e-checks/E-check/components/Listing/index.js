import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchEchecks } from "../../../../../hooks/useFetchEchecks";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
export default function Listing() {

  
    const [echecks , loading] = useFetchEchecks()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editInitialData, setEditInitialData]=useState({})

    if(!echecks|| loading ){
        return <LayoutSplashScreen />
      }

    return (
        <>
        <Card>
            <CardHeader className="py-8" title="E-CHEQS">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={echecks.length === 0} 
                        data={echecks}
                        setShowCreateModal={setShowCreateModal} 
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable
                    pnlData={echecks}
                    setShowEditModal={setShowEditModal}
                    setEditInitialData={setEditInitialData}/>
                }
                 
            </CardBody>
            <CreateModal
                show={showCreateModal}
                setShow={setShowCreateModal}             
            />
               <EditModal
                show={showEditModal}
                setShow={setShowEditModal}    
                editInitialData={editInitialData}           
            />
        </Card>       
        </>
    )
}

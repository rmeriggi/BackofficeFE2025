import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import { useFetchBlotters } from "../../../../../hooks/useFetchBlotters";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {

    const [blotters , loading]=useFetchBlotters()    
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [editInitialData, setEditInitialData]=useState({})

    if(!blotters || loading){
        return <LayoutSplashScreen />
      }

    return (
        <Card>
            <CardHeader title="Trading - Listado de Operaciones">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={blotters.length === 0} 
                        data={blotters} 
                        setShowCreateModal={setShowCreateModal}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable
                    setShowCreateModal={setShowEditModal}
                    setEdit={setEdit}
                    setEditInitialData={setEditInitialData}
                    blotterData={blotters}/>
                }
                 
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
                isEdit={isEdit}            
            />
        </Card>
    )
}

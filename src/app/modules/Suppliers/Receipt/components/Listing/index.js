import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { CreateModal } from "../Modal/CreateModal";
import { EditModal } from "../Modal/EditModal";
import { useFetchSuppliers } from "../../../../../hooks/useFetchSuppliers";

export default function Listing() {  

    const [suppliers, loading] = useFetchSuppliers()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editInitialData, setEditInitialData]=useState({})

    if(!suppliers|| loading ){
        return <LayoutSplashScreen />
      }

    return (
        <>
        <Card>
            <CardHeader className="py-8" title="PROVEEDORES">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={suppliers.length === 0} 
                        data={suppliers}
                        setShowCreateModal={setShowCreateModal} 
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable
                    pnlData={suppliers}
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

import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useFetchNotifications } from "../../../../../hooks/useFetchNotifications";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";

export default function Listing() {
  const [notifications, loading] = useFetchNotifications();
  const [, /* showCreateModal */ setShowCreateModal] = useState(false);
  const [, /* showEditModal */ setShowEditModal] = useState(false);
  const [, /* editInitialData */ setEditInitialData] = useState({});

  if (!notifications || loading) {
    return <LayoutSplashScreen />;
  }

  return (
    <>
      <Card>
        <CardHeader title="Notificaciones">
          <CardHeaderToolbar>
            <ListingFilter
              disabled={notifications.length === 0}
              data={notifications}
              setShowCreateModal={setShowCreateModal}
            />
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ListingTable
            setShowEditModal={setShowEditModal}
            setEditInitialData={setEditInitialData}
            counterparties={notifications}
          />
        </CardBody>
        {/* <CreateModal
                show={showCreateModal}
                onHide={!showCreateModal}
                setShow={setShowCreateModal}             
            />
               <EditModal
                show={showEditModal}
                onHide={!showEditModal}
                setShow={setShowEditModal}    
                editInitialData={editInitialData}           
            /> */}
      </Card>
    </>
  );
}

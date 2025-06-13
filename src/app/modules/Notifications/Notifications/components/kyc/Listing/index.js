import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../../_metronic/_partials/controls";
export default function Listing() {
  const [, /* showCreateModal */ setShowCreateModal] = useState(false);
  const [, /* showEditModal */ setShowEditModal] = useState(false);
  const [, /* editInitialData */ setEditInitialData] = useState({});

  const clients = [
    {
      id: "1",
      name: "Rodrigo Alberto",
      lastName: "Meriggi",
      passport: 20215584926,
      email: "rodrigo@myhnt.com.ar",
      status: "1",
      country: "54",
      date: "2024-10-17T19:17:42",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "2",
      name: "Ezequiel",
      lastName: "Ortiz",
      passport: 20354145031,
      email: "esequiel.ortiz@gmail.com",
      status: "1",
      country: "54",
      date: "2024-10-17T19:25:26",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "3",
      name: "Juan Ignacio",
      lastName: "Gonzalez",
      passport: 20272267325,
      email: "jgonzalez@max.capital",
      status: "1",
      country: "54",
      date: "2024-10-17T19:29:03",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "4",
      name: "Marco Ruben",
      lastName: "Serratore",
      passport: 20280324435,
      email: "marcoserratore@gmail.com",
      status: "1",
      country: "54",
      date: "2024-10-17T23:02:44",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "5",
      name: "MAX PAY",
      lastName: "SA",
      passport: 30718318846,
      email: "jgonzalez@maxpay.com.ar",
      status: "2",
      country: "54",
      date: "2024-10-22T15:19:42",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "6",
      name: "Gabriel Edgardo",
      lastName: "Castro",
      passport: 20314638841,
      email: "gaecastro@gmail.comBAJA",
      status: "6",
      country: "54",
      date: "2024-11-11T17:52:00",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "7",
      name: "Diego Agustin",
      lastName: "Kena",
      passport: 23326742619,
      email: "diego.kena.s23@gmail.com",
      status: "1",
      country: "54",
      date: "2025-01-30T18:34:55",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
    {
      id: "8",
      name: "Matias",
      lastName: "Sebastiao",
      passport: 32310700959,
      email: "msebastiao@max.capital",
      status: "2",
      country: "54",
      date: "2025-02-03T19:06:35",
      pep: false,
      so: false,
      facta: false,
      rfe: false,
      aagi: false,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader title="Notificaciones">
          {/*    <CardHeaderToolbar>
            <ListingFilter
              disabled={clients.length === 0}
              data={clients}
              setShowCreateModal={setShowCreateModal}
            />
          </CardHeaderToolbar> */}
        </CardHeader>
        <CardBody>
          <ListingTable
            setShowEditModal={setShowEditModal}
            setEditInitialData={setEditInitialData}
            counterparties={clients}
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

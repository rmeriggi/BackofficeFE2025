import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { AccountingEntriesModal } from "../components/modal/modal/AccountingEntriesModal";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
/* import { getAccountingEntries } from "../../utils/service"; */
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { getBooksVista } from "../../../../../_redux/accounting/accountingCrud";
import { ModalCreate } from "../components/modal/modalCreate/modalCreate";

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const initialValues = {
  fromDate: yesterday,
  toDate: new Date(),
  id_client: 125,
};

export default function Listing() {
  const [values, setValues] = useState(initialValues);

  const [accountingEntriesData, setAccountiengEntries] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const getAllAccountingEntries = async () => {
      // Convertir las fechas a formato ISO string
      const apiValues = {
        ...values,
        fromDate: values.fromDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
        toDate: values.toDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      };

      try {
        const accountingEntries = await getBooksVista(apiValues);
        console.log("accountingEntries", accountingEntries);

        // Validar que los datos tengan la estructura correcta
        if (
          accountingEntries &&
          accountingEntries.asientos &&
          Array.isArray(accountingEntries.asientos)
        ) {
          console.log(
            "Datos válidos recibidos, cantidad de asientos:",
            accountingEntries.asientos.length
          );
          console.log("Primer asiento:", accountingEntries.asientos[0]);
          setAccountiengEntries(accountingEntries);
        } else {
          console.error("Datos inválidos recibidos:", accountingEntries);
          setAccountiengEntries({ asientos: [] });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setAccountiengEntries({ asientos: [] });
      }
    };
    getAllAccountingEntries();
  }, [values]);

  const openDetailsModal = (id) => {
    setId(id);
    setShowModal(true);
  };
  const closeDetailsModal = () => {
    setShowModal(false);
  };

  const openCreateModal = () => {
    setShowModalCreate(true);
  };
  const closeCreateModal = () => {
    setShowModalCreate(false);
  };

  if (accountingEntriesData === undefined) return <LayoutSplashScreen />;

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter
            disabled={
              !accountingEntriesData ||
              !accountingEntriesData.asientos ||
              accountingEntriesData.asientos.length === 0
            }
            data={accountingEntriesData || { asientos: [] }}
            setValues={setValues}
            values={values}
            openCreateModal={openCreateModal}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {showModal && (
          <AccountingEntriesModal
            show={showModal}
            onHide={closeDetailsModal}
            idEntryDetail={id}
          />
        )}
        {showModalCreate && (
          <ModalCreate show={showModalCreate} onHide={closeCreateModal} />
        )}
        <ListingTable
          accountingEntriesData={accountingEntriesData || { asientos: [] }}
          openDetailsModal={openDetailsModal}
        />
      </CardBody>
    </Card>
  );
}

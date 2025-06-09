import React, { useState, useEffect } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { AccountingEntriesModal } from "../components/modal/modal/AccountingEntriesModal";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
/* import { getAccountingEntries } from "../../utils/service"; */
import { ModalCreate } from "../components/modal/modalCreate/modalCreate";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { getBooksVista } from "../../../../../_redux/accounting/accountingCrud";

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const initialValues = {
  fromDate: yesterday,
  toDate: new Date(),
  id_client: 1,
};

export default function Listing() {
  const [values, setValues] = useState(initialValues);

  const [accountingEntriesData, setAccountiengEntries] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const getAllAccountingEntries = async () => {
      const accountingEntries = await getBooksVista(values);
      console.log("accountingEntries", accountingEntries);
      setAccountiengEntries(accountingEntries);
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

  if (!accountingEntriesData) return <LayoutSplashScreen />;

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter
            disabled={accountingEntriesData.length === 0}
            data={accountingEntriesData}
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
          accountingEntriesData={accountingEntriesData}
          openDetailsModal={openDetailsModal}
        />
      </CardBody>
    </Card>
  );
}

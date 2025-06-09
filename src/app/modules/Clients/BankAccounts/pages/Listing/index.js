import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchBankAccounts } from "../../../../../hooks";
import { Listing } from "../Listing/components/Listing/Listing";
import { useBankAccountsContext } from "../../context/BankAccountsContext";
import {
  columnsClients,
  columnsToReportClients,
  filterSearch,
} from "../../context/ContextHelper";
import { useFormatColumn } from "../../hooks/useFormatColumn";
/* import { useDispatch } from "react-redux"; */
import { CreateModal } from "../Listing/components/CreateModal";
import { DeleteModal } from "../Listing/components/DeleteModal";
/* import { getBankAccountById } from "../../../../../_redux/bankAccounts/bankAccountsActions";
 */
export default function BankAccountsListing() {
  const idParam = useParams().id;
  /*   const dispatch = useDispatch(); */
  const [bankAccounts, loading] = useFetchBankAccounts(idParam);
  const values = useBankAccountsContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleShowDeleteModal = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleShowModalCreate = () => {
    setShowCreateModal(true);
  };

  const formats = useFormatColumn(handleShowDeleteModal);

  if (!bankAccounts || loading) {
    return <LayoutSplashScreen />;
  }

  return (
    <>
      <Listing
        title="Cuentas Bancarias"
        listing={bankAccounts}
        idClient={bankAccounts[0].idClient}
        dataForButtons={[{ fn: handleShowModalCreate, title: "Añadir Cuenta" }]}
        downloadList={true}
        downloadFormatList={{
          listing: filterSearch(bankAccounts, values.queryParams.filter),
          columns: columnsToReportClients,
        }}
        tableProps={{
          columns: columnsClients,
          fnFilter: filterSearch,
          formatsColumns: formats,
          name: "Cuentas Bancarias",
        }}
        contextValues={values}
      />
      <CreateModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        setShow={setShowCreateModal}
      />
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        setShow={setShowDeleteModal}
        id={idToDelete}
      />
    </>
  );
}

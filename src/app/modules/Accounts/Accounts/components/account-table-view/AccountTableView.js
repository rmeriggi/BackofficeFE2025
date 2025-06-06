import React, { useState } from "react";
import AccountsData from "../AccountsData";
import { Button } from "@material-ui/core";
import {ListingTable} from "./ListingTable";
import { ReceiptModal } from "../../../../../components/ReceiptModal";
import { useHistory, useParams } from "react-router-dom";
import { useAllTransactions, useOneAccount } from "../../utils/apiHooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { AdjustCreditDebitModal } from "../AdjustCreditDebitModal";
import { SnackbarMessage } from "../../../../../components";
import { shallowEqual, useSelector } from "react-redux";

export default function AccountTableView() {
  const {id} = useParams()
  const history = useHistory()
  const isMounted = useIsMountedRef()
  const [showModal, setShowModal] = useState(false)
  const [idTransaction, setIdTransaction] = useState("")
  const [allTransactions, allTransactionsCompleted] = useAllTransactions(id, isMounted)
  const [oneAccount, oneAccountCompleted] = useOneAccount(id, isMounted)
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [adjustModalType, setAdjustModalType] = useState("credit")
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El ajuste fue realizado correctamente.")
  const { hasAccountsSettingasAccess } = useSelector(
    ({ auth }) => ({
        hasAccountsSettingasAccess: auth.access['accounts.Ajustes']
    }),
    shallowEqual
  );

  const openReceipt = (id) => {
    setShowModal(true)
    setIdTransaction(id)
  }
  const closeReceipt = () => {
    setShowModal(false)
  }

  if(!(allTransactionsCompleted && oneAccountCompleted)){
    return <LayoutSplashScreen />
  }
  const {transactions} = allTransactions
  const { account } = oneAccount

  const backToAccountsList = () => {
    history.push(`/accounts/accounts`);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
}

  return (
      <Card>
        <CardHeader title="Listado de Transacciones" noWrap>
          <CardHeaderToolbar className="w-100 justify-content-between">
            <AccountsData account={account}/>
            {hasAccountsSettingasAccess && <Button
              variant="outlined"
              color="secondary"
              className="ml-4"
              size="large"
              onClick={() => {
                setAdjustModalType("credit");
                setShowAdjustModal(true);
              }}
            >
              Ajuste credito
            </Button>}
            {hasAccountsSettingasAccess && <Button
              variant="outlined"
              color="secondary"
              className="ml-4"
              size="large"
              onClick={() => {
                setAdjustModalType("debit");
                setShowAdjustModal(true);
              }}
            >
              Ajuste debito
            </Button>}
            <Button
              variant="outlined"
              color="secondary"
              className="ml-4"
              size="large"
              onClick={backToAccountsList}
            >
              Volver
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ReceiptModal
            allowReversar={hasAccountsSettingasAccess}
            show={showModal}
            onHide={closeReceipt}
            idTransaction={idTransaction}
            setId={setIdTransaction}
            setOpenSnackbar={setOpenSnackbar}
            setVariant={setVariant}
            setMessage={setMessage}
          />
          <AdjustCreditDebitModal
            type={adjustModalType}
            show={showAdjustModal}
            onHide={() => setShowAdjustModal(false)}
            setOpenSnackbar={setOpenSnackbar}
            setVariant={setVariant}
            setMessage={setMessage}
          />
          <SnackbarMessage
              handleClose={handleCloseSnackbar}
              open={openSnackbar}
              variant={variant}
              message={message}
          />
          <ListingTable accountsTransactionsData={transactions} openReceipt={openReceipt}/>
        </CardBody>
      </Card>
  )
}
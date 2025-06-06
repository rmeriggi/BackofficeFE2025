/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useAllModules, useOneDetail, useOneHeader } from "../../utils/apiHook";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { TemplatesEntriesEditForm } from "./TemplatesEntriesEditForm" 
import { initialParamsAccounts, initialParamsAuxAccounts, initialParamsSubaccounts } from "../../../initialParams";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service";
import { getAllAuxAccounts } from "../../../AuxiliaryAccounts/utils/service";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service"
import { useModal } from "../../../../../hooks/useModal";

export function TemplatesEntriesEdit({history,match: {params: { id },}}) {

  const isMountedRef = useIsMountedRef();
  const [header, headerComplete] = useOneHeader(id, isMountedRef) 
  const [groupsData, setGroupsData] = useState();
  const [accountsData, setAccountsData] = useState();  
  const [subaccountsData, setSubaccountsData] = useState()
  const [auxiliaryAccountsData, setAuxiliaryAccountsData] = useState()
  const [modules, modulesDataCompleted] = useAllModules(isMountedRef)
  const [show, openModal, closeModal, modalId] = useModal() 
  const [showCreate, setShow] = useState(false);
  const [loading, setLoading] = useState()
  const [detail, detailComplete] = useOneDetail(id, isMountedRef, show, setLoading, showCreate) 
  
  useEffect(() => {
    const getGroups = async () => {
    const response = await getAllAccountingGroup(initialParamsAccounts)
    setGroupsData(response)
    }
    getGroups()
  }, [])

  useEffect(() => {
    const getAccounts = async () => {
    const response = await getAllAccounts(initialParamsAccounts)
    setAccountsData(response)
    }
    getAccounts()
  }, [])

  useEffect(()=>{
      const getData = async() => {
          const response = await getAllSubaccounts(initialParamsSubaccounts)
          setSubaccountsData(response)
      }
      getData()
  }, [])

  useEffect(() => {
      const getAuxAccounts = async () => {
      const response = await getAllAuxAccounts(initialParamsAuxAccounts)
      setAuxiliaryAccountsData(response)
      }
      getAuxAccounts()
  }, [])

  useEffect(() => {
    const getGroups = async () => {
    const response = await getAllAccountingGroup(initialParamsAccounts)
    setGroupsData(response)
    }
    getGroups()
  }, [])

  useEffect(() => {
    const getAccounts = async () => {
    const response = await getAllAccounts(initialParamsAccounts)
    setAccountsData(response)
    }
    getAccounts()
  }, [])

  useEffect(()=>{
      const getData = async() => {
          const response = await getAllSubaccounts(initialParamsSubaccounts)
          setSubaccountsData(response)
      }
      getData()
  }, [])

  useEffect(() => {
      const getAuxAccounts = async () => {
      const response = await getAllAuxAccounts(initialParamsAuxAccounts)
      setAuxiliaryAccountsData(response)
      }
      getAuxAccounts()
  }, [])
  
  if(!(
      groupsData &&
      accountsData &&
      subaccountsData &&
      auxiliaryAccountsData &&
      headerComplete && 
      detailComplete &&
      modulesDataCompleted
    )){
    return <LayoutSplashScreen />
  }

  const auxiliariesAccounts = auxiliaryAccountsData.auxiliariesAccounts? auxiliaryAccountsData.auxiliariesAccounts : [];
  const { subAccounts } = subaccountsData;
  const { accounts } = accountsData;
  const { seatingTemplateHeader } = header
  const { accountingGroups } = groupsData;
  
  const backToTemplatesEditPage = () => {
    history.push(`/accounting/templates-entries`);
  };

  return (
    <Card>
      <CardHeader title="Editar Plantilla Asiento">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToTemplatesEditPage}
          >
            Volver
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <TemplatesEntriesEditForm 
            seatingTemplateHeader={seatingTemplateHeader} 
            seatingTemplateDetail={detail} 
            auxiliariesAccounts={auxiliariesAccounts} 
            subAccounts={subAccounts} 
            accounts={accounts} 
            modules={modules}
            accountingGroups={accountingGroups}
            show={show}
            closeModal={closeModal}
            openModal={openModal}
            id={modalId}
            loading={loading}
            setLoading={setLoading}
            showCreate={showCreate}
            setShow={setShow}
          />
        </div>
      </CardBody>
    </Card>
  );
}


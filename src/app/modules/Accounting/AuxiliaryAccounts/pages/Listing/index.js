/* eslint-disable eqeqeq */
import { GridOn, List } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import {
  initialParamsAccounts,
  initialParamsAuxAccounts,
  initialParamsGroups,
  initialParamsSubaccounts,
} from "../../../initialParams";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service";
import { getAllAuxAccounts } from "../../utils/service";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";
import ModernListingTableCards from "./ModernListingTableCards";

export default function Listing() {
  const [groupsData, setGroupsData] = useState();
  const [accountsData, setAccountsData] = useState();
  const [subaccountsData, setSubaccountsData] = useState();
  const [auxParams, setAuxParams] = useState(initialParamsAuxAccounts);
  const [auxiliaryAccountsData, setAuxiliaryAccountsData] = useState();
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const getAccountingGroup = async () => {
      const response = await getAllAccountingGroup(initialParamsGroups);
      setGroupsData(response);
    };
    getAccountingGroup();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const response = await getAllAccounts(initialParamsAccounts);
      setAccountsData(response);
    };
    getAccounts();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllSubaccounts(initialParamsSubaccounts);
      setSubaccountsData(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getAuxAccounts = async () => {
      const response = await getAllAuxAccounts(auxParams);
      setAuxiliaryAccountsData(response);
    };
    getAuxAccounts();
  }, [auxParams]);

  if (!(groupsData && accountsData && subaccountsData && auxiliaryAccountsData))
    return <LayoutSplashScreen />;

  const auxiliariesAccounts = auxiliaryAccountsData.auxiliariesAccounts
    ? auxiliaryAccountsData.auxiliariesAccounts
    : [];
  const { subAccounts } = subaccountsData;
  const { accounts } = accountsData;
  const { accountingGroups } = groupsData;

  const auxAccountsFormatted = (auxAccounts) => {
    if (auxAccounts.length === 0) return [];

    const formatted = auxAccounts.map((a) => {
      const accountId = subAccounts.find((sa) => sa.id == a.idSubAccount)
        .account;

      const groupId = accounts.find((acc) => acc.id == accountId)?.group;

      const group = accountingGroups.find((ag) => ag.id == groupId);

      const entityId = group?.entity;
      const entity = entities.find((e) => e.id == entityId)?.entity;

      const currencyId = group?.currency;
      const currencyName = currencies.find((e) => e.id == currencyId)?.currency;

      return {
        ...a,
        entity,
        currencyName,
      };
    });
    return formatted;
  };

  const data = auxAccountsFormatted(auxiliariesAccounts);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Cuentas Auxiliares
        </h1>
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-light btn-icon mr-2 ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
            title="Vista listado"
          >
            <List />
          </button>
          <button
            className={`btn btn-light btn-icon ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
            title="Vista cards"
          >
            <GridOn />
          </button>
        </div>
      </div>
      <ModernListingFilter
        disabled={data.length === 0}
        subAccounts={subAccounts}
        data={auxiliariesAccounts}
        setAuxParams={setAuxParams}
        auxParams={auxParams}
      />
      {viewMode === "list" ? (
        <ModernListingTable auxiliaryAccountsData={data} />
      ) : (
        <ModernListingTableCards auxiliaryAccountsData={data} />
      )}
    </div>
  );
}

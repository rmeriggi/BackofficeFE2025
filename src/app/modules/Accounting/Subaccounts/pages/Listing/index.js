/* eslint-disable eqeqeq */
import { GridOn, List } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../../_metronic/layout";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import {
  initialParamsAccounts,
  initialParamsGroups,
  initialParamsSubaccounts,
} from "../../../initialParams";
import { getAllSubaccounts } from "../../utils/service";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";
import ModernListingTableCards from "./ModernListingTableCards";

export default function Listing() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Subcuentas");

  const [groupsData, setGroupsData] = useState();
  const [accountsData, setAccountsData] = useState();
  const [subaccountsData, setSubaccountsData] = useState();
  const [subaccountsParams, setSubaccountsParams] = useState(
    initialParamsSubaccounts
  );
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
      const response = await getAllSubaccounts(subaccountsParams);
      setSubaccountsData(response);
    };
    getData();
  }, [subaccountsParams]);

  if (!(groupsData && accountsData && subaccountsData))
    return <LayoutSplashScreen />;

  const { subAccounts } = subaccountsData;
  const { accounts } = accountsData;
  const { accountingGroups } = groupsData;

  const subaccountsFormatted = (subAccounts) => {
    const formatted = subAccounts.map((a) => {
      const groupId = accounts.find((acc) => acc.id == a.account)?.group;

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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Subcuentas Contables
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
        disabled={subaccountsFormatted(subAccounts).length === 0}
        data={subAccounts}
        accounts={accounts}
        accountingGroups={accountingGroups}
        subaccountsParams={subaccountsParams}
        setSubaccountsParams={setSubaccountsParams}
      />
      {viewMode === "list" ? (
        <ModernListingTable
          subaccountsData={subaccountsFormatted(subAccounts)}
        />
      ) : (
        <ModernListingTableCards
          subaccountsData={subaccountsFormatted(subAccounts)}
        />
      )}
    </div>
  );
}

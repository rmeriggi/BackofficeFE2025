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
import {
  initialParamsAccounts,
  initialParamsGroups,
} from "../../../initialParams";
import { getAllAccounts } from "../../utils/service";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";
import ModernListingTableCards from "./ModernListingTableCards";

export default function Listing() {
  const [groupsData, setGroupsData] = useState();
  const [valuesAccounts, setValuesAccounts] = useState(initialParamsAccounts);
  const [accountsData, setAccounstData] = useState();
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
    const getData = async () => {
      const response = await getAllAccounts(valuesAccounts);
      setAccounstData(response);
    };
    getData();
  }, [valuesAccounts]);

  if (!(accountsData && groupsData)) return <LayoutSplashScreen />;

  const { accounts } = accountsData;
  const { accountingGroups } = groupsData;

  const accountsFormatted = accounts.map((a) => {
    const entityId = accountingGroups?.find((ag) => ag.id == a.group)?.entity;
    const entity = entities?.find((e) => e.id == entityId)?.entity;
    const currencyId = accountingGroups?.find((ag) => ag.id == a.group)
      ?.currency;
    const currencyName = currencies?.find((c) => c.id == currencyId)?.currency;
    return {
      ...a,
      entity,
      currencyName,
    };
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Cuentas Contables
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
        disabled={accounts.length === 0}
        data={accountsFormatted}
        groups={accountingGroups}
        groupId={valuesAccounts.idGroup}
        valuesAccounts={valuesAccounts}
        setValuesAccounts={setValuesAccounts}
      />
      {viewMode === "list" ? (
        <ModernListingTable accountsData={accountsFormatted} />
      ) : (
        <ModernListingTableCards accountsData={accountsFormatted} />
      )}
    </div>
  );
}

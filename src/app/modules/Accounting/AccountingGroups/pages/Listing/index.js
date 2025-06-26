import { GridOn, List } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { initialParamsGroups } from "../../../initialParams";
import { getAllAccountingGroup } from "../../utils/service";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";
import ModernListingTableList from "./ModernListingTableList";

export default function Listing() {
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [values, setValues] = useState(initialParamsGroups);
  const [data, setData] = useState();
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const getAccountingGroup = async () => {
      const response = await getAllAccountingGroup(values);
      setData(response);
    };
    getAccountingGroup();
  }, [values]);

  if (!data) return <LayoutSplashScreen />;

  const { accountingGroups } = data;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Grupos Contables
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
        disabled={accountingGroups.length === 0}
        data={accountingGroups}
        currency={currencies}
        entities={entities}
        values={values}
        setValues={setValues}
        initialValues={initialParamsGroups}
      />
      {viewMode === "list" ? (
        <ModernListingTableList
          accountingGroupsData={accountingGroups}
          currency={currencies}
          entities={entities}
        />
      ) : (
        <ModernListingTable
          accountingGroupsData={accountingGroups}
          currency={currencies}
          entities={entities}
        />
      )}
    </div>
  );
}

import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";
import { useLoading } from "../../../../../hooks/useLoading";
import { accountingAdapter } from "../../adapter/accountingAdapter";
import { getAll } from "../../utils/service";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";

export default function Listing() {
  const { loading, enableLoading, disableLoading } = useLoading();
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [accountingsData, setAccountingData] = useState([]);
  const [values, setValues] = useState({ idEntity: 0, idCurrency: 0 });

  useEffect(() => {
    enableLoading();
    const getAccountingsPlan = async () => {
      try {
        const response = await getAll(values);
        const accountingsFormatted = accountingAdapter(response.accountingPlan);
        setAccountingData(accountingsFormatted);
        disableLoading();
      } catch (error) {
        setAccountingData([]);
        disableLoading();
      }
    };
    getAccountingsPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-8">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Plan Contable
        </h1>
      </div>
      <ModernListingFilter
        disabled={accountingsData.length === 0}
        data={accountingsData}
        currency={currencies}
        entities={entities}
        paramsValues={values}
        setValues={setValues}
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 200 }}
        >
          <CircularProgress size={32} color="secondary" />
        </div>
      ) : (
        <ModernListingTable accountingData={accountingsData} />
      )}
    </div>
  );
}

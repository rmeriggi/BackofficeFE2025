import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { getMayorVista } from "../../../../../_redux/accounting/accountingCrud";
import { initialParamsAuxAccounts } from "../../../initialParams";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress } from "@material-ui/core";

export default function Listing() {
  const { loading, enableLoading, disableLoading } = useLoading();
  const [mayorBookData, setMayorBookData] = useState([]);
  const [paramsAuxAccounts, setParamsAuxAccounts] = useState({
    ...initialParamsAuxAccounts,
    fromDate: "2023-01-01T00:00:00Z",
    toDate: "2023-12-31T23:59:59Z",
  });
  const [loadingSelect /* setLoadingSelect */] = useState(false);

  useEffect(() => {
    disableLoading();
  }, [disableLoading]);

  useEffect(() => {
    const fetchMayorBookData = async () => {
      enableLoading();
      try {
        const {
          fromDate,
          toDate,
          idEntity,
          idCurrency,
          idAuxiliary,
          country,
        } = paramsAuxAccounts;

        const response = await getMayorVista({
          idEntity,
          idCurrency,
          fromDate,
          toDate,
          idAuxiliary,
          country,
        });

        console.log("Response from getMayorVista:", response);

        setMayorBookData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching mayor book data", error);
        setMayorBookData([]);
      }
      disableLoading();
    };
    fetchMayorBookData();
  }, [paramsAuxAccounts]);

  return (
    <Card>
      <CardHeader title="Listado Mayor">
        <CardHeaderToolbar>
          <ListingFilter
            dataTable={mayorBookData}
            setMayorBookData={setMayorBookData}
            paramsAuxAccounts={paramsAuxAccounts}
            setParamsAuxAccounts={setParamsAuxAccounts}
            enableLoading={enableLoading}
            disableLoading={disableLoading}
            loadingSelect={loadingSelect}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable dataTable={mayorBookData} />
        )}
      </CardBody>
    </Card>
  );
}

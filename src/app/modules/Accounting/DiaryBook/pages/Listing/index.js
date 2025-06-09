import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { getDiaryBookVista } from "../../../AuxiliaryAccounts/utils/service";
import { initialParamsAuxAccounts } from "../../../initialParams";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress } from "@material-ui/core";

export default function Listing() {
  const { loading, enableLoading, disableLoading } = useLoading();
  const [diaryBookData, setDiaryBookData] = useState([]);
  const [paramsAuxAccounts, setParamsAuxAccounts] = useState(
    initialParamsAuxAccounts
  );
  const [loadingSelect /* setLoadingSelect */] = useState(false);

  console.log("diaryBookData", diaryBookData);

  useEffect(() => {
    disableLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDiaryBookData = async () => {
      enableLoading();
      try {
        const response = await getDiaryBookVista({
          idEntity: 456,
          idCurrency: 1,
          fromDate: "2023-01-01T00:00:00Z",
          toDate: "2023-12-31T23:59:59Z",
          idAuxiliary: 789,
          country: 1,
        });
        console.log("Response from getDiaryBookVista:", response);

        if (response && response.asientos) {
          setDiaryBookData(response.asientos);
        } else {
          console.error("Expected an array in asientos but got:", response);
        }
      } catch (error) {
        console.error("Error fetching diary book data", error);
      }
      disableLoading();
    };
    getDiaryBookData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsAuxAccounts]);

  const handleFilter = async (filterParams) => {
    enableLoading();
    try {
      const response = await getDiaryBookVista({
        ...filterParams,
        idEntity: 456,
      });
      console.log("Response from getDiaryBookVista on filter:", response);

      if (response && response.asientos) {
        setDiaryBookData(response.asientos);
      } else {
        console.error("Expected an array in asientos but got:", response);
      }
    } catch (error) {
      console.error("Error fetching diary book data", error);
    }
    disableLoading();
  };

  return (
    <Card>
      <CardHeader title="Listado">
        <CardHeaderToolbar>
          <ListingFilter
            dataTable={diaryBookData}
            setDiaryBookData={setDiaryBookData}
            paramsAuxAccounts={paramsAuxAccounts}
            setParamsAuxAccounts={setParamsAuxAccounts}
            enableLoading={enableLoading}
            disableLoading={disableLoading}
            loadingSelect={loadingSelect}
            onFilter={handleFilter}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable dataTable={diaryBookData} />
        )}
      </CardBody>
    </Card>
  );
}

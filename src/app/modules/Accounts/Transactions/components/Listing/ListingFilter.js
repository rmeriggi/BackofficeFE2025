import React, { useMemo, useState } from "react";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import DateFnsUtils from "@date-io/date-fns";
import propTypes from "prop-types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Formik } from "formik";
import { getReport } from "../../utils/service";
import { ThemeProvider } from "@material-ui/styles";
import { useAllTrx } from "../../../../../utils/apiHooks";
import { getExcel } from "../../../../../utils/exportExcel";
import {
  getTransactions,
  getTransactionsForAccusations,
} from "../../../../../utils/service";
import { getTitleToExcel } from "../../../../../utils/getTitle";
import { formatAmountReport } from "../../../../../utils/formatData";
import { setDatesValues } from "../../../../../utils/validationDates";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  colors,
  createMuiTheme,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const today = new Date();
const tomorrow = today.setDate(today.getDate() + 1);

const ListingFilter = ({ setTransactionsData, entities, currencies }) => {
  const isMounted = useIsMountedRef();
  const [transactionType] = useAllTrx(isMounted);
  const [report, setReport] = useState();
  const [reportFormated, setReportFormated] = useState();
  const [nameExcel, setNameExcel] = useState("");
  const [forAccusations, setForAccusations] = useState(true);

  useMemo(() => {
    const dataFormated = formatAmountReport(report?.trxList);
    setReportFormated(dataFormated);
  }, [report]);

  const { types } = transactionType;

  const propertiesData = {
    header: [
      "id",
      "Fecha",
      "Importe",
      "Tipo de transacción",
      "Cuenta origen",
      "CLiente origen",
      "Cuit origen",
      "Cuenta destino",
      "Cliente destino",
      "Cuit Destino",
    ],
    properties: [
      "id",
      "date",
      "amount",
      "transactionType",
      "originAccount",
      "originClient",
      "originCUIT",
      "destinyAccount",
      "destinyClient",
      "destinyCUIT",
    ],
    array: reportFormated,
  };

  const newListing = async (values, useAcussations) => {
    try {
      const fromDate = format(values.fromDate, "yyyy-MM-dd");
      const toDate = format(values.toDate, "yyyy-MM-dd");
      const type = Number(values.trxType);
      const idEntity = Number(values.idEntity);
      const idCurrency = Number(values.idCurrency);

      const dataValues = {
        fromDate,
        toDate,
        type,
        idEntity,
        idCurrency,
      };
      if (useAcussations) {
        const responseTransactions = await getTransactionsForAccusations(
          dataValues
        );
        setTransactionsData(responseTransactions);
      } else {
        const responseTransactions = await getTransactions(dataValues);
        setTransactionsData(responseTransactions);
      }

      const responseReport = await getReport(dataValues);
      setReport(responseReport);

      getTitleToExcel(types, dataValues, values, setNameExcel);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          trxType: 0,
          fromDate: new Date(),
          toDate: new Date(),
          idCurrency: "2",
          idEntity: "1",
        }}
        onSubmit={(values) => {
          console.log({ forAccusations });
          return newListing(values, forAccusations);
        }}
      >
        {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="form form-label-right d-flex align-items-end"
          >
            <div className="form group row justify-content-end">
              <div className="col-lg-2 px-1">
                <GeneralSelector
                  values={values}
                  valueName="idCurrency"
                  keyName="currency"
                  label="Moneda"
                  data={currencies}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="col-lg-2 px-1">
                <GeneralSelector
                  values={values}
                  valueName="idEntity"
                  keyName="entity"
                  label="Entidad"
                  data={entities}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="col-lg-2 px-1">
                <GeneralSelector
                  values={values}
                  valueName="trxType"
                  keyName="types"
                  label="Tipo de transacción"
                  data={types}
                  setFieldValue={setFieldValue}
                  extraMenuItem={
                    <MenuItem key={0} value={0}>
                      Todas
                    </MenuItem>
                  }
                />
              </div>
              <div className="col-lg-3 px-1">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      disableFuture
                      size="small"
                      inputVariant="outlined"
                      label="Fecha Desde"
                      format="dd/MM/yyyy"
                      value={values.fromDate}
                      cancelLabel="cancelar"
                      onChange={(date) => {
                        if (
                          date instanceof Date &&
                          !isNaN(date.valueOf()) &&
                          date <= tomorrow
                        ) {
                          setDatesValues(
                            date,
                            values.toDate,
                            setFieldValue,
                            "from"
                          );
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-lg-3 px-1">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      disableFuture
                      size="small"
                      inputVariant="outlined"
                      label="Fecha Hasta"
                      format="dd/MM/yyyy"
                      value={values.toDate}
                      cancelLabel="cancelar"
                      onChange={(date) => {
                        if (
                          date instanceof Date &&
                          !isNaN(date.valueOf()) &&
                          date <= tomorrow
                        ) {
                          setDatesValues(
                            date,
                            values.fromDate,
                            setFieldValue,
                            "to"
                          );
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="ml-4"
              size="large"
              disabled={isSubmitting}
              onSubmit={() => {
                setForAccusations(true);
                handleSubmit();
              }}
              onClick={() => {
                setForAccusations(true);
                handleSubmit();
              }}
              endIcon={
                isSubmitting && <CircularProgress size={20} color="secondary" />
              }
              style={{ whiteSpace: "nowrap" }}
            >
              A imputar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="ml-4"
              size="large"
              disabled={isSubmitting}
              onSubmit={() => {
                setForAccusations(false);
                handleSubmit();
              }}
              onClick={() => {
                setForAccusations(false);
                handleSubmit();
              }}
              endIcon={
                isSubmitting && <CircularProgress size={20} color="secondary" />
              }
            >
              Buscar
            </Button>
            {report?.trxList?.length > 0 ? (
              <div
                className="symbol-label ml-7"
                onClick={() => getExcel(propertiesData, nameExcel)}
              >
                <i
                  className="flaticon2-download icon-xl text-primary"
                  role="button"
                ></i>
              </div>
            ) : (
              <div className="symbol-label ml-7">
                <i className="flaticon2-download icon-xl text-secondary"></i>
              </div>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

ListingFilter.defaultProps = {
  disabled: false,
};

ListingFilter.propTypes = {
  disabled: propTypes.bool,
};

export default ListingFilter;

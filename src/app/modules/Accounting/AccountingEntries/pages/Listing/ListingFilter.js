/* eslint-disable eqeqeq */
import DateFnsUtils from "@date-io/date-fns";
import { Button, colors, createMuiTheme } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { es } from "date-fns/locale";
import { Formik } from "formik";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { setDatesValues } from "../../../../../utils/validationDates";
import { DownloadArchive } from "../components/DownloadArchive";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const ListingFilter = ({
  disabled,
  data,
  setValues,
  values,
  openCreateModal,
}) => {
  const [report, setReport] = useState(data);

  useEffect(() => {
    setReport(data);
  }, [data]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const handleDownloadExcel = () => {
    if (!Array.isArray(report.asientos)) {
      console.error("Error: report.asientos no es un arreglo");
      return;
    }

    const visibleData = report.asientos.map((entry) => ({
      ID: entry.id,
      Fecha: entry.date,
      Descripción: entry.data.map((d) => d.description).join(", "),
      Debe: entry.data.map((d) => d.debit).join(", "),
      Haber: entry.data.map((d) => d.credit).join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asientos Contables");
    XLSX.writeFile(workbook, "Asientos_Contables.xlsx");
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
          fromDate: values.fromDate,
          toDate: values.toDate,
        }}
        onSubmit={(values) => {
          // No necesitamos hacer nada aquí ya que los cambios se manejan en los onChange
        }}
      >
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row justify-content-center">
              <div className="col-6">
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
                          setValues({
                            ...values,
                            fromDate: date,
                            id_client: 125,
                          });
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-6">
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
                          setValues({
                            ...values,
                            toDate: date,
                            id_client: 125,
                          });
                        }
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <Button
        variant="contained"
        color="secondary"
        className="ml-4"
        size="large"
        onClick={() => openCreateModal()}
      >
        Agregar
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="ml-2"
        onClick={handleDownloadExcel}
      >
        Descargar Excel
      </Button>
      <DownloadArchive
        listing={report.asientos}
        data={values}
        name="Asientos Contables"
      />
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

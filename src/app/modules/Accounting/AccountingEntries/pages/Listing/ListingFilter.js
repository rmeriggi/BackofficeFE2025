/* eslint-disable eqeqeq */
import DateFnsUtils from "@date-io/date-fns";
import { Button, colors, createMuiTheme } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
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

    const visibleData = report.asientos.map((entry) => {
      const totalDebit = entry.data.reduce((sum, item) => sum + item.debit, 0);
      const totalCredit = entry.data.reduce(
        (sum, item) => sum + item.credit,
        0
      );

      return {
        ID: entry.id,
        Fecha: entry.date,
        Descripción: entry.data.map((d) => d.description).join(", "),
        "Total Debe": totalDebit,
        "Total Haber": totalCredit,
        Balance: totalDebit - totalCredit,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asientos Contables");
    XLSX.writeFile(workbook, "Asientos_Contables.xlsx");
  };

  const clearFilters = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    setValues({
      fromDate: yesterday,
      toDate: new Date(),
      id_client: 125,
    });
  };

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-lg-8">
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
              <div className="row">
                <div className="col-lg-5">
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
                        fullWidth
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
                <div className="col-lg-5">
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
                        fullWidth
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
      </div>
      <div className="col-lg-4">
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            color="secondary"
            className="mr-2"
            size="large"
            onClick={clearFilters}
            startIcon={<Clear />}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            size="large"
            onClick={handleDownloadExcel}
            disabled={disabled}
          >
            Exportar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => openCreateModal()}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};

ListingFilter.defaultProps = {
  disabled: false,
};

ListingFilter.propTypes = {
  disabled: propTypes.bool,
};

export default ListingFilter;

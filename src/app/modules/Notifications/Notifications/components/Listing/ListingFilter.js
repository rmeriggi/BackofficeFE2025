import React from "react";
import { Formik } from "formik";
import { MenuItem, Button, TextField } from "@material-ui/core";
import propTypes from "prop-types";
import { useListingTableContext } from "./ListingTableContext";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../hooks";
import { getStatus } from "../../../../../_redux/combos/combosActions";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import * as XLSX from "xlsx";

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams };
  const filter = {
    id: values.id,
    fromDate: values.fromDate || null,
    toDate: values.toDate || null,
  };
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ListingFilter = ({ disabled, data, setShowCreateModal }) => {
  const history = useHistory();
  const { queryParams, setQueryParams, setPageNumber } = useListingTableContext();
  const [status] = useFetchCombos("status", getStatus);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(queryParams, values);
    if (!isEqual(newQueryParams, queryParams)) {
      setPageNumber(1);
      newQueryParams.pageNumber = 1;
      setQueryParams(newQueryParams);
    }
  };

  // Función para generar y descargar el Excel
  const handleDownloadExcel = () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // Configuración del Excel
    const formattedData = data.map((item) => ({
      ID: item.id,
      Fecha: item.fecha,
      Cliente: item.cliente,
      Asunto: item.asunto,
      Alertas: item.alerta,
      Estado: item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Listado");

    // Descargar el archivo
    XLSX.writeFile(workbook, "Listado_Notificaciones.xlsx");
  };

  return (
    <>
      <Formik
        initialValues={{
          id: 0,
          fromDate: "",
          toDate: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Selector de Estado */}
              <div style={{ width: "300px" }}>
                <GeneralSelector
                  values={values}
                  valueName="id"
                  keyName="estadoNotificacion"
                  label="Estado"
                  data={status}
                  setFieldValue={setFieldValue}
                  insideOnchange={(e) => {
                    handleChange(e);
                    applyFilter(e.target.value);
                    handleSubmit();
                  }}
                  extraMenuItem={
                    <MenuItem key={0} value={0}>
                      Todos
                    </MenuItem>
                  }
                />
              </div>

              {/* Campo "Desde" */}
              <TextField
                name="fromDate"
                label="Desde"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.fromDate}
                onChange={handleChange}
                disabled={disabled}
              />

              {/* Campo "Hasta" */}
              <TextField
                name="toDate"
                label="Hasta"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={values.toDate}
                onChange={handleChange}
                disabled={disabled}
              />

              {/* Botón Aplicar */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={disabled}
              >
                Aplicar
              </Button>

              {/* Botón Crear */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() =>
                  history.push(`/compliance/inbox/notifications/new/create`)
                }
              >
                Crear
              </Button>

              {/* Botón Descargar Excel */}
              <Button
                variant="contained"
                color="default"
                size="large"
                onClick={handleDownloadExcel}
                disabled={data.length === 0}
              >
                Descargar Excel
              </Button>
            </div>
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

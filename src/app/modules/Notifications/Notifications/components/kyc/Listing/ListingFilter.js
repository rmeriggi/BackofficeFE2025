import React from "react";
import { Formik } from "formik";
import { MenuItem, Button, TextField } from "@material-ui/core";
import propTypes from "prop-types";
import { useListingTableContext } from "./ListingTableContext";
import { GeneralSelector } from "../../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../../hooks";
import { getStatus } from "../../../../../../_redux/combos/combosActions";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import * as XLSX from "xlsx";
import { makeStyles } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
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

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "15px",
    "& button": {
      minWidth: "140px",
      padding: "8px 16px",
      fontWeight: 600,
      textTransform: "none",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
    },
    "& button:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
  },
  applyButton: {
    backgroundColor: "#3498db",
    color: "white",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  },
  createButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    "&:hover": {
      backgroundColor: "#27ae60",
    },
  },
  excelButton: {
    backgroundColor: "#1d6f42",
    color: "white",
    "&:hover": {
      backgroundColor: "#165a36",
    },
    "&:disabled": {
      backgroundColor: "#95a5a6",
    },
  },
}));

const ListingFilter = ({ disabled, data, setShowCreateModal }) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    queryParams,
    setQueryParams,
    setPageNumber,
  } = useListingTableContext();
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

              <div className={classes.buttonGroup}>
                {/* Botón Aplicar */}
                <Button
                  variant="contained"
                  className={classes.applyButton}
                  type="submit"
                  disabled={disabled}
                  startIcon={<FilterListIcon />}
                >
                  Aplicar Filtros
                </Button>

                {/* Botón Crear */}
                <Button
                  variant="contained"
                  className={classes.createButton}
                  onClick={() =>
                    history.push(`/compliance/inbox/notifications/new/create`)
                  }
                  startIcon={<AddIcon />}
                >
                  Crear Nueva
                </Button>

                {/* Botón Descargar Excel */}
                <Button
                  variant="contained"
                  className={classes.excelButton}
                  onClick={handleDownloadExcel}
                  disabled={data.length === 0}
                  startIcon={<GetAppIcon />}
                >
                  Exportar a Excel
                </Button>
              </div>
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

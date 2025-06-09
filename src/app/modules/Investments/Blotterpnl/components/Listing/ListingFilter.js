import React, { useState } from "react";
import { Formik, Field /* ErrorMessage */ } from "formik";
import { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from "prop-types";
import { useListingTableContext } from "./ListingTableContext";
import { getAllPnlInstrument } from "../../../../../_redux/blotter/pnlsInstrumentActions";
import { getAllPnlSpecies } from "../../../../../_redux/blotter/pnlsSpeciesActions";
import {
  colors,
  createMuiTheme,
  /* MenuItem, */ ThemeProvider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/locale";
import { useFetchCombos } from "../../../../../hooks";
import {
  getCoins,
  getCounterparties,
} from "../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
/* import { Input } from "../../../../../../_metronic/_partials/controls";
 */ import { TextField } from "@material-ui/core";

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.instrumento = values;
  filter.especie = values;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const ListingFilter = ({ disabled, data, setShowCreateModal }) => {
  const [refresh, setRefresh] = useState(false);
  const [coins] = useFetchCombos("coins", getCoins);
  const coinFilter = coins?.filter((e) => e.id !== "3");
  const [counterparties] = useFetchCombos("counterparties", getCounterparties);
  const [from, setFrom] = useState("");
  // const [to, setTo] = useState('')
  const [money, setMoney] = useState(0);
  const [comitente /* setComitente */] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const {
    queryParamsInstrument,
    setQueryParamsInstrument,
    setPageNumber,
  } = useListingTableContext();

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(queryParamsInstrument, values);
    if (!isEqual(newQueryParams, queryParamsInstrument)) {
      setPageNumber(1);
      newQueryParams.pageNumber = 1;
      setQueryParamsInstrument(newQueryParams);
    }
  };
  const dispatch = useDispatch();

  async function newListing(values) {
    const from = values.from.toISOString().substring(0, 10) + "T00:00:00.000Z";
    const to = values.from.toISOString().substring(0, 10) + "T23:59:59.000Z";
    const idMoney = values.idMoney;
    const idComitente = values.id;
    // if(values.from > values.to){
    // }else{
    setRefresh(true);
    await dispatch(getAllPnlInstrument(false, from, to, idMoney, idComitente));
    await dispatch(getAllPnlSpecies(false, from, to, idMoney, idComitente));
    setRefresh(false);
    // }
  }

  async function refreshListing() {
    const desde = from ? from : new Date();
    // const hasta = to ? to : new Date();
    const inicial = desde.toISOString().substring(0, 10) + "T00:00:00.000Z";
    const final = desde.toISOString().substring(0, 10) + "T23:59:59.000Z";
    // if(inicial > final){
    // }else{
    setRefresh(true);
    await dispatch(
      getAllPnlInstrument(false, inicial, final, money, comitente)
    );
    await dispatch(getAllPnlSpecies(false, inicial, final, money, comitente));
    setRefresh(false);
    // }
  }

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
          from: new Date(),
          to: new Date(),
          idMoney: 1,
          id: 0,
          searchQuery: "",
        }}
        onSubmit={(values) => {
          return newListing(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Buscar"
                  disabled={disabled}
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    applyFilter(e.target.value);
                  }}
                />
              </div>
              <div className="col-3">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      size="small"
                      inputVariant="outlined"
                      label="Fecha"
                      format="dd/MM/yyyy"
                      value={values.from}
                      cancelLabel="cancelar"
                      onChange={(date) => {
                        setFieldValue("from", date);
                        setFrom(date);
                        handleSubmit();
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              {/* <div className="col-2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        inputVariant="outlined"
                                        label="Hasta"
                                        format="dd/MM/yyyy"
                                        value={values.to}
                                        cancelLabel="cancelar"
                                        onChange={date => {                                            
                                            setFieldValue("to", date); 
                                            setTo(date)
                                            handleSubmit()
                                        }}
                                    />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div> */}
              <div className="col-3">
                <GeneralSelector
                  values={values}
                  valueName="idMoney"
                  keyName="money"
                  label="Valuación"
                  data={coinFilter}
                  setFieldValue={setFieldValue}
                  insideOnchange={(e) => {
                    handleChange(e);
                    setMoney(e.target.value);
                    handleSubmit();
                  }}
                  // extraMenuItem= {
                  // <MenuItem key={0} value={0}>
                  //     Todos
                  // </MenuItem>
                  // }
                />
              </div>
              <div style={{ position: "relative" }} className="col-4">
                <TextField
                  fullWidth
                  color="secondary"
                  name="searchQuery"
                  type="text"
                  size="small"
                  label={"Cliente"}
                  placeholder="Buscar..."
                  variant="outlined"
                  autoComplete="off"
                  value={values.searchQuery}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></TextField>

                {isFocused && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: 0,
                      // width: '100%',
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      border: "2px solid #bfbab9",
                      zIndex: 999,
                      maxHeight: "300px",
                      height: "min-content",
                      overflow: "auto",
                    }}
                  >
                    {counterparties
                      .filter((item) =>
                        item.Descripcion.toLowerCase().includes(
                          values.searchQuery.toLowerCase()
                        )
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFieldValue("id", item.NroComitenteESCO);
                            setFieldValue("searchQuery", item.Descripcion);
                            setIsFocused(false);
                            handleSubmit();
                          }}
                          style={{ padding: "8px", cursor: "pointer" }}
                        >
                          {item.Descripcion}
                        </div>
                      ))}
                  </div>
                )}

                <Field type="hidden" name="id" />
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div className="symbol-label ml-7" onClick={() => refreshListing()}>
        {refresh ? (
          <CircularProgress size={15} color="secondary" />
        ) : (
          <i
            className="flaticon-refresh icon-xl text-primary"
            role="button"
          ></i>
        )}
      </div>
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

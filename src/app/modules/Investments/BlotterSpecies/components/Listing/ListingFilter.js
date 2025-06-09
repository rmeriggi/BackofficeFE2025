import React, { useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from "prop-types";
import { useListingTableContext } from "./ListingTableContext";
/* import { colors, createMuiTheme } from "@material-ui/core";
import { useFetchCombos } from "../../../../../hooks";
import {
  getCoins,
  getCounterparties,
} from "../../../../../_redux/combos/combosActions"; */
import { Button } from "@material-ui/core";
import { getSpecies } from "../../../../../_redux/combos/combosActions";

const prepareFilter = (queryParams, values) => {
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.abbreviation = values;
  filter.description = values;
  newQueryParams.filter = filter;
  return newQueryParams;
};

/* const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
}); */

const ListingFilter = ({ disabled, data, setShowCreateModal }) => {
  const [refresh, setRefresh] = useState(false);
  /*   const [coins] = useFetchCombos("coins", getCoins);
  const [counterparties] = useFetchCombos("counterparties", getCounterparties);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [money, setMoney] = useState(0);
  const [comitente, setComitente] = useState(0); */

  const {
    queryParams,
    setQueryParams,
    setPageNumber,
  } = useListingTableContext();

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(queryParams, values);
    if (!isEqual(newQueryParams, queryParams)) {
      setPageNumber(1);
      newQueryParams.pageNumber = 1;
      setQueryParams(newQueryParams);
    }
  };
  const dispatch = useDispatch();

  async function newListing() {
    setRefresh(true);
    await dispatch(getSpecies());
    setRefresh(false);
  }

  async function refreshListing() {
    setRefresh(true);
    await dispatch(getSpecies());
    setRefresh(false);
  }

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
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
              <div className="col-9">
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
      <Button
        variant="contained"
        color="secondary"
        className="ml-4"
        size="large"
        onClick={() => setShowCreateModal(true)}
      >
        {"Crear"}
      </Button>
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

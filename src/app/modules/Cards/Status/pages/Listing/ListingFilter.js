/* eslint-disable eqeqeq */
import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import propTypes from "prop-types";
import { isEqual } from "lodash";
import { useListingTableContext } from "./ListingTableContext";
import { getExcel } from "../../../../../utils/exportExcel";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.status = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ListingFilter = (props) => {
  const history = useHistory();
  const [report, setReport] = useState([]);

  useMemo(() => {
    const dataFormated = props.data;
    setReport(dataFormated);
  }, [props.data]);

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

  const propertiesData = {
    header: ["ID", "Estado"],
    properties: ["id", "status"],
    array: report,
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row justify-space-around">
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "150px" }}
                  name="searchText"
                  placeholder="Buscar"
                  disabled={props.disabled}
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div className="col-auto ml-4">
        <Button /* onClick={() => history.push("/cards/status/create")} */>
          Crear estado
        </Button>
      </div>
      {props.data.length > 0 ? (
        <div
          className="symbol-label ml-4"
          onClick={() => getExcel(propertiesData, "Estados")}
        >
          <i
            className="flaticon2-download icon-xl text-primary"
            role="button"
          ></i>
        </div>
      ) : (
        <div className="symbol-label ml-4">
          <i className="flaticon2-download icon-xl text-secondary"></i>
        </div>
      )}
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

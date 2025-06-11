import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { useListingTableContext } from "./ListingTableContext";
import { isEqual } from "lodash";
import propTypes from "prop-types";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatClientReport } from "../../../../../utils/formatData";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.companyName = searchText;
  filter.distributor = searchText;
  filter.email = searchText;
  filter.movil = searchText;
  filter.address = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ListingFilter = ({ disabled, data }) => {
  const [report, setReport] = useState([]);

  useMemo(() => {
    const dataFormated = formatClientReport(data);
    setReport(dataFormated);
  }, [data]);

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
    header: [
      "Compañia",
      "Distribuidor",
      "Fecha alta",
      "Mail",
      "Dirección",
      "Teléfono",
      "País",
    ],
    properties: [
      "companyName",
      "distributor",
      "date",
      "email",
      "address",
      "movil",
      "country",
    ],
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
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "200px" }}
                  name="searchText"
                  placeholder="Buscar"
                  disabled={disabled}
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
      {data.length > 0 ? (
        <div
          className="symbol-label ml-7"
          onClick={() => getExcel(propertiesData, "Clientes")}
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

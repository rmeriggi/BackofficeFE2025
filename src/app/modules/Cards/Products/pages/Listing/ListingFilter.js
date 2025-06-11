import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { useListingTableContext } from "./ListingTableContext";
import { isEqual } from "lodash";
import propTypes from "prop-types";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatClientReport } from "../../../../../utils/formatData";
import NewCardButton from "./NewCardButton";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.product = searchText;
  filter.lastname = searchText;
  filter.brand = searchText;
  filter.passport = searchText;
  filter.email = searchText;
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
      "Producto",
      "Apellido",
      "Fecha alta",
      "Mail",
      "Pasaporte",
      "Marca",
    ],
    properties: ["product", "lastname", "date", "email", "passport", "brand"],
    array: report,
  };

  return (
    <>
      <Formik
        initialValues={{ searchText: "" }}
        onSubmit={(values) => applyFilter(values)}
      >
        {({ values, handleBlur, setFieldValue }) => (
          <form className="form form-label-right">
            <div className="form-group row align-items-center">
              {/* Campo de búsqueda */}
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Buscar"
                  disabled={disabled}
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("searchText", value);
                    applyFilter({ searchText: value });
                  }}
                />
              </div>

              {/* Botón Nueva Tarjeta */}
              <div className="col-auto ml-4">
                <NewCardButton />
              </div>

              {/* Ícono de exportar */}
              <div className="col-auto ml-4" role="button">
                {report.length > 0 ? (
                  <i
                    className="flaticon2-download icon-xl text-primary"
                    onClick={() => getExcel(propertiesData, "Clientes")}
                  />
                ) : (
                  <i className="flaticon2-download icon-xl text-secondary" />
                )}
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

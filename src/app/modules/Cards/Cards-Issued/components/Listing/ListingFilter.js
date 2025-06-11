import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { useListingTableContext } from "./ListingTableContext";
import { isEqual } from "lodash";
import propTypes from "prop-types";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatClientReport } from "../../../../../utils/formatData";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { cardIssuedLinks } from "../../utils/cardIssuedLinks";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.clientName = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ListingFilter = ({ disabled, data, setShowModal }) => {
  const [report, setReport] = useState([]);
  const history = useHistory();

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
      "ID",
      "Nombre",
      "Apellido",
      "DNI",
      "Fecha Alta",
      "Fecha Vencimiento",
      "N de Tarjeta",
    ],
    properties: [
      "id",
      "clientName",
      "clientLastname",
      "clientDni",
      "timeStamp",
      "expirationDate",
      "cardNumber",
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
      <div
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
        className="ml-4"
      >
        <Button onClick={() => history.push(`${cardIssuedLinks.create}`)}>
          Emitir tarjeta
        </Button>
        <Button onClick={() => setShowModal(true)}>Emitir todas</Button>
        <Button onClick={() => getExcel(propertiesData, "Tarjetas")}>
          Exportar
        </Button>
      </div>
      {data.length > 0 ? (
        <div
          className="symbol-label ml-4"
          onClick={() => getExcel(propertiesData, "Tarjetas")}
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

import { Button, Collapse, IconButton } from "@material-ui/core";
import {
  Add,
  Clear,
  ExpandLess,
  ExpandMore,
  FilterList,
  Search,
} from "@material-ui/icons";
import { Formik } from "formik";
import { isEqual } from "lodash";
import propTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";
import { DownloadArchive } from "../../../../../components";
import { useListingTableContext } from "./ListingTableContext";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.description = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ModernListingFilter = (props) => {
  const history = useHistory();
  const [report, setReport] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const clearFilters = (setFieldValue) => {
    setFieldValue("searchText", "");
    applyFilter({
      searchText: "",
    });
  };

  const propertiesData = {
    header: ["ID", "Módulo", "Descripción"],
    properties: ["id", "module", "description"],
  };

  return (
    <Card
      className="mb-6"
      style={{
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <CardBody className="p-6">
        <Formik
          initialValues={{
            searchText: "",
          }}
          onSubmit={(values) => {
            applyFilter(values);
          }}
        >
          {({ values, handleSubmit, handleBlur, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              {/* Header del filtro */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <FilterList style={{ color: "#3699FF", marginRight: 8 }} />
                  <h5 className="mb-0 font-weight-bold text-dark">
                    Filtros de Plantillas de Asientos
                  </h5>
                </div>
                <div className="d-flex align-items-center">
                  <IconButton
                    size="small"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    style={{ marginRight: 8 }}
                  >
                    {showAdvanced ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => clearFilters(setFieldValue)}
                    style={{ color: "#F64E60", marginRight: 16 }}
                  >
                    <Clear />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() =>
                      history.push(`/accounting/templates-entries/new`)
                    }
                    style={{
                      borderRadius: "8px",
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <Add className="mr-2" />
                    Crear Plantilla
                  </Button>
                </div>
              </div>

              {/* Filtro principal */}
              <div className="row mb-4">
                <div className="col-lg-8 col-md-12 mb-3">
                  <div className="position-relative">
                    <Search
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#6c757d",
                        zIndex: 1,
                      }}
                    />
                    <input
                      type="text"
                      className="form-control pl-5"
                      name="searchText"
                      placeholder="Buscar por módulo o descripción..."
                      disabled={props.disabled}
                      onBlur={handleBlur}
                      value={values.searchText}
                      onChange={(e) => {
                        setFieldValue("searchText", e.target.value);
                        handleSubmit();
                      }}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #e1e5e9",
                        padding: "12px 12px 12px 40px",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <Search className="mr-2" />
                    Buscar
                  </button>
                </div>
              </div>

              {/* Filtros avanzados */}
              <Collapse in={showAdvanced}>
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-info mb-0">
                      <i className="fas fa-info-circle mr-2"></i>
                      Los filtros avanzados estarán disponibles próximamente
                    </div>
                  </div>
                </div>
              </Collapse>

              {/* Información de resultados */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
                <div className="text-muted font-size-sm">
                  {props.data.length > 0 ? (
                    <span>
                      Mostrando <strong>{props.data.length}</strong> plantillas
                      de asientos
                    </span>
                  ) : (
                    <span>No se encontraron plantillas de asientos</span>
                  )}
                </div>
                <DownloadArchive
                  listing={report}
                  data={propertiesData}
                  name="Plantillas Asientos"
                />
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

ModernListingFilter.defaultProps = {
  disabled: false,
};

ModernListingFilter.propTypes = {
  disabled: propTypes.bool,
};

export default ModernListingFilter;

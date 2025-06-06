/* eslint-disable eqeqeq */
import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import propTypes from "prop-types";
import { isEqual } from "lodash";
import { useListingTableContext } from "./ListingTableContext";
import { getExcel } from "../../../../../../utils/exportExcel";
import { Button, CircularProgress } from "@material-ui/core";
import { withSnackbar } from "../../../../../../HOCs/withSnackbar";
import {
  clientAprov,
  digitalSign,
  welcomeLetter,
} from "../../../utils/service";
import { UploadModal } from "../../clients-edit/UploadModal";
import { SnackbarMessage } from "../../../../../../components";
import { useSnackBar } from "../../../../../../hooks/useSnackBar";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.description = searchText;
  filter.clientName = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

const ListingFilter = (props) => {
  const [report, setReport] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDigitalSignHappening, setIsDigitalSignHappening] = useState(false);
  const [isClientAprovHapenning, setIsClientAprovHappening] = useState(false);
  const [isWelcomeLetterHappening, setIsWelcomeLetterHappening] = useState(
    false
  );
  const { setOpenMessage, handleClose, message, open, variant } = useSnackBar();
  const [showUploadModal, setShowUploadModal] = useState(false);

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
    header: [
      "ID",
      "Descripción",
      "Documento",
      "Estado",
      "Última actualización",
      "Razón",
      "Cliente",
    ],
    properties: [
      "id",
      "description",
      "document",
      "statusDescription",
      "lastUpdate",
      "reason",
      "clientName",
    ],
    array: report,
  };

  const handleDigitalSign = async () => {
    setIsSubmitting(true);
    setIsDigitalSignHappening(true);
    const req = {
      idClient: props.idClient,
    };
    try {
      const result = await digitalSign(req);
      if (!result.success) throw new Error();
      props.setOpenMessage("success", "Solicitud procesada correctamente");
      setIsSubmitting(false);
      setIsDigitalSignHappening(false);
    } catch (error) {
      props.setOpenMessage("error", "No se puede procesar la solicitud");
      setIsSubmitting(false);
      setIsDigitalSignHappening(false);
    }
  };

  const handleWelcomeLetter = async () => {
    setIsSubmitting(true);
    setIsWelcomeLetterHappening(true);
    const req = {
      idClient: props.idClient,
    };
    try {
      const result = await welcomeLetter(req);
      if (!result.success) throw new Error();
      props.setOpenMessage("success", "Solicitud procesada correctamente");
      setIsSubmitting(false);
      setIsWelcomeLetterHappening(false);
    } catch (error) {
      props.setOpenMessage("error", "No se puede procesar la solicitud");
      setIsSubmitting(false);
      setIsWelcomeLetterHappening(false);
    }
  };
  console.log('url para:::::::::::::::::::::::::',props.urlSolicity)

  const openSolicity = () => {    
    if (props.urlSolicity.url) {
      if (props.passport[0] === "3") {
        const a = document.createElement("a");
        a.href = `${props.urlSolicity.url}pj/${props.idClient}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.click();
      } else {
        const a = document.createElement("a");
        a.href = `${props.urlSolicity.url}pf/${props.idClient}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.click();
      }
    } else {
      props.setOpenMessage("error", "No se puede procesar la solicitud");
    }
  };

  const handleClientAprov = async () => {
    setIsSubmitting(true);
    setIsClientAprovHappening(true);
    const req = {
      cuitPsp: props.idClient,
      version: 9,
      idClient: props.idClient,
    };
    try {
      await clientAprov(req);
      props.setOpenMessage("success", "Solicitud procesada correctamente");
      setIsSubmitting(false);
      setIsClientAprovHappening(false);
    } catch (error) {
      props.setOpenMessage("error", "No se puede procesar la solicitud");
      setIsSubmitting(false);
      setIsClientAprovHappening(false);
    }
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
      <div>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="small"
          disabled={isSubmitting}
          onClick={() => setShowUploadModal(true)}
        >
          Subir Documentos
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="small"
          disabled={isSubmitting}
          onClick={handleDigitalSign}
          endIcon={
            isDigitalSignHappening && (
              <CircularProgress size={20} color="secondary" />
            )
          }
        >
          Firma Digital
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="small"
          disabled={isSubmitting}
          onClick={handleWelcomeLetter}
          endIcon={
            isWelcomeLetterHappening && (
              <CircularProgress size={20} color="secondary" />
            )
          }
        >
          Carta Bienvenida
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="small"
          disabled={isSubmitting}
          onClick={openSolicity}
        >
          Solicitud apertura inversión
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="small"
          onClick={handleClientAprov}
          disabled={isSubmitting}
          endIcon={
            isClientAprovHapenning && (
              <CircularProgress size={20} color="secondary" />
            )
          }
        >
          Aprobar cliente de inversión
        </Button>
      </div>
      {props.data.length > 0 ? (
        <div
          className="symbol-label ml-7"
          onClick={() => getExcel(propertiesData, "Documentos")}
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
      <UploadModal
        show={showUploadModal}
        onHide={(result) => {
          setShowUploadModal(false);
          if (result.success) {
            setOpenMessage("success", "Documento cargado correctamente");
          } else if (result.errorCode) {
            setOpenMessage("error", "Hubo un problema al cargar el documento");
          }
        }}
        title={"Subir documentos"}
        id={props.passport}
        type="documents"
        idClient={props.idClient}
      />
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </>
  );
};

ListingFilter.defaultProps = {
  disabled: false,
};

ListingFilter.propTypes = {
  disabled: propTypes.bool,
};

export default withSnackbar(ListingFilter);

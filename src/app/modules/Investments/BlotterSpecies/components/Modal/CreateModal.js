/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field /* ErrorMessage */ } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { getSpecies } from "../../../../../_redux/combos/combosActions";
import { createSpecie } from "../../../../../_redux/blotter/blottersCrud";

const ProductEditSchema = Yup.object().shape({
  description: Yup.string().required("Este es un campo requerido"),
  abbreviation: Yup.string().required("Este es un campo requerido"),
});

export function CreateModal(props) {
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const {
    open,
    variant,
    message,
    handleClose /* setOpenMessage */,
  } = useSnackBar();

  const initialValues = {
    IDESCO: 0,
    abbreviation: "",
    codTpRisk: 0,
    description: "",
    esAcction: 0,
    esCertificateOfDeposit: 0,
    esCertificateOfPartFideicomisos: "0",
    esCheckDiferido: 0,
    esLEBAC: 0,
    esObligacionNegociable: 0,
    esOtroTituloEmitidoPorBCRA: 0,
    esParaPagares: 0,
    esTituloPublico: 0,
    risk: "0",
  };

  const handleCreate = async (values) => {
    const createValues = {
      idesco: Number(values.IDESCO),
      description: values.description,
      abbreviation: values.abbreviation,
      codtpriesgo: Number(values.codTpRisk),
      risk: values.risk,
      esaccion: Number(values.esAcction),
      depositCertificate: Number(values.esCertificateOfDeposit),
      certificatefideicomiso: values.esCertificateOfPartFideicomisos,
      checkdif: Number(values.esCheckDiferido),
      lebac: Number(values.esLEBAC),
      obliganicionesn: Number(values.esObligacionNegociable),
      titulobcra: Number(values.esOtroTituloEmitidoPorBCRA),
      pagares: Number(values.esParaPagares),
      tp: Number(values.esTituloPublico),
    };

    try {
      await createSpecie(createValues);
      setProgress(false);
      await dispatch(getSpecies());
      props.setShow(false);
    } catch {
      setProgress(false);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={"xl"}
      centered={true}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Nueva Especie
        </Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleCreate(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-product row">
                  <div className="col-lg-6">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      ABREVIATURA
                    </label>
                    <Field
                      name="abbreviation"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      DESCRIPCION
                    </label>
                    <Field
                      name="description"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer className="form">
              <div className="form-group">
                <Button
                  variant="contained"
                  color="secondary"
                  className="mr-3"
                  size="large"
                  onClick={() => props.setShow(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="mr-3"
                  size="large"
                  onClick={() => handleSubmit()}
                  disabled={progress}
                  endIcon={
                    progress && <CircularProgress size={20} color="secondary" />
                  }
                >
                  Confirmar
                </Button>
              </div>
            </Modal.Footer>
            <SnackbarMessage
              handleClose={handleClose}
              open={open}
              variant={variant}
              message={message}
            />
          </>
        )}
      </Formik>
    </Modal>
  );
}

/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field /* ErrorMessage */ } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import {
  Input,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
import { getCounterparties } from "../../../../../_redux/combos/combosActions";
import { createCounterparty } from "../../../../../_redux/blotter/blottersCrud";

const ProductEditSchema = Yup.object().shape({
  NroComitenteESCO: Yup.number().required(
    "NroComitenteESCO es un campo requerido"
  ),
  NroCtaContableESCO: Yup.number().required(
    "NroCtaContableESCO es un campo requerido"
  ),
  description: Yup.string().required("Descripción es un campo requerido"),
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
    Descripcion: "",
    NroComitenteESCO: "",
    IDComitenteESCO: 0,
    NroCtaContableESCO: 0,
    Timestamp: "",
    id: "",
    status: 1,
  };

  const handleCreate = async (values) => {
    const createValues = {
      IDComitenteESCO: Number(values.IDComitenteESCO),
      NroComitenteESCO: Number(values.NroComitenteESCO),
      NroCtaContableESCO: Number(values.NroCtaContableESCO),
      description: values.description,
      status: Number(values.status),
    };

    try {
      setProgress(true);
      await createCounterparty(createValues);
      await dispatch(getCounterparties());
      setProgress(false);
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
          Nuevo Comitente
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
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      NroComitenteESCO
                    </label>
                    <Field
                      name="NroComitenteESCO"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      NroCtaContableESCO
                    </label>
                    <Field
                      name="NroCtaContableESCO"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <div class="form-group">
                      <label className="col-lg-12 col-form-label text-lg-left">
                        STATUS
                      </label>
                      <span class="switch switch-sm">
                        <Checkbox
                          name="status"
                          isSelected={values.status}
                          onChange={(e) => {
                            setFieldValue("status", e.target.checked ? 1 : 0);
                          }}
                        ></Checkbox>
                      </span>
                    </div>
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

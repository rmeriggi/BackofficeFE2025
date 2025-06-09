/* eslint-disable eqeqeq */
import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { Modal } from "react-bootstrap";
import { Form, Formik, Field /* ErrorMessage */ } from "formik";
import { Input } from "../../../../../../_metronic/_partials/controls";

export const DebitModal = ({ showDebit, onHide, loading, sendFunction }) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const currentMonthYear = `${year}-${month}`;

  return (
    <Modal
      show={showDebit}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
      style={{
        paddingTop: "300px",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          AFIP_F778ExentoV2
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        <Formik
          initialValues={{ fecha: currentMonthYear, number: 0, import: 0 }}
          onSubmit={(values) => {
            let partes = values.fecha.split("-");
            let año = parseInt(partes[0]);
            let mes = parseInt(partes[1]);
            const data = {
              year: año,
              month: mes,
            };
            sendFunction(data);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <div>
                <div className="form-group row">
                  <p
                    className="col-lg-12 text-muted"
                    style={{ paddingTop: "20px", fontSize: "16px" }}
                  >
                    {" "}
                    <span style={{ color: "#303f9f" }}> Mes/Año:</span>{" "}
                  </p>
                  <div
                    className="col-lg-6 text-dark"
                    style={{ paddingTop: "20px", fontSize: "16px" }}
                  >
                    <Field
                      type="month"
                      class="form-control"
                      name="fecha"
                      placeholder=""
                      component={Input}
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ float: "right", marginTop: "20px" }}
                className="col-lg-2"
                onClick={() => handleSubmit()}
                endIcon={
                  loading && <CircularProgress size={20} color="primary" />
                }
              >
                Confirmar
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="large"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
                className="col-lg-2"
                onClick={onHide}
              >
                Volver
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

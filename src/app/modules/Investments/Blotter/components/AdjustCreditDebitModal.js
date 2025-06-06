import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { adjustAccountCredit, adjustAccountDebit } from "../utils/service";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";

const validationSchema = Yup.object().shape({
    amount: Yup.number()
    .required("La cantidad es necesaria"),
  });
  
  const initialValues = {
    amount: 0
  }

export function AdjustCreditDebitModal({ type, show, onHide, setOpenSnackbar, setVariant, setMessage }) {

  const {id} = useParams()

  const adjustCreditDebit = async (amount) => {
    try {
        if (type === "credit") {
            await adjustAccountCredit(id, amount);
        } else {
            await adjustAccountDebit(id, amount);
        }
      setVariant('success')
      setMessage('El ajuste se realizo correctamente correctamente.')
      setOpenSnackbar(true)
      onHide()
    } catch {
      setVariant('error')
      setMessage('El ajuste no se pudo realizar correctamente. Por favor, volvé a intentar.')
      setOpenSnackbar(true)
      onHide()
    }
  }

  const title = type === 'credit' ? 'Ajustar el credito de la cuenta' : 'Ajustar el debito de la cuenta';

  return (
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              adjustCreditDebit(values.amount);
            }}
        >
            {({ values }) => (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
            >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                    <div className="form-group row">
                        <div className="col-lg-4">
                            <Field
                                name="amount"
                                component={Input}
                                placeholder="Cantidad a ajustar"
                                label="Cantidad a ajustar"
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
                    size="large"
                    onClick={() => adjustCreditDebit(values.amount)}
                    style={{marginRight: 10}}
                >
                    Ajustar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onHide}
                >
                    Volver
                </Button>
                </div>
            </Modal.Footer>
            </Modal>)}
        </Formik>
    
  );
}

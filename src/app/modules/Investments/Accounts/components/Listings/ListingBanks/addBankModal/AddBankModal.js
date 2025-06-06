import React from "react";
import {Form, Formik } from "formik";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { Select } from "../../../../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";

const accountMock = {
    accounts: [
        {
            accountName: "Cuenta 1",
            bank: "Banco 1",
            type: "Tipo 1",
            currency: "Moneda 1",
        },
        {
            accountName: "Cuenta 2",
            bank: "Banco 2",
            type: "Tipo 2",
            currency: "Moneda 2",
        }
    ]
}

export function AddBankModal({ show, onHide, setOpenMessage}) {

  const history = useHistory()
 
  const saveAccess = async(values) => {
    try {
        setOpenMessage('success', 'La cuenta fue agregada correctamente.')
        setTimeout(()=>{
          history.push('/investments/accounts')  
        }, 4000)
      } catch  {
        setOpenMessage('error', 'La cuenta no pudo ser agregada correctamente. Por favor, volvé a intentar.')
      }
  }
  const { accounts } = accountMock
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Agregar nueva cuenta
        </Modal.Title>
      </Modal.Header>
      
        <Formik
        enableReinitialize={false}
        initialValues={{
          idBank:"1",
        }}
        onSubmit={(values) => {
          saveAccess(values);
        }}
      >
        {({ handleSubmit,setFieldValue ,values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
            {!accountMock ? (
                <>
                {/*begin::Loading*/}
                  <div className="overlay-layer">
                    <div className="spinner spinner-lg spinner-primary" />
                  </div> 
                {/*end::Loading*/}
              </>)
              : (
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-12">
                    <Select 
                      name="idBank" 
                      label="Cuenta" 
                      value={values.idBank}
                      onChange={(e) => setFieldValue("idBank", e.target.value)}
                    >
                      {accounts.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.accountName}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Form>
              )}
              </Modal.Body>
              <Modal.Footer className="form">
                <div className="form-group">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={onHide}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting && <CircularProgress size={20} color="secondary"/>  
                    }
                  >
                    Agregar
                  </Button>
                </div>
              </Modal.Footer>
          </>
        )}
      </Formik>  
    </Modal>
  );
}


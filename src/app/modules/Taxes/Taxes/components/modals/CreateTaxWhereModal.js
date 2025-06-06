import { Button, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Select } from '../../../../../../_metronic/_partials/controls';
import { SnackbarMessage } from '../../../../../components/SnackbarMessage';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { useAllTrx } from '../../../../../utils/apiHooks';
import { newTaxWhere } from '../../utils/service';

export default function CreateTaxWhereModal({show, onHide}) {

  const { id } = useParams()
  const isMounted = useIsMountedRef()
  const [transactionType, transactionTypeCompleted] = useAllTrx(isMounted)
  const [openSnackbar, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("Tax where fue creada correctamente.")

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const saveTaxWhere = async(values) => {
    try {
      newTaxWhere(id, values)
      setVariant('success')
      setMessage('Tax where fue creada correctamente.')
      setOpen(true)
      setTimeout(() => {
        onHide()
      }, 1000);
    } catch {
      setVariant('error')
      setMessage('Tax where no pudo ser creada correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Crear Nuevo Valor
        </Modal.Title>
      </Modal.Header>

        <Formik
        enableReinitialize={false}
        initialValues={{
          idtrxtype: "1",
        }}
        onSubmit={(values) => {
          saveTaxWhere(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {/*begin::Loading*/}
                {!transactionTypeCompleted && (
                  <div className="overlay-layer">
                    <div className="spinner spinner-lg spinner-primary" />
                  </div>
                )}
              {/*end::Loading*/}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-8 mx-auto">
                    <Select
                      name="idtrxtype"
                      label="Tipo de Movimiento"
                      value={values.idtrxtype}
                      onChange={(e) => setFieldValue("idtrxtype", e.target.value)}
                    >
                      {transactionType.types.map((trxType) => (
                        <option key={trxType.id} value={trxType.id}>
                          {trxType.types}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Form>
              </Modal.Body>
              <Modal.Footer className="form">
                <div className="form-group">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={onHide}
                    >
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    className="ml-4"
                    color="secondary"
                    size="large"
                    onClick={() => handleSubmit()}
                    endIcon={
                      isSubmitting && <CircularProgress size={20} color="secondary"/>  
                      }
                    >
                    Crear
                  </Button>
                </div>
              </Modal.Footer>
          </>
        )}
      </Formik>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </Modal>
  )
}

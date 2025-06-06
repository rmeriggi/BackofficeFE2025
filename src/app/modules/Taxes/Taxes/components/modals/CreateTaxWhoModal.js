import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { useParams } from "react-router"
import { Modal } from 'react-bootstrap';
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { useTaxWhoClient } from '../../utils/apiHooks';
import { Autocomplete } from '@material-ui/lab';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { newTaxWho } from '../../utils/service';
import { SnackbarMessage } from '../../../../../components/SnackbarMessage';

export default function CreateTaxWhoModal({show, onHide}) {

  const { id } = useParams()
  const isMounted = useIsMountedRef()
  const [taxClient, taxClientCompleted] = useTaxWhoClient(isMounted)
  const [openSnackbar, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("Tax who fue creada correctamente.")
  
  const { clients } = taxClient ? taxClient : [];

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const saveTaxWhere = async(values) => {
    try {
      await newTaxWho(id, values)
      setVariant('success')
      setMessage('Tax who fue creada correctamente.')
      setOpen(true)
      setTimeout(() => {
        onHide()
      }, 1000);
    } catch {
      setVariant('error')
      setMessage('Tax who no pudo ser creada correctamente. Por favor, volvé a intentar.')
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
          idtaxclient: "1",
        }}
        onSubmit={(values) => {
          saveTaxWhere(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
                {!taxClientCompleted ? (
                  <>
                  {/*begin::Loading*/}
                  <div className="overlay-layer">
                    <div className="spinner spinner-lg spinner-primary" />
                  </div>
                   {/*end::Loading*/}
                   </>
                ):(
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-8 mx-auto">
                      <Autocomplete
                        style={{marginTop: "25px"}}
                        disablePortal
                        size="small"
                        name="idtaxclient"
                        options={clients}
                        getOptionLabel={option => option.name.trim()}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onChange={(e,newValue) => {
                          setFieldValue("idtaxclient", newValue !== null ?  newValue.id : "")
                        }}
                        renderInput={(params) =>                  
                          <TextField {...params}
                            variant="outlined"
                            label="Tax Client"
                          />
                        }
                      />
                    </div>
                  </div>
                </Form>
                )}           
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

import React, { useState } from "react";
import { es } from "date-fns/locale";
import { Modal } from "react-bootstrap";
import DateFnsUtils from '@date-io/date-fns'
import { Field, Form, Formik } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { newException } from "../../utils/service";
import { ThemeProvider } from "@material-ui/styles";
import { useExceptionClients } from "../../utils/apiHooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { Button, CircularProgress, colors } from "@material-ui/core";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, FormControlLabel, Switch, TextField } from "@material-ui/core";


const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

export function CreateExceptionModal({ show, onHide, idTax }) {

  const isMounted = useIsMountedRef()
  const [exceptionClients, exceptionClientsCompleted]  = useExceptionClients(isMounted)
  const { clients } = exceptionClients ? exceptionClients : ""
  const [openSnackbar, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("La excepción fue creada correctamente.")

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const createException = async(values) => {
    const exception = values
    try {
      if(typeof values.expiration !== "string"){
        exception.expiration = values.expiration.toISOString()
      }
      await newException(idTax, values)
      setVariant('success')
      setMessage('La excepción fue creada correctamente.')
      setOpen(true)
      setTimeout(() => {
        onHide()
      }, 1000);
    } catch {
      setVariant('error')
      setMessage('La excepción no pudo ser creada correctamente. Por favor, volvé a intentar.')
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
          Crear Nueva Excepción
        </Modal.Title>
      </Modal.Header>

        <Formik
        enableReinitialize={false}
        initialValues={{
          idclient: "",
          exception: "",
          urlDocument: "http:",
          active:"true",
          expiration: new Date(),
        }}
        onSubmit={(values) => {
          return createException(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {!exceptionClientsCompleted ? (
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
                  <div className="col-lg-6">
                    <Autocomplete
                      style={{marginTop: "25px"}}
                      disablePortal
                      size="small"
                      name="idClient"
                      options={clients}
                      getOptionLabel={option => option.idtaxclient.trim()}
                      getOptionSelected={(option, value) => option.id === value.id}
                      onChange={(e,newValue) => {
                        setFieldValue("idclient", newValue !== null ?  newValue.id : "")
                      }}
                      renderInput={(params) =>
                        <TextField {...params}
                          variant="outlined"
                          label="Cliente"
                        />
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="exception"
                      component={Input}
                      placeholder="Excepción"
                      label="Excepción"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <FormControlLabel
                      className="mt-5"
                      control={<Switch
                        checked={values.active === "false" ? false: true }
                        onChange={(e) => setFieldValue("status", e.target.checked === false? "false": "true")}
                        name="status"
                      />}
                      label="Status"
                      labelPlacement="start"
                    />
                  </div>
                  <div className="col-lg-6">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                      <ThemeProvider theme={defaultMaterialTheme}>
                        <KeyboardDatePicker
                          autoOk
                          size="small"
                          inputVariant="outlined"
                          label="Expiración"
                          format="dd/MM/yyyy"
                          value={values.expiration}
                          cancelLabel="cancelar"
                          onChange={date => setFieldValue("expiration",date)}
                          className="mt-8"
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="urlDocument"
                      component={Input}
                      placeholder="Subir archivo"
                      label="Subir archivo"
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
  );
}


/* eslint-disable eqeqeq */
import React from "react";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Select } from "../../../../../_metronic/_partials/controls";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { editStatus } from "../utils/service";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useDocumentsStatus } from "../utils/apihook";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";

export function StatusModal(props) {

    const isMounted = useIsMountedRef()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
    const [documentsStatus, documentsStatusCompletes] = useDocumentsStatus(isMounted)

    if(!(documentsStatusCompletes)) return <LayoutSplashScreen />

    const initialValues = {
        status: props.idStatus,
    }

    const handleEditStatus = async (values) => {
        try {
            await editStatus(props.id, values)
            setOpenMessage('success', 'El estado del documento fue actualizado correctamente.')
            setTimeout(()=>{
                props.onHide()
            }, 4000)
        } catch (error) {
            setOpenMessage('error', 'El estado del documento no pudo ser actualizado correctamente. Por favor, intenta nuevamente')
        }
    }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={'m'}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cambiar Estado 
        </Modal.Title>
      </Modal.Header>
        <Formik
            enableReinitialize={false}
            initialValues={initialValues}
            onSubmit={(values) => {
                return handleEditStatus(values);
            }}
        >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                    <div className="form-group row">
                        <div className="col-12">
                            <Select
                                name="status"
                                label="Estado"
                                value={values.status}
                                onChange={(e)=>{
                                    handleChange(e);
                                    setFieldValue('status', e.target.value)
                                }}
                            >
                                {documentsStatus.status.map((e)=>(
                                    <option key={e.id} value={e.id}>
                                        {e.status.trim()}
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
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={props.onHide}
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
                    Cambiar Estado
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


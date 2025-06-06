import React from "react";
import {Form, Formik, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import {createAccess} from "../../utils/service"
import { useModules } from "../../utils/apiHooks";
import useIsMountedRef  from "../../../../../hooks/useIsMountedRef"
import GeneralSelectorSearch from "../../../../../components/Fields/GeneralSelectorSearch";

export function CreateAccessModal({ show, onHide, idUser, setOpen, setVariant, setMessage}) {

  const isMounted = useIsMountedRef()
  const [allModules, allModulesCompleted] = useModules(isMounted)
 
  const saveAccess = async(values) => {
    const permission = values
    try {
      await createAccess(idUser, permission)
      setVariant('success')
      setMessage('Permiso creado correctamente.')
      setTimeout(() => {
        onHide()
      }, 1000);   
      setOpen(true)
    } catch  {
      setVariant('error')
      setMessage('El permiso no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }
  const { modules } = allModules
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Crear Nuevo Permiso
        </Modal.Title>
      </Modal.Header>
      
        <Formik
        enableReinitialize={false}
        initialValues={{
          idModule:"1",
        }}
        onSubmit={(values) => {
          saveAccess(values);
        }}
      >
        {({ handleSubmit,setFieldValue ,values, isSubmitting, errors }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
            {!allModulesCompleted ? (
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
                  <div style={{ position: 'relative' }} className="col-lg-12">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">MODULO</label>                    
                    <GeneralSelectorSearch  
                        values={values}
                        valueName='idModule'
                        keyName='module'
                        error={errors['idModule']}
                        label=""
                        data={modules}
                        setField={setFieldValue}
                    />
                     <ErrorMessage name="idModule">{error => <p className="text-danger text-xs">{error}</p>}</ErrorMessage>
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
                    Crear
                  </Button>
                </div>
              </Modal.Footer>
          </>
        )}
      </Formik>  
    </Modal>
  );
}


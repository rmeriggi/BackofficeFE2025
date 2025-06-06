import React from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import { createProgram } from "../../../../utils/service";
import { useComboPrograms } from "../../../../utils/apiHook"
import { Select } from "../../../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../../../hooks/useIsMountedRef";

export function CreateProgramModal({ show, onHide, setOpen, setVariant, setMessage}) {
  const { id } = useParams()
  const isMounted = useIsMountedRef()
  const [comboPrograms, comboProgramsCompleted] = useComboPrograms(isMounted)

  if(!comboProgramsCompleted){
    return null
  }

  const newProgram = async(values) => {
    const program = values
    try {
      await createProgram(id, program);
      setVariant('success')
      setMessage('El programa fue creado correctamente.')
      setTimeout(() => {
        onHide()
      }, 1000);   
      setOpen(true)
    } catch  {
      setVariant('error')
      setMessage('El programa no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  const createProgramSchema = Yup.object().shape({
    idProgram : Yup.string()
      .required("Usuario es requerido"),
  });

  const { programs } = comboPrograms

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Crear Scoring
        </Modal.Title>
      </Modal.Header>
      
        <Formik
        enableReinitialize={false}
        initialValues={{
          idProgram: programs?.[0].id || "",
        }}
        validationSchema={createProgramSchema}
        onSubmit={(values) => {
          return newProgram(values);
        }}
      >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-12">
                    <Select
                      name="idProgram"
                      label="Programa"
                      value={values.idProgram}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('idProgram', e.target.value)
                      }}
                    >
                      {programs.map((e)=>(
                          <option key={e.id} value={e.id}>
                            {e.program}
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


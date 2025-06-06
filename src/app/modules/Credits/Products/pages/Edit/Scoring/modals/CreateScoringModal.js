import React from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { createScoring } from "../../../../utils/service";
import { Input, Select } from "../../../../../../../../_metronic/_partials/controls";
import { useEditContext } from "../../Context/EditContext";

export function CreateScoringModal({ show, onHide, setOpen, setVariant, setMessage}) {

  const {scoreSourceData, scoreParamsData } = useEditContext()
  const {scoreSource} = scoreSourceData
  const {scoreParams} = scoreParamsData
  const {id} = useParams()

  const newScoring = async(values) => {
    const scoring = values
    try {
      await createScoring(scoring)
      setVariant('success')
      setMessage('Segmentación fue creado correctamente.')
      setTimeout(() => {
        onHide()
      }, 1000);   
      setOpen(true)
    } catch  {
      setVariant('error')
      setMessage('Segmentación no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  const createScoringSchema = Yup.object().shape({
    idScoreSource : Yup.string()
      .required("Requerida"),
    idScoreParam: Yup.string()
      .required("Requerido"),
    minValue: Yup.number()
      .required("Requerido"),
    maxValue: Yup.number()
      .required("Requerido"),
  });

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
          idCreditProduct: id,
          idScoreSource: scoreSource[0]?.id,
          idScoreParam: scoreParams[0]?.id,
          minValue: "",
          maxValue: "",
          textValue: "",
        }}
        validationSchema={createScoringSchema}
        onSubmit={(values) => {
          return newScoring(values);
        }}
      >
        {({ handleSubmit, isSubmitting,values,handleChange,setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-12">
                    <Select
                      name="idScoreSource"
                      label="Fuente Score"
                      value={values.idScoreSource}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('idScoreSource', e.target.value)
                      }}
                      >
                      {scoreSource.map((e)=>(
                        <option key={e.id} value={e.id}>
                        {e.source}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Select
                      name="idScoreParam"
                      label="Parametros de score"
                      value={values.idScoreParam}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('idScoreParam', e.target.value)
                      }}
                      >
                      {scoreParams.map((e)=>(
                        <option key={e.id} value={e.id}>
                        {e.scoreParam}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Field
                      type="number"
                      name="minValue"
                      component={Input}
                      placeholder="Mínimo"
                      label="Mínimo"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Field
                      type="number"
                      name="maxValue"
                      component={Input}
                      placeholder="Máximo"
                      label="Máximo"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <Field
                      name="textValue"
                      component={Input}
                      placeholder="Otros parámetros"
                      label="Otros parámetros"
                    />
                  </div>
                </div>
              </Form>
              </Modal.Body>
              <Modal.Footer className="form">
                <div className="form-group">
                  <Button
                    variant="outlined"
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


import React, { useRef } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Input, Select } from "../../../../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { useContactsTypes } from "../../../../../../Collections/utils/apiHook";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";

const NewContactSchema = Yup.object().shape({
  contactType: Yup.string()
    .required("Tipo de contacto es requerido"),
    description: Yup.string()
    .required("Descripción es requerido"),
});

export function NewContactModal({ show, onHide, idPayment }) {

  const isMounted = useIsMountedRef()
  const [contactTypes, contactTypesCompleted] = useContactsTypes(isMounted)

  const btnRef = useRef();

  const saveNewContact = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  if(!contactTypesCompleted) return <LayoutSplashScreen />

  const {contactsTypes} = contactTypes
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Link de pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {!contactTypesCompleted ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
          <Formik
          initialValues={{
            contactType: contactsTypes[0]?.id,
            description: "",
          }}
          validationSchema={NewContactSchema}
          onSubmit={(values) => {
             
          }}
          >
          {({ handleSubmit,values, setFieldValue, handleChange }) => (
            <>
              <Form className="form form-label-right">   
                <div className="form-group row">
                  <div className="col">
                  <Select
                    name="contactType"
                    label="Tipo de contacto"
                    value={values.contactType}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('contactType', e.target.value)
                    }}
                    >
                    {contactsTypes.map((e)=>(
                      <option key={e.id} value={e.id}>
                      {e.contactType}
                      </option>
                    ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <Field
                      name="description"
                      component={Input}
                      placeholder="Descripción"
                      label="Descripción"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ display: "none" }}
                  ref={btnRef}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
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
            className="ml-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={saveNewContact}
          >
            Guardar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

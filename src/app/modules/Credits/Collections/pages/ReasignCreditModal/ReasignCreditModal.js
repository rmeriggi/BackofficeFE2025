import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Select } from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useCallAPI } from "../../../../../hooks";
import { getAllUsers } from "../../../../../utils/service";

const initialValues = {
  creditId: '1',
  fromManager: "1",
  toManager: "1",
}

const NewContactSchema = Yup.object().shape({
  fromManager: Yup.string()
    .required("Desde gestor es requerido"),
  toManager: Yup.string()
  .required("A gestor es requerido"),
});

export function ReasignCreditModal({ show, onHide }) {

  const isMounted = useIsMountedRef();

  const [managers, setManagers] = useState(isMounted);

  useCallAPI(getAllUsers, setManagers)

  const btnRef = useRef();

  const saveNewContact = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  if (!managers) {
    return <LayoutSplashScreen />;
  }
  
  const {users} = managers

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Reasignación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {!managers ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
          <Formik
          initialValues={initialValues}
          validationSchema={NewContactSchema}
          onSubmit={(values) => {
          }}
          >
          {({ handleSubmit,values, setFieldValue, handleChange }) => (
            <>
              <Form className="form form-label-right">   
                <div className="form-group row">
                  <div className="col-6">
                    <Select
                      name="fromManager"
                      label="Desde gestor"
                      value={values.fromManager}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('fromManager', e.target.value)
                      }}
                      >
                      {users.map((e)=>(
                        <option key={e.id} value={e.id}>
                          {e.user}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-6">
                    <Select
                      name="toManager"
                      label="A gestor"
                      value={values.toManager}
                      onChange={(e)=>{
                        handleChange(e);
                        setFieldValue('toManager', e.target.value)
                      }}
                      >
                      {users.map((e)=>(
                        <option key={e.id} value={e.id}>
                          {e.user}
                        </option>
                      ))}
                    </Select>
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
            Reasignar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

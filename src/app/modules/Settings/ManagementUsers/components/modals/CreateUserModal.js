/* eslint-disable eqeqeq */
import React, { useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { createOneUser } from "../../utils/service";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { getAllClients } from "../../../../Clients/Clients/utils/service";

export function CreateUserModal({ show, onHide, setOpen, setVariant, setMessage}) {

  const [clientsInfo, setClientesInfo] = useState([])
  
  const searchClients = async(search) => {
    const clientsData = await getAllClients(search)
    setClientesInfo(clientsData.clientsList)
  }

  const createUser = async(values) => {
    const user = values
    try {
      await createOneUser(user);
      setVariant('success')
      setMessage('El usuario fue creado correctamente.')
      setTimeout(() => {
        onHide()
      }, 1000);   
      setOpen(true)
    } catch  {
      setVariant('error')
      setMessage('El usuario no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  const userSchema = Yup.object().shape({
    password : Yup.string()
      .required("Contraseña es requerida")
      .min(8, "8 carácteres mínimo"),
    passwordConfirm: Yup.string()
      .required("Confirmar contraseña es requerido")
      .oneOf([Yup.ref("password"), null], "Ambas contraseñas deben coincidir"),
    email: Yup.string()
      .required("Email es requerido")
      .email("Email incorrecto"),
    name: Yup.string()
      .required("Nombre requerido"),
    user: Yup.string()
      .required("Usuario es requerido"),
    enabled:  Yup.string()
      .required("Habilitado es requerido")
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Crear Nuevo Usuario
        </Modal.Title>
      </Modal.Header>
      
        <Formik
        enableReinitialize={false}
        initialValues={{
          idclient: '',
          user:"",
          password:"",
          passwordConfirm: "",
          email: "",
          name: "",
          enabled: "0"
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          return createUser(values);
        }}
      >
        {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="mb-2 row">
                  <div className="col-lg-6">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Nombre y Apellido"
                      label="Nombre y Apellido "
                    />
                  </div>
                  <div className="col-lg-6">
                    <Autocomplete
                      id="combo-box-demo"
                      options={clientsInfo}
                      name="idclient"
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) => option.id === value.id}
                      className={'pt-5'}
                      onChange={(e,newValue) => {
                        if(newValue?.id) setFieldValue("idclient", (newValue.id))
                      }}
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Cliente" 
                          onChange={(e) => {
                            if(e.target.value.length === 3){
                              searchClients(e.target.value)
                            }
                          }}
                        />}
                    />
                  </div>
                </div>
                <div className="mb-2 row">
                  <div className="col-lg-6">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="user"
                      component={Input}
                      placeholder="User"
                      label="User"
                    />
                  </div>
                </div>
                <div className="mb-2 row">
                  <div className="col-lg-6">
                    <Field
                      name="password"
                      component={Input}
                      placeholder="Contraseña"
                      label="Contraseña"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="passwordConfirm"
                      component={Input}
                      placeholder="Confirmar contraseña"
                      label="Confirmar contraseña"
                    />
                  </div>
                </div>
              </Form>
              </Modal.Body>
              <Modal.Footer className="form">
                <div className="mb-2">
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
                    type="submit"
                    onClick={handleSubmit}
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


/* eslint-disable eqeqeq */
import React from "react";
import { Modal } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContactsTypes } from "../../../../../utils/apiHook";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { Select } from "../../../../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import { useSelector } from "react-redux";
import { postNewContact } from "../../../../../utils/service";
import { useSnackBar } from "../../../../../../../../hooks/useSnackBar"
import { SnackbarMessage } from "../../../../../../../../components/SnackbarMessage";
import { useOneClient } from '../../../../../../../Clients/Clients/utils/apiHooks';
import { clientAdapter } from '../../../../../../../Clients/Clients/adapters/clientAdapter';

export function NewContactModal({ show, onHide, idClient, managmentStatus }) {

  const isMounted = useIsMountedRef()
  const [contactTypes, contactTypesCompleted] = useContactsTypes(isMounted)
  const {user} = useSelector((state)=> state.auth)
  const [clientData] = useOneClient(idClient, isMounted)  
  
  const client = clientAdapter(clientData.client);

  const clientPhone = client.client.phone

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()
  
  if(!contactTypesCompleted) return <LayoutSplashScreen />

  const {contactsTypes} = contactTypes;

  const handleNewContact = async(values) => {
    try {
      await postNewContact(values)
      setOpenMessage("success", "El contacto fue guardado correctamente.")
    } catch (error) {
      setOpenMessage("error", "El contacto no pudo ser guardado correctamente. Por favor, volvé a intentar.")
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
          Nuevo contacto
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
            contactType: contactsTypes?.[0]?.id,
            description: "",
            idClient: idClient,
            idUser: user.id,
            managementDetail: managmentStatus[0]?.id
          }}
          onSubmit={(values) => {
            handleNewContact(values);
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
                      e.target.value  == 6 && 
                         window.open(`https://wa.me/${clientPhone}?text=Hola!`, '_blank');                        
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
                  <Select
                    name="managementDetail"
                    label="Detalle de Gestión"
                    value={values.managementDetail}
                    onChange={(e)=>{
                      handleChange(e);
                      setFieldValue('managementDetail', e.target.value)
                    }}
                    >
                    {managmentStatus.map((e)=>(
                      <option key={e.id} value={e.id}>
                      {e.description}
                      </option>
                    ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <TextField
                      name="description"
                      style={{ width: "450px"}}
                      color="secondary"
                      rows={3}
                      multiline
                      variant="outlined"
                      placeholder="Descripción"
                      label="Descripción"
                      onChange={(e) => {
                        setFieldValue("description", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="form-group d-flex justify-content-end">
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
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Guardar
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
        )}
      </Modal.Body>
        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
    </Modal>
  );
}

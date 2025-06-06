/* eslint-disable eqeqeq */
import React, { useRef } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Button, FormControlLabel, InputAdornment, Switch, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Input, Select } from "../../../../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { useContactsTypes, useOneCredit, useQuotasList } from "../../../../../../Collections/utils/apiHook";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import { useSnackBar } from "../../../../../../../../hooks/useSnackBar";
import { useParams } from "react-router-dom";
import { newPaymentLink } from "../../../../../../Collections/utils/service";
import { SnackbarMessage } from "../../../../../../../../components/SnackbarMessage";

const PaymentLinktSchema = Yup.object().shape({
  contactType: Yup.string()
    .required("Tipo de contacto es requerido"),
  description: Yup.string()
    .required("Descripción es requerido"),
  amount: Yup.string()
    .required("Importe es requerido"),
  tarjet: Yup.string()
    .required("Importe es requerido"),
  account: Yup.string()
    .required("Importe es requerido"),
});


export function PaymentLinkModal({ show, onHide, idPayment, quotaNumber, idManagment}) {

  const isMounted = useIsMountedRef()
  const { id } = useParams();
  const btnRef = useRef();
  const [contactTypes, contactTypesCompleted] = useContactsTypes(isMounted)
  const [creditData, creditCompleted] = useOneCredit(isMounted, id)
  const [quotasList, quotaListCompleted] = useQuotasList(isMounted, id)
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()

  const savePaymentLink = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  if(!(contactTypesCompleted && quotaListCompleted && creditCompleted)) return <LayoutSplashScreen />

  const {contactsTypes} = contactTypes;
  const { quotas } = quotasList;
  const { credit } = creditData;

  const currentQuota = quotas.find(q => q.id == idPayment)

  const minOneChecked = (tarjet, account, reading) => {
    if(reading === 'tarjet'){
      return account? tarjet : !account
    } else{
      return tarjet? account : !tarjet
    }
  };

  const handlePaymentLink = async(values) => {
    try {
      await newPaymentLink(values)
      setOpenMessage('success', 'Link de pago generado correctamente.')
      setTimeout(()=>{
        onHide()
      }, 4000)
    } catch (error) {
      setOpenMessage('error', 'El link de pago no pude ser generado. Por favor, volvé a intentar.')
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
            idUser: idManagment,
            contactType: Number(contactsTypes[0].id),
            description: `Link de pago de la cuota ${quotaNumber} del crédito  n°${id}`,
            amount: Number(currentQuota?.pending) || 0,
            tarjet: 1,
            account: 0,
            clientId: Number(credit?.idClient),
            idCredit: Number(id),
            idQuota: Number(currentQuota?.id) || 0,
            action: 1
          }}
          validationSchema={PaymentLinktSchema}
          onSubmit={(values) => {
            handlePaymentLink(values)
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
                    <TextField
                      style={{width: '100%'}}
                      name="description"
                      id="outlined-multiline-static"
                      placeholder="Descripción"
                      label="Descripción"
                      multiline
                      rows={3}
                      value={values.description}
                      onChange={(e)=> setFieldValue('description', e.target.value)}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <Field
                      name="amount"
                      type='number'
                      value={values.amount}
                      component={Input}
                      error='El importe tiene que ser un número'
                      placeholder="Importe"
                      label="Importe"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      onChange={(e)=> setFieldValue('amount', Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-3 d-flex align-items-baseline">
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={values.tarjet} 
                          onChange={(e) => {
                            setFieldValue("tarjet", minOneChecked(e.target.checked? 1 : 0, values.account, 'tarjet'))
                          }} 
                          name="tarjet"
                        />
                      } 
                      label="Tarjeta"
                      labelPlacement="top" 
                    />
                    <div>
                    {values.tarjet == "1" ?
                        (<span>Si</span>):
                        (<span>No</span>)
                      } 
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-3 d-flex align-items-baseline">
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={values.account} 
                          onChange={(e) => setFieldValue("account", minOneChecked(values.tarjet, e.target.checked? 1 : 0))} 
                          name="account"
                        />
                      } 
                      label="Cuenta"
                      labelPlacement="top" 
                    />
                    <div>
                      {values.account == "1" ?
                        (<span>Si</span>):
                        (<span>No</span>)
                      } 
                    </div>
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
            onClick={savePaymentLink}
          >
            Generar link de pago y guardar
          </Button>
        </div>
      </Modal.Footer>
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </Modal>
  );
}

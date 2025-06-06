import React, { useState } from 'react'
import * as Yup from "yup";
import {Field, Form, Formik} from 'formik'
import { cashInDirecto, cashOutDirecto, createAdjust, seatCredit, seatDebit } from '../utils/service';
import { AlertDialog } from '../../../../components';
import { useModal } from '../../../../hooks/useModal';
import {CreditModal} from '../components/modals/CreditModal';
import {DebitModal} from '../components/modals/DebitModal';
import {CashInOutModal} from '../components/modals/CashInOutModal';
import { Button } from '@material-ui/core';
import { Input } from '../../../../../_metronic/_partials/controls'
import { SnackbarMessage } from '../../../../components/SnackbarMessage';
import { getCountries, getCurrencies } from '../../../../_redux/combos/combosActions';
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';
import { useFetchCombos } from '../../../../hooks';


const adjustSchema = Yup.object().shape({
  entities : Yup.string()
    .required("Transaccion es requerido"),
  idaccount : Yup.string()
    .required("Cuenta es requerida"),
  amount: Yup.string()
    .required("Importe es requerido"),
  collectionAccount: Yup.string()
    .required("ID Cuenta Recaudadora es requerido"),
  cbuOrigin: Yup.string()
    .required("CBU Origen es requerido"),
  cbuDestination: Yup.string()
    .required("CBU Destino es requerido"),
  cuit: Yup.number()
    .required("Cuit es requerido")
    .test('len', 'El cuit debe tener once números', val => Math.ceil(Math.log10(val + 1)) === 11)
});

export default function AdjustmentPage() {

  const [show, openModal, closeModal] = useModal()
  const [showDebit, openDebitModal, closeDebitModal] = useModal()
  const [showCashIn, openCashInModal, closeCashInModal] = useModal()
  const [showCashOut, openCashOutModal, closeCashOutModal] = useModal()
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El ajuste fue realizado correctamente.")
  const [countries] = useFetchCombos('countries', getCountries)
  const [currencies] = useFetchCombos('currencies', getCurrencies)

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const sendAjust = async(values) => {
    try {
      await createAdjust(values)
      setVariant('success')
      setMessage('El ajuste fue realizado correctamente.')
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
    } catch {
      setVariant('error')
      setMessage('El ajuste no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      setTimeout(()=>{
        setOpenSnackbar(true)
      }, 1000)
    }
  }

  const sendCreditAjust = async(values) => {
    try {
      await seatCredit(values)
      setVariant('success')
      setMessage('El ajuste fue realizado correctamente.')
      closeModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
    } catch {
      setVariant('error')
      setMessage('El ajuste de crédito no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      setOpenSnackbar(true)
      closeModal()
    }
  }

  const sendDebitAjust = async(values) => {
    try {
      await seatDebit(values)
      setVariant('success')
      setMessage('El ajuste fue realizado correctamente.')
      closeDebitModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
    } catch {
      setVariant('error')
      setMessage('El ajuste de débito no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeDebitModal()
    }
  }

  const sendCashInDirecto = async(values) => {
    try {
      await cashInDirecto(values)
      setVariant('success')
      setMessage('El cash in directo fue realizado correctamente.')
      closeCashInModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
    } catch {
      setVariant('error')
      setMessage('El cash in directo de débito no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeCashInModal()
    }
  }

  const sendCashOutDirecto = async(values) => {
    try {
      await cashOutDirecto(values)
      setVariant('success')
      setMessage('El cash out directo fue realizado correctamente.')
      closeCashOutModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
    } catch {
      setVariant('error')
      setMessage('El cash out directo de débito no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeCashOutModal()
    }
  }

  return (
    <div className="container bg-white py-5">
      <Formik
        enableReinitialize={false}
        validationSchema={adjustSchema}
        initialValues={{
          idCurrency: 2,
          idCountry:1,
          collectionAccount:"1034",
          amount: "",
          description: "",
          cbuOrigin: "",
          cbuDestination:""
        }}
          onSubmit={() => {
            handleClickOpen()
        }}
      >
        {({ handleSubmit, setFieldValue , values }) => (

          <Form className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-4 mt-8">
                <GeneralSelector 
                  values={values}
                  valueName='idCurrency'
                  keyName='currency'
                  label='Moneda'
                  data={currencies}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="col-lg-4 mt-8">
                <GeneralSelector 
                  values={values}
                  valueName='idCountry'
                  keyName='country'
                  label='País'
                  data={countries}
                  setFieldValue={setFieldValue}
                /> 
              </div>
              <div className="col-lg-4">
                <Field
                  type="number"
                  name="collectionAccount"
                  component={Input}
                  placeholder="ID Cuenta Recaudadora"
                  label="Cuenta Recaudadora"
                />
              </div>
              </div> 
              <div className="form-group row">
              <div className="col-4">
                <Field
                  type="string"
                  name="cbuOrigin"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  component={Input}
                  placeholder="CBU Origen"
                  label="CBU Origen"
                />
              </div>
              <div className="col-4">
                <Field
                  type="string"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  name="cbuDestination"
                  component={Input}
                  placeholder="CBU Destino"
                  label="CBU Destino"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  type="number"
                  name="amount"
                  component={Input}
                  placeholder="100,00"
                  label="Importe"
                />
              </div>
            </div>           
            <div className="form-group row"> 
              <div className="col-4"> 
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  style={{width:"175px"}}
                  disabled={openDialog}

                  onClick={openModal}
                  onSubmit={() => handleSubmit()}
                  
                >
                  Crédito Externo
                </Button>
              </div>
              <div className="col-8"> 
                <h6 style={{textJustify:"justify"}}>Movimiento Crédito externo. Cuando se aplicó en la cuenta HNTBank y no en Recaudadora es ajuste.
                Acredita de nuevo el movimiento que no salió</h6>
              </div>
           
              <div className="col-4" style={{paddingTop:"30px"}}> 
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                style={{width:"175px"}}
                disabled={openDialog}
                onClick={openDebitModal}
                onSubmit={() => handleSubmit()}
              >
                Débito Externo
              </Button>
              </div>

              <div className="col-8" style={{paddingTop:"30px"}}>  
              <h6 style={{textJustify:"justify"}}>Movimiento Débito externo. Cuando se aplicó en la cuenta recaudadora y no en HNTBank es reflejo de movimiento.</h6>
              </div>             

              <div className="col-4" style={{paddingTop:"30px"}}> 
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  style={{width:"175px"}}
                  disabled={openDialog}

                  onClick={openCashInModal}
                  onSubmit={() => handleSubmit()}
                  
                >
                  Cash In Directo
                </Button>
              </div>
              <div className="col-8" style={{paddingTop:"30px"}}> 
                <h6 style={{textJustify:"justify"}}>Realizar un Cash In Directo</h6>
              </div>

              <div className="col-4" style={{paddingTop:"30px"}}> 
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  style={{width:"175px"}}
                  disabled={openDialog}

                  onClick={openCashOutModal}
                  onSubmit={() => handleSubmit()}
                  
                >
                  Cash Out Directo
                </Button>
              </div>
              <div className="col-8" style={{paddingTop:"30px"}}> 
                <h6 style={{textJustify:"justify"}}>Realizar un Cash Out Directo</h6>
              </div>
            </div>
            <AlertDialog 
              open={openDialog} 
              handleClose={handleCloseDialog} 
              sendFunction={() => sendAjust(values)}
              title="¿Ajustar?"
              description="¿Estás seguro de hacer un ajuste?"
            />

            <CreditModal 
            show={show}
            onHide={closeModal}  
            values={values}
            currency={currencies}
            country={countries} 
            sendFunction={() => sendCreditAjust(values)}
            />
            <DebitModal 
              showDebit={showDebit}
              onHide={closeDebitModal}  
              values={values}
              currency={currencies}
              country={countries} 
              sendFunction={() => sendDebitAjust(values)}
            />
            <CashInOutModal 
              title="Confirmacion para Cash In Directo"
              showDebit={showCashIn}
              onHide={closeCashInModal}  
              values={values}
              currency={currencies}
              country={countries} 
              sendFunction={() => sendCashInDirecto(values)}
            />
            <CashInOutModal 
              title="Confirmacion para Cash Out Directo"
              showDebit={showCashOut}
              onHide={closeCashOutModal}  
              values={values}
              currency={currencies}
              country={countries} 
              sendFunction={() => sendCashOutDirecto(values)}
            />
          </Form>
        )}
      </Formik>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />

    </div>
  )
}

import React, { useState } from 'react'
import * as Yup from "yup";
import { Form, Formik} from 'formik'
import { seatAfip , seatExento, seatGrabado } from '../utils/service';
import { useModal } from '../../../../hooks/useModal';
import {CreditModal} from '../components/modals/CreditModal';
import {DebitModal} from '../components/modals/DebitModal';
import {CashInOutModal} from '../components/modals/CashInOutModal';
import { Button } from '@material-ui/core';
import { SnackbarMessage } from '../../../../components/SnackbarMessage';
import { getCountries, getCurrencies } from '../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../hooks';


const adjustSchema = Yup.object().shape({

});

export default function AfipPage() {

  const [show, openModal, closeModal] = useModal()
  const [showDebit, openDebitModal, closeDebitModal] = useModal()
  const [showCashIn, openCashInModal, closeCashInModal] = useModal()
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El ajuste fue realizado correctamente.")
  const [countries] = useFetchCombos('countries', getCountries)
  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [isSuccessAfip, setIsSuccessAfip] = useState(false);
  const [isSuccessExento, setIsSuccessExento] = useState(false);
  const [isSuccessGrabado, setIsSuccessGrabado] = useState(false);
  const [isLoadingAfip, setIsLoadingAfip] = useState(false);
  const [isLoadingExento, setIsLoadingExento] = useState(false);
  const [isLoadingGrabado, setIsLoadingGrabado] = useState(false);

    


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

 

  const sendAfip = async(values) => {
    setIsLoadingAfip(true)
    try {
      await seatAfip (values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeModal()      
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessAfip(true)
      setIsLoadingAfip(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      setOpenSnackbar(true)
      closeModal()
      setIsSuccessAfip(false)
      setIsLoadingAfip(false)
    }
  }

  const sendExento = async(values) => {
    setIsLoadingExento(true)
    try {
      await seatExento(values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeDebitModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessExento(true)
      setIsLoadingExento(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeDebitModal()
      setIsSuccessExento(false)
      setIsLoadingExento(false)
    }
  }

  const sendGrabado = async(values) => {
    setIsLoadingGrabado(true)
    try {
      await seatGrabado(values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeCashInModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessGrabado(true)
      setIsLoadingGrabado(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeCashInModal()
      setIsSuccessGrabado(false)
      setIsLoadingGrabado(false)
    }
  }

  

  return (
    <div className="container bg-white py-5">
       <div className="col-12 mb-10"> 
                <h2>Regimen informativo AFIP</h2>
        </div>
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

<div className="col-lg-4">
    <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessAfip ? 'border border-success' : ''}`}>
        <div className="card-header">
            <h3 className="card-title">AFIP_8126V2</h3>
        </div>
        <div className="card-body">
            AFIP_8126V2
        </div>
        <div className="card-footer">
        <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                style={{width:"175px"}}
                // disabled={openDialog}

                onClick={openModal}
                onSubmit={() => handleSubmit()}
                
              >
                PROCESAR
              </Button>
        </div>
    </div>
</div>
<div className="col-lg-4">
  <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessExento ? 'border border-success' : ''}`}>
        <div className="card-header">
            <h3 className="card-title">AFIP_F778ExentoV2 </h3>
        </div>
        <div className="card-body">
          AFIP_F778ExentoV2
        </div>
        <div className="card-footer">
        <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
              style={{width:"175px"}}
              // disabled={openDialog}
              onClick={openDebitModal}
              onSubmit={() => handleSubmit()}
            >
               PROCESAR 
            </Button>
        </div>
    </div>
</div>
<div className="col-lg-4">
  <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessGrabado ? 'border border-success' : ''}`}>
        <div className="card-header">
            <h3 className="card-title">AFIP_F776GrabadoV2</h3>
        </div>
        <div className="card-body">
          AFIP_F776GrabadoV2
        </div>
        <div className="card-footer">
        <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                style={{width:"175px"}}
                // disabled={openDialog}

                onClick={openCashInModal}
                onSubmit={() => handleSubmit()}
                
              >
                 PROCESAR
              </Button>
        </div>
    </div>
</div>             
          </div>
            <CreditModal 
            show={show}
            loading={isLoadingAfip}
            onHide={closeModal}  
            values={values}
            currency={currencies}
            country={countries} 
            sendFunction={sendAfip}
            />
            <DebitModal 
              showDebit={showDebit}
              loading={isLoadingExento}
              onHide={closeDebitModal}  
              values={values}
              currency={currencies}
              country={countries} 
              sendFunction={sendExento}
            />
            <CashInOutModal 
              title="Confirmacion para Cash In Directo"
              showDebit={showCashIn}
              loading={isLoadingGrabado}
              onHide={closeCashInModal}  
              values={values}
              currency={currencies}
              country={countries} 
              sendFunction={sendGrabado}
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

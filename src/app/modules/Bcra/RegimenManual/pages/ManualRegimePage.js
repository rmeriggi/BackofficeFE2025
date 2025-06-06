import React, { useState } from 'react'
import * as Yup from "yup";
import { Form, Formik} from 'formik'
import { seatAproceso, seatBproceso, seatArchivos, seatPadron } from '../utils/service';
import { useModal } from '../../../../hooks/useModal';
import {CreditModal} from '../components/modals/CreditModal';
import {DebitModal} from '../components/modals/DebitModal';
import {CashInOutModal} from '../components/modals/CashInOutModal';
import { Button } from '@material-ui/core';
import { SnackbarMessage } from '../../../../components/SnackbarMessage';
import { getCountries, getCurrencies } from '../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../hooks';
import { AlertDialog } from '../../../../components';

const adjustSchema = Yup.object().shape({

});

export default function ManualRegimePage() {

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
  const [isSuccessA, setIsSuccessA] = useState(false);
  const [isSuccessB, setIsSuccessB] = useState(false);
  const [isSuccessPadron, setIsSuccessPadron] = useState(false);
  const [isSuccessXML, setIsSuccessXML] = useState(false);
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [isLoadingPadron, setIsLoadingPadron] = useState(false);
  const [isLoadingXML, setIsLoadingXML] = useState(false);


  const handleClickOpen = () => {
    // setOpenDialog(true);
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

 

  const sendAproceso = async(values) => {
    setIsLoadingA(true)
    try {
      await seatAproceso (values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessA(true)
      setIsLoadingA(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      setOpenSnackbar(true)
      closeModal()
      setIsSuccessA(false)
      setIsLoadingA(false)
    }
  }

  const sendBproceso = async(values) => {
    setIsLoadingB(true)
    try {
      await seatBproceso(values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeDebitModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessB(true)
      setIsLoadingB(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeDebitModal()
      setIsSuccessB(false)
      setIsLoadingB(false)
    }
  }

  const sendArchivos = async(values) => {
    setIsLoadingXML(true)
    try {
      await seatArchivos(values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeCashInModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessXML(true)
      setIsLoadingXML(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeCashInModal()
      setIsSuccessXML(false)
      setIsLoadingXML(false)
    }
  }

  const sendPadron = async(values) => {
    setIsLoadingPadron(true)
    try {
      await seatPadron(values)
      setVariant('success')
      setMessage('El proceso fue realizado correctamente.')
      closeCashOutModal()
      setTimeout(()=>{
        handleCloseDialog()
        setOpenSnackbar(true)
      }, 1000)
      setIsSuccessPadron(true)
      setIsLoadingPadron(false)
    } catch {
      setVariant('error')
      setMessage('El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar.')
      handleCloseDialog()
      setOpenSnackbar(true)
      closeCashOutModal()
      setIsSuccessPadron(false)
      setIsLoadingPadron(false)
    }
  }

  

  return (
    <div className="container bg-white py-5">
       <div className="col-12 mb-10"> 
                <h2>Regimen informativo MANUAL</h2>
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

  <div className="col-lg-3">
    <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessA ? 'border border-success' : ''}`}>
          <div className="card-header">
              <h3 className="card-title">BCRA_A_PROCESO</h3>
          </div>
          <div className="card-body">
             BCRA_A_PROCESO
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
  <div className="col-lg-3">
    <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessB ? 'border border-success' : ''}`}>
          <div className="card-header">
              <h3 className="card-title">BCRA_B_PROCESO</h3>
          </div>
          <div className="card-body">
              BCRA_B_PROCESO
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
  <div className="col-lg-3">
    <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessPadron ? 'border border-success' : ''}`}>
          <div className="card-header">
              <h3 className="card-title">BCRA PADRON</h3>
          </div>
          <div className="card-body">
             BCRA PADRON
          </div>
          <div className="card-footer">
          <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  style={{width:"175px"}}
                  onClick={openCashOutModal}
                  onSubmit={() => handleSubmit()}
                  
                >
                   PROCESAR
                </Button>
          </div>
      </div>
  </div>  
  <div className="col-lg-3">
  <div className={`card card-custom card-stretch-50 shadow mb-5 ${isSuccessXML ? 'border border-success' : ''}`}>
          <div className="card-header">
              <h3 className="card-title">ARCHIVOSXML</h3>
          </div>
          <div className="card-body">
             ARCHIVOSXML
          </div>
          <div className="card-footer">
          <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  style={{width:"175px"}}
                  // disabled={openDialog}

                  onClick={()=>setOpenDialog(true)}
                  onSubmit={() => handleSubmit()}
                  
                >
                   PROCESAR
                </Button>
          </div>
      </div>
  </div>            
            </div>
            <AlertDialog 
              open={openDialog} 
              handleClose={handleCloseDialog} 
              sendFunction={() =>{ 
                handleCloseDialog()
                openCashInModal()
              }}
              title="¿Procesar?"
              description="Asegurate de haber corridos los procesos A Y B"
            />
            <CreditModal 
            show={show}
            loading={isLoadingA}
            onHide={closeModal}  
            // values={values}
            currency={currencies}
            country={countries} 
            sendFunction={sendAproceso}
            />
            <DebitModal 
              loading={isLoadingB}
              showDebit={showDebit}
              onHide={closeDebitModal}  
              // values={values}
              currency={currencies}
              country={countries} 
              sendFunction={sendBproceso}
            />
            <CashInOutModal 
              title="ARCHIVOSXML"
              loading={isLoadingXML}
              showDebit={showCashIn}
              onHide={closeCashInModal}  
              // values={values}
              currency={currencies}
              country={countries} 
              sendFunction={sendArchivos}
            />
            <CashInOutModal 
              title="BCRA PADRON"
              loading={isLoadingPadron}
              showDebit={showCashOut}
              onHide={closeCashOutModal}  
              // values={values}
              currency={currencies}
              country={countries} 
              sendFunction={sendPadron}
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

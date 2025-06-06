/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useRef, useState } from 'react'
import TaxW from './flaps/TaxW'
import { useHistory } from 'react-router'
import { editTax } from '../utils/service'
import { Button, CircularProgress } from '@material-ui/core'
import { useOneTax } from '../utils/apiHooks'
import TaxResumeFlap from './flaps/TaxResumeFlap'
import TaxExceptionFlap from "./flaps/TaxExceptionFlap"
import CreateTaxForm from './TaxesForm/CreateTaxForm'
import useIsMountedRef from '../../../../hooks/useIsMountedRef'
import { LayoutSplashScreen } from '../../../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'

export default function EditTax({match: {params: { id }}}) {

  const btnRef = useRef();
  const history = useHistory()
  const isMounted = useIsMountedRef()
  const [tab, setTab] = useState("general")
  const [oneTax, oneTaxCompleted] = useOneTax(isMounted,id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openSnackbar, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El impuesto fue modificado correctamente.")

  if(!oneTaxCompleted){
    return <LayoutSplashScreen />
  }
  const {tax} = oneTax
  
  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const backToTaxesList = () => {
    history.push("/taxes/taxes")
  }

  const saveTax = async(values) => {
    const tax = values
    try {
      if(typeof values.date !== "string"){
        tax.date = values.date.toISOString()
        tax.expiration = values.expiration.toISOString()
      }
      tax.idtaxvalue = 3
      await editTax(id, values)
      setIsSubmitting(false)
      setVariant('success')
      setMessage('El impuesto fue modificado correctamente.')
      setOpen(true)
      
    } catch {
      setVariant('error')
      setMessage('El impuesto no pudo ser modificado correctamente. Por favor, volvé a intentar.')
      setIsSubmitting(false)
      setOpen(true)
    }
  }

  const saveTaxClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
   }

  return (
    <Card>
      <CardHeader title="Editar impuesto">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={backToTaxesList}
            >
              Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-4"
            size="large"
            disabled={isSubmitting}
            onClick={saveTaxClick}
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary"/>  
              }
            >
              Guardar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("general")}>
            <a
              className={`nav-link ${tab === "general" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "general").toString()}
            >
              General
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("exception")}>
            <a
              className={`nav-link ${tab === "exception" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "exception").toString()}
            >
              Excepción
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("tax-w")}>
            <a
              className={`nav-link ${tab === "tax-w" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "tax-w").toString()}
            >
              Tax W
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("resume")}>
            <a
              className={`nav-link ${tab === "resume" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "resume").toString()}
            >
              Resumen
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "general" && (
            <CreateTaxForm
              edit
              btnRef={btnRef}
              saveTax={saveTax}
              initialValues={tax}
            />
          )}
          {tab === "exception" && (
            <TaxExceptionFlap
              id={id}
            />
          )}
         {tab === "tax-w" && (
            <TaxW

            />
          )}
         {tab === "resume" && (
            <TaxResumeFlap

            />
          )}
        </div>
      </ CardBody>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </Card>
  )
}

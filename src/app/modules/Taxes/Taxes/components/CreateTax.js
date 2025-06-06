/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { createNewTax } from '../utils/service'
import CreateTaxForm from "./TaxesForm/CreateTaxForm"
import { Button, CircularProgress } from '@material-ui/core'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import {Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls'

export default function CreateTax() {

  const history = useHistory()

  const [tab, setTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openSnackbar, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El impuesto fue creado correctamente.")
  const btnRef = useRef();

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const backToTaxesList = () => {
    history.push("/taxes/taxes")
  }

  const createTax = async(values) => {
    const tax = values
    try {
      setIsSubmitting(true)
      if(typeof values.date !== "string"){
        tax.date = values.date.toISOString()
        tax.expiration = values.expiration.toISOString()
      }
      const response = await createNewTax(tax)
      setIsSubmitting(false)
      setVariant('success')
      setMessage('El impuesto fue creado correctamente.')
      setOpen(true)
      const { id } = response
      setTimeout(() => {
        history.push(`/taxes/taxes/edit/${id}`)
      }, 2000);
    } catch {
      setVariant('error')
      setMessage('El impuesto no pudo ser creado correctamente. Por favor, volvé a intentar.')
      setIsSubmitting(false)
      setOpen(true)
    }
  }

  const createTaxClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  }

  const initialValues = {
    idcurrency : "1",
    idcountry : "1",
    tax : "",
    description : "",
    date : new Date(),
    expiration : new Date(),
    originDestiny : "1",
    idaccount: "",
    idTrxCollector: "1",
    idTrxDiscount: "1",
    transaction: "1",
    fix: "0",
    baseMin: "",
    baseMax: "",
    value: "",
    type: "",
    frecuency: "",
    trxType: "1",
    amountType: "0",
    calc: "",
    formula: "",
  }

  return (
    <Card>
      <CardHeader title="Nuevo impuesto">
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
            onClick={createTaxClick}
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary"/>  
              }
            >
              Crear
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
        </ul>
        <div className="mt-5">
          {tab === "general" && (
            <CreateTaxForm
              btnRef={btnRef}
              createTax={createTax}
              initialValues={initialValues}
            />
          )} 
        </div>
      </CardBody>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </Card>
  )
}

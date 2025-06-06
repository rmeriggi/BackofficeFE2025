/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls'
import { Button } from '@material-ui/core'
import {EditProgramForm} from './EditProgramForm';
import {SuscriptionFlap} from "../Flaps/Subscriptions/SubscriptionsFlap";
import { BenefitsFlap } from '../Flaps/Benefits/BenefitsFlap'

const oneProgramMock = {
    id: 1,
    program: 'Programa 1',
    description: 'Descripcion 1',
    status: 'Activo',
}

export default function EditProgram({match: {params: { id }}}) {

  const btnRef = useRef();
  const history = useHistory()
  const [tab, setTab] = useState("program")

  const tax = oneProgramMock

  const backToProgramesList = () => {
    history.push("/loyalty/programs")
  }

  const saveProgram = async(values) => {
    try {
      if(typeof values.date !== "string"){
        values.date = values.date.toISOString()
        values.expiration = values.expiration.toISOString()
      }
      values.idtaxvalue = 3
      //await editProgram(id, values)
    } catch (error) {
      console.error(error)
    }
  }

  const saveProgramClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
   }

  return (
    <Card>
      <CardHeader title="Editar programa">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToProgramesList}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-2"
            size="large"
            onClick={saveProgramClick}
          >
            Guardar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("program")}>
            <a
              className={`nav-link ${tab === "program" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "program").toString()}
            >
              Programa
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("subscriptions")}>
            <a
              className={`nav-link ${tab === "subscriptions" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "subscriptions").toString()}
            >
              Suscripciones
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("benefits")}>
            <a
              className={`nav-link ${tab === "benefits" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "benefits").toString()}
            >
              Beneficios
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "program" && ( 
            <EditProgramForm
              edit
              btnRef={btnRef}
              saveProgram={saveProgram}
              initialValues={tax}
            />
          )}
          {tab === "subscriptions" && ( 
            <SuscriptionFlap />
          )}
         {tab === "benefits" && (
           <BenefitsFlap/>
          )}
        </div>
      </ CardBody>
    </Card>
  )
}

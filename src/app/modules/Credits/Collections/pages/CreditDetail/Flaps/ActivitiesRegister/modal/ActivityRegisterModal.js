/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import moment from "moment";
import useIsMountedRef from '../../../../../../../../hooks/useIsMountedRef'
import { useDetailActivityRegister } from '../../../../../utils/apiHook'

const defaultValues = {
  contact : "",
  date: "",
  description:"",
  user: ""
}

export const ActivityRegisterModal = ({show, onHide, id, contactsTypes}) => {

  const isMounted = useIsMountedRef()
  const [detailActivityRegister, activityRegisterCompleted] = useDetailActivityRegister(isMounted, id)
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    const {contactType, date, description, user} = detailActivityRegister
    const contact = contactsTypes.find(c => c.id == contactType)?.contactType || "Sin datos"
    setValues({
      contact,
      date,
      description,
      user
    })

  }, [contactsTypes, detailActivityRegister])

  if(!activityRegisterCompleted || detailActivityRegister.length === 0){
    return null
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      onEnter={() => {
        setValues(defaultValues)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Detalle registro de actividad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {values === defaultValues ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
         <>
          <div className="text-center">
            <p>Tipo de contacto: {values.contact}</p>
            <p>Fecha: {moment(values.date).utc().format('DD/MM/YYYY')}</p>
            <p>Descripción: {values.description}</p>
            <p>Usuario: {values.user}</p>
          </div>
        </>
        )}
      </Modal.Body>
    </Modal>
  )
}

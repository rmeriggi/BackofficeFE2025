/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useOneUser } from '../utils/apiHooks'
import { editOneUser } from '../utils/service'
import UserAccessFlap from './flaps/UserAccessFlap'
import EditUserForm from './UsersForm/EditUserForm'
import { Button, CircularProgress } from '@material-ui/core'
import useIsMountedRef from '../../../../hooks/useIsMountedRef'
import { LayoutSplashScreen } from '../../../../../_metronic/layout'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls'

export default function EditTax({match: {params: { id }}}) {
  
  const btnRef = useRef();
  const history = useHistory()
  const isMounted = useIsMountedRef()
  const [tab, setTab] = useState("user")
  const [isSubmitting, setIsSubmitting] = useState()
  const [oneUser, oneUserCompleted] = useOneUser(isMounted, id)
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El usuario fue editado correctamente.")

  if(!oneUserCompleted){
    return <LayoutSplashScreen />
  }

  const backToTaxesList = () => {
    history.push("/settings/user-management")
  }
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  } 
  
  const { user } = oneUser
  const saveUser = async(values) => {
    const userEdited = values
    try {
      await editOneUser(id, userEdited)
      setVariant('success')
      setMessage('El usuario fue editado correctamente.')
      setOpen(true)
    } catch {
      setVariant('error')
      setMessage('El usuario no pudo ser editado correctamente. Por favor, volvé a intentar.')
      setOpen(true)
    }
  }

  const saveClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
   }

  return (
    <Card>
      <CardHeader title="Editar Usuario">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToTaxesList}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-2"
            size="large"
            onClick={saveClick}
            disabled={isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress size={15} color="secondary"/>  
            }
          >
            Guardar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("user")}>
            <a
              className={`nav-link ${tab === "user" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "user").toString()}
            >
              Usuario
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("access")}>
            <a
              className={`nav-link ${tab === "access" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "access").toString()}
            >
              Permisos
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "user" && (
            <EditUserForm
              btnRef={btnRef}
              saveUser={saveUser}
              initialValues={user}
              setIsSubmitting={setIsSubmitting}
            />
          )}
          {tab === "access" && (
            <UserAccessFlap
              id={id}
            />
          )}
        </div>
        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
      </ CardBody>
    </Card>
  )
}

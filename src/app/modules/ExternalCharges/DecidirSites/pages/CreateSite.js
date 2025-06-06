import { Button, CircularProgress } from "@material-ui/core";
import React, { useRef } from 'react'
import { useSubheader } from '../../../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import FormSites from '../components/FormSites'
import { createIdSite } from '../utils/service'
import { useHistory } from "react-router-dom";
import { useLoading } from '../../../../hooks/useLoading'

const initialValues = {
  idclient: "",
  idSite: "",
  site: "",
  publicKey: "",
  privateKey:""
}

const CreateSite = ({setOpenMessage}) => {

  const btnRef = useRef()
  const subHeader = useSubheader()
  subHeader.setTitle('Crear Site')
  const history = useHistory()
  const {loading, enableLoading, disableLoading} = useLoading(false)

  const handleBack = () => {
    history.push('/externalcharges/sites')
  }

  const saveSite = async(values) => {
    enableLoading()
    try {
      await createIdSite(values)
      setOpenMessage("success", "Site creado correctamente")
      disableLoading()
      setTimeout(() => {
        history.push('/externalcharges/sites')
      }, 2000)
    } catch (error) {
      setOpenMessage("error", "Hubo un error con el proceso, intente nuevamente más tarde")
      disableLoading()
    }
  }

  const btnRefClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader title="">
        <CardHeaderToolbar >
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => handleBack()}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-4"
            size="medium"
            onClick={() => btnRefClick()}
            endIcon={
              loading && <CircularProgress size={20} color="secondary"/>
            }
            disabled={loading}
            >
              Crear Site
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FormSites btnRef={btnRef} initialValues={initialValues} action={saveSite}/>
      </CardBody>
    </Card>
  )
}

export default withSnackbar(CreateSite) 
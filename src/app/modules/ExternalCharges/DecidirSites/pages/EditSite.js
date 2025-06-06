import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { LayoutSplashScreen, useSubheader } from '../../../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import FormSites from '../components/FormSites'
import { editIdSite, getIdSite } from '../utils/service'
import { useLoading } from '../../../../hooks/useLoading'
import { useFetchClients } from "../../../../hooks";

const EditSite = ({setOpenMessage}) => {

  const { id } = useParams()
  const btnRef = useRef()
  const subHeader = useSubheader()
  const history = useHistory()
  subHeader.setTitle('Editar Site')

  const [clients] = useFetchClients()

  const [initialValues, setInitialValues] = useState()
  const {loading, enableLoading, disableLoading} = useLoading(false)

  const editSite = async(values) => {
    enableLoading()
    try {
      await editIdSite(values)
      setOpenMessage("success", "Site editado correctamente")
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

  const handleBack = () => {
    history.push('/externalcharges/sites')
  }

  useEffect(() => {
    const getOneSite = async() => {
      try {
        const response = await getIdSite(id)
        setInitialValues(response)
      } catch (error) {
        setInitialValues({
          id,
          idclient: "",
          site: "",
          idSite: "",
          publicKey: "",
          privateKey:""
        })
      }
    }
    getOneSite()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if(!(initialValues && clients)) return <LayoutSplashScreen />
  
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
            Guardar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FormSites 
          btnRef={btnRef} 
          initialValues={initialValues} 
          action={editSite} 
          clientsEdit={clients}
          isEdit/>
      </CardBody>
    </Card>
  )
}

export default withSnackbar(EditSite)
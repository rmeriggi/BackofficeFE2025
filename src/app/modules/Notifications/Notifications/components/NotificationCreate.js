import React, { useEffect, useRef, useState }  from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from '../../../../hooks/useSnackBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../../../_redux/notifications/notificationsActions";
import { createNotification } from "../../../../_redux/notifications/notificationsCrud";
import { useFetchCombos } from '../../../../hooks';
import { getStatus } from "../../../../_redux/combos/combosActions";
import {  MenuItem } from "@material-ui/core";
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';



  const NotificationsSchema = Yup.object().shape({
      idCliente: Yup.number().required('Este campo es obligatorio'),
      idModulo: Yup.number().required('Este campo es obligatorio'),
      alerta: Yup.string().required('Este campo es obligatorio'),
      cliente: Yup.string().required('Este campo es obligatorio'),
      modulo: Yup.string().required('Este campo es obligatorio'),
      asunto: Yup.string().required('Este campo es obligatorio'),
      descripcion: Yup.string().required('Este campo es obligatorio'),
      fecha: Yup.string().required('Este campo es obligatorio'),
      fechaActualizacion: Yup.string().required('Este campo es obligatorio'),
      status: Yup.number().required('Este campo es obligatorio'),
  });

export function NotificationCreate() {
  const history = useHistory();
  const formikRef = useRef(null);  
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const dispatch = useDispatch()    
  const [progress, setProgress] = useState(false);
  const fechaObjeto = new Date();
  const fechaISO = fechaObjeto.toISOString(); 
  
  const [status] = useFetchCombos('status', getStatus) 
  const initialValues = {  
      idCliente: 0,
      idModulo: 0,
      alerta: "",
      cliente: "",
      modulo: "",
      asunto: "",
      descripcion: "",
      fecha: fechaISO,
      fechaActualizacion: fechaISO,
      status: 0,
  }

  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  }  
  
  
  const handleCreate = async (value) => {      
    try {
        await createNotification(value)
        setProgress(false)
        setOpenMessage("success",'La notificación fue creada correctamente.')
        dispatch(getAllNotifications())
        setTimeout(()=>{
            history.goBack();
        }, 2000)
      } catch  {
        setOpenMessage("error",'La notificación no pudo ser creada correctamente. Por favor, volvé a intentar.')
      }
  }


  return (
    <Card>
      <CardHeader title={`Editar Notificacion`}>
        <CardHeaderToolbar>
          <Button
            onClick={(e)=>{
              history.goBack();
            }}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
          >
            Volver
          </Button>
          <Button 
            variant="contained"
            color="secondary"
            type="submit"
            className="ml-4"
            size="large"
            onClick={handleFormSubmit}
            endIcon={
            progress && <CircularProgress size={20} color="primary"/>  
            }
          >
            Crear
         </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
        <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={NotificationsSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setProgress(!progress)
            handleCreate(values);
          }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="form form-label-right">
                        <div className="form-product row">                 
            <div className="col-lg-4">
              <Field
                name="idCliente"
                component={Input}
                type="number"
                placeholder=""
                label="ID CLIENTE"
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="idModulo"
                component={Input}
                type="number"
                placeholder=""
                label="ID MODULO"
              />
            </div> 
          </div> 
            <div className="form-product row">          
            <div className="col-lg-4">
              <Field
                name="cliente"
                component={Input}
                placeholder=""
                label="CLIENTE"
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="modulo"
                component={Input}
                placeholder=""
                label="MODULO"
              />
            </div> 
            <div className="col-lg-4">
              <Field
                name="alerta"
                component={Input}
                placeholder=""
                label="ALERTA"
              />
            </div>
          </div> 
          <div className="form-product row">

          <div className="col-lg-6">
              <Field
                name="asunto"
                component={Input}
                placeholder=""
                label="ASUNTO"
              />
            </div>                   
          </div>    
          <div className="form-product row mb-5">
          <div className="col-lg-6">
          <label className="font-size-h7 col-lg-6 col-form-label text-lg-left pt-0 pb-2 pl-0">DESCRIPCION</label>
              <Field
                as="textarea"
                name="descripcion"  
                rows='10'
                style={{width:'100%'}}
                placeholder=""
                label="DESCRIPCION"
              />
            </div>           
            </div> 
            <div className="form-product row">
            <div className="col-lg-6">
                <label className="font-size-h7 text-lg-left pt-0">ESTADO</label>
                    <GeneralSelector 
                        values={values}
                        name="modulo"
                        valueName='status'
                        keyName='estadoNotificacion'
                        label=''
                        data={status}
                        setFieldValue={setFieldValue}
                        extraMenuItem= {
                        <MenuItem key={0} value={0}>
                            Todos
                        </MenuItem>
                        }
                    />
                    <ErrorMessage name="status">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                </div> 
            </div>             
        </Form>
        )}
      </Formik>          
        </div>
      </CardBody>
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </Card>
  );
}
import React, { useEffect, useRef, useState }  from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from '../../../../hooks/useSnackBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../../../_redux/notifications/notificationsActions";
import { getNotificationsById } from "../../../../_redux/notifications/notificationsCrud";
import { updateNotification } from "../../../../_redux/notifications/notificationsCrud";
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

export function NotificationEdit() {

  const history = useHistory();
  const formikRef = useRef(null);  
  const { id } = useParams();
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const dispatch = useDispatch()  
  const [notification, setNotification] = useState();
  const [loading , setLoading]=useState(false)
  


  
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
        setLoading(true)
      try {
        const response = await getNotificationsById(id);
        setNotification(response);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [id]);
 
const [status] = useFetchCombos('status', getStatus) 


  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  }  

  const handleEdit = async (value) => {      
    console.log(value)
    const fechaObjeto = new Date(value.fechaActualizacion);
    const fechaISO = fechaObjeto.toISOString();
    value.fecha = fechaISO
    const fechaActualizacionObjeto = new Date(value.fechaActualizacion);
    const fechaActualizacionISO = fechaActualizacionObjeto.toISOString();
    value.fechaActualizacion = fechaActualizacionISO
   
    try {
        await updateNotification(value)
        setProgress(false)
        setOpenMessage("success",'La notificación fue actualizada correctamente.')
        dispatch(getAllNotifications())
        setTimeout(()=>{
            history.goBack();
        }, 2000)
      } catch  {
        setOpenMessage("error",'La notificación no pudo ser actualizada correctamente. Por favor, volvé a intentar.')
      }
  }



if(!notification || loading){
  return <LayoutSplashScreen />
}

console.log('editoo',status)

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
            Actualizar
         </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
        <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={notification}
        validationSchema={NotificationsSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setProgress(!progress)
            handleEdit(values);
          }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="form form-label-right">
          <div className="form-product row mb-5">                 
            <div className="col-lg-3">
              <h5 style={{textJustify:"justify"}}>{`ALERTA: ${notification.alerta}`}</h5>
            </div>
            <div className="col-lg-3">
            <h5 style={{textJustify:"justify"}}>{`CLIENTE: ${notification.cliente}`}</h5>
            </div>
            <div className="col-lg-3">
            <h5 style={{textJustify:"justify"}}>{`MODULO: ${notification.modulo}`}</h5>
            </div>                
          </div>  
          <div className="form-product row mb-5">
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
                placeholder=""
                label="DESCRIPCION"
                style={{width:'100%'}}
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
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
import { getNotificationsById } from "../../../../_redux/notifications/notificationsCrud";
import { useFetchCombos } from '../../../../hooks';
import { getStatus } from "../../../../_redux/combos/combosActions";
import {  MenuItem } from "@material-ui/core";
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';
import supplierMocks from "../__mocks__/supplierMocks";
import banksMocks from "../__mocks__/banksMocks";
import categoriesMocks from "../__mocks__/categoriesMocks";
import cost_centersMocks from "../__mocks__/cost_centersMocks";
import countriesMocks from "../__mocks__/countriesMocks";
import BankAccountData from "./BankAccountData";
import { createSupplier } from "../../../../_redux/suppliers/suppliersCrud";
import { getAllSuppliers } from "../../../../_redux/suppliers/suppliersActions";


  const NotificationsSchema = Yup.object().shape({
    // idCliente: Yup.number().required('Este campo es obligatorio'),
    // idModulo: Yup.number().required('Este campo es obligatorio'),
    // alerta: Yup.string().required('Este campo es obligatorio'),
    // cliente: Yup.string().required('Este campo es obligatorio'),
    // modulo: Yup.string().required('Este campo es obligatorio'),
    // asunto: Yup.string().required('Este campo es obligatorio'),
    // descripcion: Yup.string().required('Este campo es obligatorio'),
    // fecha: Yup.string().required('Este campo es obligatorio'),
    // fechaActualizacion: Yup.string().required('Este campo es obligatorio'),
    // status: Yup.number().required('Este campo es obligatorio'),
  });

export function InvoiceCreate() {

  const history = useHistory();
  const formikRef = useRef(null);  
  const { id } = useParams();
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const dispatch = useDispatch()  
  const [notification, setNotification] = useState();
  

  const initialValues = {
    cuit: '',
    business_name: '',
    country:'',
    province: '',
    address: '',
    cp: '',
    cellphone: '',
    email:'',
    category_id:'',
    center_id: '',
    status: ''
  }
  
const [progress, setProgress] = useState(false); 
const [status] = useFetchCombos('status', getStatus) 


  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  }  

  const handleEdit = async (value) => {       
    const requestValues = {    
      cuit: value.cuit,
      razonsocial: value.business_name,
      pais: value.country,
      provincia: value.province,
      localidad: value.city,
      domicilio: value.address,
      cp: value.cp,
      telefono: value.cellphone,
      email: value.email,
      idcategoria: Number(value.category_id),
      idcentrocosto: Number(value.center_id)
    } 
    try {
      await createSupplier(requestValues)
      setProgress(false)
      setOpenMessage("success",'El proveedor fue creado correctamente.')
      dispatch(getAllSuppliers())
      setTimeout(()=>{
          history.goBack();
      }, 2000)
    } catch  {
      setOpenMessage("error",'El proveedor no pudo ser creado correctamente. Por favor, volvé a intentar.')
    }
  }


  return (
    <Card>
      <CardHeader title={`CREAR PROVEEDOR`}>       
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
            handleEdit(values);
          }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="form form-label-right">
            <article>
        <div className="col-lg-12">
        <p className="header-title fs-2 mb-5 mt-4">RAZON SOCIAL</p>
        <Field
                name="business_name"
                component={Input}
                label=""
              />
        </div>
        <div className="col-lg-12">
        <p className="header-title fs-2 mb-5 mt-4">CUIT</p>
        <Field
                name="cuit"
                component={Input}
                type="number"
                label=""
              />
        </div>
        <div className="col-lg-12">
        <p className="header-title fs-2 mb-5 mt-4">Categoría</p>
        <GeneralSelector 
            values={values}
            name="id"
            valueName='category_id'
            keyName='category'
            label=''
            data={categoriesMocks.categories}
            setFieldValue={setFieldValue}
            extraMenuItem= {
            <MenuItem key={0} value={0}>
                Todos
            </MenuItem>
            }
        />
        <ErrorMessage name="category_id">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
        </div>
        <div className= "col-lg-12 p-5">
        <p className="header-title fs-2 mb-5 mt-4">Centro de costos</p>
        <GeneralSelector 
            values={values}
            name="id"
            valueName='center_id'
            keyName='name'
            label=''
            data={cost_centersMocks.cost_centers}
            setFieldValue={setFieldValue}
        />
        <ErrorMessage name="cost_center_id">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
        </div>
      </article>
      <div className="d-flex flex-column p-5">
        {/* Dirección */}
        <p className="header-title fs-2 mb-5 mt-4">Dirección legal</p>
        <article className="d-flex flex-column mb-5 justify-content-md-evenly flex-md-row gap-4">
        <div className= "col-lg-4">
        <p className="header-title mb-2">País*</p>
        <GeneralSelector 
            values={values}
            valueName='country'
            keyName='country'
            valueKey='code'
            label=''
            data={countriesMocks.countries}
            setFieldValue={setFieldValue}
        />
        <ErrorMessage name="cost_center_id">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
          </div>   
          <div className= "col-lg-4"> 
          <Field
                name="province"
                component={Input}
                label="Provincia*"
              />
              </div>
           <div className= "col-lg-4">
           <Field
                name="city"
                component={Input}
                label="Ciudad*"
              />
            </div>
        </article>
        <article className="d-flex flex-column flex-md-row gap-4">
        <div className= "col-lg-6">
        <Field
                name="cp"
                component={Input}
                placeholder=""
                label="Código postal*"
              />
        </div>
        <div className= "col-lg-6">
           <Field
                name="address"
                component={Input}
                placeholder=""
                label="Dirección legal*"
              />
        </div>
        </article>
      </div>
      <div className="d-flex flex-column p-5">
        <p className="header-title fs-2 mb-5 mt-4">Datos de contacto</p>
        <article className="d-flex flex-column flex-md-row gap-4">
        <div className= "col-lg-6">
        <Field
                name="cellphone"
                component={Input}
                placeholder=""
                label="Teléfono*"
              />
        </div>
        <div className= "col-lg-6">
          <Field
                name="email"
                component={Input}
                placeholder=""
                label="Correo electrónico*"
              />
        </div>
        </article>
      </div>
      <div className="d-flex w-100 justify-content-md-end gap-4 p-5">
        {false && (
          <Button 
          variant="contained"
          color="secondary"
          className="ml-4"
          size="large"
          onClick={console.log('agregar')}
          endIcon={
          progress && <CircularProgress size={20} color="primary"/>  
          }
        >
          +
       </Button>
        )}
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
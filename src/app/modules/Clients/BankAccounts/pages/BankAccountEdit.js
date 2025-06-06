import React, { useRef, useState }  from "react";
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
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { useFetchBankAccountById  } from "../../../../hooks/useFetchBankAccountById";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { editBankAccountById } from "../../../../_redux/bankAccounts/bankAccountsCrud";
import { useDispatch } from "react-redux";
import { getAllBankAccounts } from "../../../../_redux/bankAccounts/bankAccountsActions";


  const ProductEditSchema = Yup.object().shape({
    cuit: Yup.string().matches(/^\d{11}$/, 'Debe ser una cadena numérica de 11 caracteres')
    .required('Este campo es obligatorio'),
    CBU: Yup.string().matches(/^\d{22}$/, 'Debe ser una cadena numérica de 22 caracteres')
    .required('Este campo es obligatorio'),
    CBUAlias: Yup.string().required("ALias es un campo requerido"),
    entity: Yup.string().required("Banco es un campo requerido"),
  });

export function BankAccountEdit() {

  const history = useHistory();
  const formikRef = useRef(null);  
  const { id } = useParams();
  const [bankAccount, loadingById] = useFetchBankAccountById(id)
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const dispatch = useDispatch()

  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  }  
  const [progress, setProgress] = useState(false);
  
  const handleEdit = async (value) => {    
    try {
        await editBankAccountById(value)
        setProgress(false)
        setOpenMessage("success",'La cuenta fue actualizada correctamente.')
        dispatch(getAllBankAccounts(value.idClient, false))
        setTimeout(()=>{
          history.push(`/clients/bankaccounts/list/${value.idClient}`)  
        }, 2000)
      } catch  {
        setOpenMessage("error",'La cuenta no pudo ser actualizada correctamente. Por favor, volvé a intentar.')
      }
  }



if(!bankAccount || loadingById){
  return <LayoutSplashScreen />
}

  return (
    <Card>
      <CardHeader title={`Editar Cuenta Bancaria`}>
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
        initialValues={bankAccount}
        validationSchema={ProductEditSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setProgress(!progress)
            handleEdit(values);
          }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <Form className="form form-label-right">
          <div className="form-product row">
            <div className="col-lg-4">
              <Field
                name="cuit"
                component={Input}
                placeholder=""
                label="CUIT/CUIL"
              />
            </div>            
            <div className="col-lg-4">
              <Field
                name="CBU"
                component={Input}
                placeholder=""
                label="CBU/CVU"
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="CBUAlias"
                component={Input}
                placeholder=""
                label="Alias"
              />
            </div>
          </div>
          <div className="form-product row">
            <div className="col-lg-4">
              <Field
                name="entity"
                component={Input}
                placeholder=""
                label="Banco"
              />
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
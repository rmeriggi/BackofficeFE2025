/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../../_metronic/_partials/controls";
import { getAllBankAccounts } from "../../../../../../_redux/bankAccounts/bankAccountsActions";
import { createBankAccount } from "../../../../../../_redux/bankAccounts/bankAccountsCrud";


export function CreateModal(props) {

  const client  = useSelector(state => state);
    const passport=client?.bankAccounts?.client?.client?.client.passport
    console.log('CUIT/CUIL',passport?.toString())

  const ProductEditSchema = Yup.object().shape({
    cuit: Yup.string().oneOf([passport?.toString()], 'el cuit/cuil ingresado debe corresponder al cliente')
    .required('Este campo es obligatorio'),
    CBU: Yup.string().matches(/^\d{22}$/, 'Debe ser una cadena numérica de 22 caracteres')
    .required('Este campo es obligatorio'),
    CBUAlias: Yup.string().required("ALias es un campo requerido"),
    entity: Yup.string().required("Banco es un campo requerido"),
  });


    const idParam = useParams().id;
    const [progress, setProgress] = useState(false);
    const dispatch = useDispatch()
    const { open, setOpen, variant,message, handleClose, setOpenMessage } = useSnackBar();
    const initialValues = {
        cuit: '',
        idClient: idParam,
        CBU:'',
        CBUAlias:'',
        entity:'',
    }

    const handleCreate = async (values) => {   
        try {
          await createBankAccount(values)
          setProgress(false)
          setOpenMessage("success",'La cuenta fue creada correctamente.')
          await dispatch(getAllBankAccounts(idParam, false))
          setOpen(false)
          props.setShow(false)
        } catch  {
          setProgress(false)
          setOpenMessage("error",'La cuenta no pudo ser creada. Por favor, volvé a intentar.')
          setOpen(false)
        }        
    }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={'m'}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
            Añadir Cuenta Bancaria
        </Modal.Title>
      </Modal.Header>
        <Formik
            enableReinitialize={false}
            initialValues={initialValues}
            validationSchema={ProductEditSchema}
            onSubmit={(values) => {
                setProgress(true)
                return handleCreate(values);
            }}
        >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <Form className="form form-label-right">
                <div className="form-product column">
                    <div className="col-lg-12">
                    <Field
                        name="cuit"
                        component={Input}
                        placeholder=""
                        label="CUIT/CUIL"
                    />
                    </div>
                    <div className="col-lg-12">
                    <Field
                        name="entity"
                        component={Input}
                        placeholder=""
                        label="Banco"
                    />
                    </div>
                    <div className="col-lg-12">
                    <Field
                        name="CBU"
                        component={Input}
                        placeholder=""
                        label="CBU/CVU"
                    />
                    </div>
                    <div className="col-lg-12">
                    <Field
                        name="CBUAlias"
                        component={Input}
                        placeholder=""
                        label="Alias"
                    />
                    </div>
                </div>  
                </Form>
            </Modal.Body>
            <Modal.Footer className="form">
                <div className="form-group">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={()=> props.setShow(false)}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={() => handleSubmit()}
                    disabled={progress}
                    endIcon={
                      progress && <CircularProgress size={20} color="secondary"/>  
                    }
                  >
                    Confirmar
                  </Button>
                </div>
            </Modal.Footer>
            <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
            />
          </>
        )}
      </Formik>  
    </Modal>
  );
}
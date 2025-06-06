/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { updateEcheck } from "../../../../../_redux/e-checks/echecksCrud";
import { getAllEchecks } from "../../../../../_redux/e-checks/echecksActions";


const ProductEditSchema = Yup.object().shape({
  idcuenta: Yup.number().required("Este es un campo requerido"),
  idmoneda: Yup.number().required("Este es un campo requerido"),
  cuitdestino: Yup.string().required("Este es un campo requerido") ,
  importe: Yup.number().required("Este es un campo requerido"),
  fechapago: Yup.string().required("Este es un campo requerido") ,
  fechaemision: Yup.string().required("Este es un campo requerido") ,
  tipoemision: Yup.number().required("Este es un campo requerido"),
  concepto: Yup.string().required("Este es un campo requerido") ,
  nature: Yup.string().required("Este es un campo requerido") ,
  modo: Yup.string().required("Este es un campo requerido") ,
  razon: Yup.string().required("Este es un campo requerido") ,
  referencia: Yup.string().required("Este es un campo requerido") ,
  trxid: Yup.string().required("Este es un campo requerido") ,
  trxjson:Yup.string().required("Este es un campo requerido") ,
  status:Yup.number().required("Este es un campo requerido"),
});

export function EditModal(props) {
    const [progress, setProgress] = useState(false);
    const dispatch = useDispatch()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar(); 

    const initialValues = {
      id: Number(props.editInitialData.id),
      idcuenta:Number(props.editInitialData.idCuenta),
      idmoneda: Number(props.editInitialData.idMoneda),
      cuitdestino: props.editInitialData.CUITDestino,
      importe: Number(props.editInitialData.Importe),
      fechapago:props.editInitialData.FechaPago,
      fechaemision:props.editInitialData.FechaEmision,
      tipoemision:Number(props.editInitialData.TipoEmision),
      concepto: props.editInitialData.Concepto,
      nature: props.editInitialData.Nature ,
      modo: props.editInitialData.Modo,
      razon: props.editInitialData.Razon ,
      referencia: props.editInitialData.Referencia ,
      status: Number(props.editInitialData.Status),
      trxid: props.editInitialData.TRXID,
      trxjson:props.editInitialData.TRXJSON ,
    }

    async function handleEdit(e) {       
      const fechaPago= new Date(e.fechapago);
      const fechaPagoISO = fechaPago.toISOString();
      const fechaEmision= new Date(e.fechaemision);
      const fechaEmisionISO = fechaEmision.toISOString();  

   const requestValues={
    id:e.id,
    idcuenta: e.idcuenta,
    idmoneda: e.idmoneda,
    tipoemision: e.tipoemision,
    cuitdestino: e.cuitdestino,
    importe: e.importe,
    fechaemision: fechaEmisionISO,
    fechapago: fechaPagoISO,
    concepto: e.concepto,
    nature:e.nature,
    modo: e.modo,
    razon: e.razon,
    referencia: e.referencia,
    trxid: e.trxid,
    trxjson: e.trxjson,
  }
   setProgress(false) 
        
       try {
        setProgress(true)
         await updateEcheck(requestValues)
         setOpenMessage("success",'El cheque fue actualizado correctamente.')
         await dispatch(getAllEchecks())      
         setProgress(false)
         props.setShow(false)
       } catch  {
        setOpenMessage("error",'El cheque no pudo ser actulizado correctamente. Por favor, volvé a intentar.')
        setProgress(false)      
       }
    
     }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={'xl'}
      centered={true}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
            Actualizar E-check
        </Modal.Title>
      </Modal.Header>
        <Formik
            enableReinitialize={false}
            initialValues={initialValues}
            validationSchema={ProductEditSchema}
            onSubmit={(values) => {
                setProgress(true)
                return handleEdit(values);
            }}
        >
        {({ handleSubmit, handleChange ,setFieldValue, values, isSubmitting }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
            <Form className="form form-label-right">
                <div className="form-product row">
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">ID CUENTA</label> 
                    <Field
                        name="idcuenta"
                        component={Input}
                        placeholder=""
                        type="number"
                        label=""
                        onChange={(e) => setFieldValue("idcuenta", e.target.value)}
                    />
                    </div>
                  
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">ID MONEDA</label> 
                    <Field
                        name="idmoneda"
                        component={Input}
                        placeholder=""
                        type="number"
                        label=""
                        onChange={(e) => setFieldValue("idmoneda", e.target.value)}
                    />
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">CUIT DESTINO</label> 
                    <Field
                        name="cuitdestino"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("cuitdestino", e.target.value)}
                    />
                    </div>
                    </div>
                <div className="form-product row">
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">IMPORTE</label> 
                    <Field
                        name="importe"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("importe", e.target.value)}
                    />
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">CONCEPTO</label> 
                    <Field
                        name="concepto"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("concepto", e.target.value)}
                    />
                    </div>                   
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">NATURE</label> 
                    <Field
                        name="nature"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("nature", e.target.value)}
                    />
                    </div>
                </div> 
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">MODO</label> 
                    <Field
                        name="modo"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("modo", e.target.value)}
                    />
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">ESTADO</label> 
                    <Field
                        name="status"
                        component={Input}
                        placeholder=""
                        type="number"
                        label=""
                        onChange={(e) => setFieldValue("status", e.target.value)}
                    />                    
                </div> 
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">RAZON</label> 
                    <Field
                        name="razon"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("razon", e.target.value)}
                    />                    
                </div>                 
                </div>   
                <div className="form-product row">
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">REFERENCIA</label> 
                    <Field
                        name="referencia"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("referencia", e.target.value)}
                    />                    
                </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">trxid</label> 
                    <Field
                        name="trxid"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("trxid", e.target.value)}
                    />                    
                </div>                   
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">trxjson</label> 
                    <Field
                        name="trxjson"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("trxjson", e.target.value)}
                    />                    
                </div>             
                </div>  
                <div className="form-product row">
                <div className="col-lg-4">
                <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">FECHA DE EMISION</label>        
                       <Field
                        type="date"
                        class="form-control"
                        name="fechaemision"
                        placeholder=""
                        component={Input}
                      />                    
                </div> 
                <div className="col-lg-4">
                <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">FECHA DE PAGO</label>        
                       <Field
                        type="date"
                        class="form-control"
                        name="fechapago"
                        placeholder=""
                        component={Input}
                      />                    
                </div>     
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-6 col-form-label text-lg-left">TIPO DE EMISION</label> 
                    <Field
                        name="tipoemision"
                        component={Input}
                        placeholder=""
                        type="number"
                        label=""
                        onChange={(e) => setFieldValue("tipoemision", e.target.value)}
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
                   Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mr-3"
                    size="large"
                    onClick={()=> handleSubmit()}
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
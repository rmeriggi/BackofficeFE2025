/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../hooks";
import { getWallets, getOperations, getSpecies, getDeadline, getCounterparties, getMarkets, getOperators, getCoins } from "../../../../../_redux/combos/combosActions";
import { getAllBlotters } from "../../../../../_redux/blotter/blottersActions";
import { newBlotter } from "../../../../../_redux/blotter/blottersCrud";

const ProductEditSchema = Yup.object().shape({
  idWallet: Yup.number().required("Este es un campo requerido"),
  idOperations: Yup.number().required("Este es un campo requerido"),
  idMoney: Yup.number().required("Este es un campo requerido"),
  idSpecie: Yup.number().required("Este es un campo requerido"),
  idDeadline: Yup.number().required("Este es un campo requerido"),
  quantity: Yup.number().required("Este es un campo requerido"),
  price: Yup.string().required('Este campo es obligatorio'),
  idCounterparty: Yup.number().required("Este es un campo requerido"),
  idMarket: Yup.number().required("Este es un campo requerido"),
  idOperator: Yup.number().required("Este es un campo requerido"),
  transferPrice: Yup.number().required("Este es un campo requerido"),
  FX: Yup.number().required("Este es un campo requerido"),
});

export function CreateModal(props) {

    const [progress, setProgress] = useState(false);
    const dispatch = useDispatch()
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar();
    const [wallets] = useFetchCombos('wallets', getWallets)    
    const [operations] = useFetchCombos('operations', getOperations)
    const [species] = useFetchCombos('species', getSpecies)
    const [deadline] = useFetchCombos('deadlines', getDeadline)  
    const [counterparties] = useFetchCombos('counterparties', getCounterparties)   
    const [markets] = useFetchCombos('markets', getMarkets)  
    const [coins] = useFetchCombos('coins', getCoins)  
    const cat = [{id:1, cat:'SI'  },{id:2, cat:'NO'}]
    


const fecha = new Date();
const año = fecha.getFullYear();
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
const dia = fecha.getDate().toString().padStart(2, '0');
const fechaFormateada = `${año}-${mes}-${dia}`;


    const initialValues = {
        date:fechaFormateada,
        id:'',
        idWallet:1,
        idOperations:'',
        idMoney:'',
        idSpecie:'',
        idDeadline:'',
        quantity:'',
        price:'',
        amount:'',
        idCounterparty:'',
        idMarket:'',
        idOperator: 0,
        charge: 2,
        authorized: 2,
        idAuthorized:  0,
        transferPrice: 0,
        performance:  0,
        FX:  '',
        notes:  '',
        timestamp: '',
        status: '',
    }

    const handleCreate = async (values) => {     
      values.idCounterparty=Number(values.idCounterparty)
      values.idDeadline=Number(values.idDeadline)
      values.idMarket=Number(values.idMarket)
      values.idMoney=Number(values.idMoney)
      values.idOperations=Number(values.idOperations)
      values.idOperator=Number(values.idOperator)
      values.idSpecie=Number(values.idSpecie)
      values.idWallet=Number(values.idWallet)
      values.quantity=Number(values.quantity)  

        try {
          await newBlotter(values)
          setProgress(false)
          await dispatch(getAllBlotters())
          props.setShow(false)        
        } catch  {
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
            Nueva Operación
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
                <div className="form-product row">
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">CARTERA</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='idWallet'
                        keyName='wallet'
                        label=""
                        data={wallets}
                        setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="idWallet">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">OPERACION</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='idOperations'
                        keyName='operation'
                        label=""
                        data={operations}
                        setFieldValue={setFieldValue}
                    />
                     <ErrorMessage name="idOperations">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">MONEDA</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='idMoney'
                        keyName='money'
                        label=""
                        data={coins}
                        setFieldValue={setFieldValue}
                    />
                     <ErrorMessage name="idMoney">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                </div>  
                <div className="form-product row">
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">ESPECIE</label>
                     <Field className="col-lg-12 form-control" name="idSpecie" as="select">
                        <option value={''}></option>
                        {species?.map(e=> <option value={e.id}>{e.abbreviation}</option> )}
                      </Field>
                     <ErrorMessage name="idSpecie">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">PLAZO</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='idDeadline'
                        keyName='deadline'
                        label=""
                        data={deadline}
                        setFieldValue={setFieldValue}
                    />
                     <ErrorMessage name="idDeadline">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>                   
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">CANTIDAD</label> 
                    <Field
                        name="quantity"
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""
                        onChange={(e) => setFieldValue("quantity", e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    </div>
                </div> 
                <div className="form-product row">
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">PRECIO C/100</label> 
                    <Field
                        name="price"
                        component={Input}
                        placeholder=""
                        type="text"
                        onFocus={()=>setFieldValue("price",values.price.replace(/\./g, '').replace(',', '.'))}
                        onBlur={()=>setFieldValue('price', new Intl.NumberFormat("de-DE", {minimumFractionDigits:4,  maximumFractionDigits: 4}).format(values.price))}
                        onChange={(e) => setFieldValue("price", e.target.value.replace(/[^0-9.]/g, ''))}
                        label=""
                    />
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">MONTO %100</label> 
                    <Field
                        name="amount" 
                        readOnly
                        value={values.amount = values.price.includes(',') ? new Intl.NumberFormat("de-DE", {minimumFractionDigits:4,  maximumFractionDigits: 4}).format((Number(values.price.replace(/\./g, '').replace(',', '.'))*values.quantity)/100):new Intl.NumberFormat("de-DE", {minimumFractionDigits:4,  maximumFractionDigits: 4}).format((values.price*values.quantity)/100)}
                        component={Input}
                        placeholder=""
                        type="text"
                        label=""                        
                    />
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">CONTRAPARTE</label>
                     <Field className="col-lg-12 form-control" name="idCounterparty" as="select">
                        <option selected value={''}></option>
                        {counterparties?.map(e=> <option value={e.id}>{e.Descripcion}</option> )}
                      </Field>
                     <ErrorMessage name="idCounterparty">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                </div> 
                <div className="form-product row">
                <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">MERCADO</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='idMarket'
                        keyName='market'
                        label=""
                        data={markets}
                        setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="idMarket">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-form-label text-lg-left">OP. DE FX</label> 
                    <GeneralSelector 
                        values={values}
                        valueName='FX'
                        keyName='cat'
                        label=""
                        data={cat}
                        setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="FX">{error => <p class="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>
                    <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">FECHA DE CONCERTACION</label>        
                       <Field
                        type="date"
                        class="form-control"
                        name="date"
                        placeholder=""
                        component={Input}
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
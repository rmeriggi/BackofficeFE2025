import React, { useState } from 'react'
import { Button, InputAdornment, TextField } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LayoutSplashScreen } from '../../../../../_metronic/layout'
import { Select, Input } from '../../../../../_metronic/_partials/controls'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import useIsMountedRef from '../../../../hooks/useIsMountedRef'
import { useSnackBar } from '../../../../hooks/useSnackBar'
import { useAllProducts } from '../../Products/utils/apiHook'
import { useContactsTypes } from '../utils/apiHook'
import { ListingTableContextProvider } from "../components/ListingInstallments/ListingTableContext";
import Listing from './ListingInstallments'
import ConfirmationModal from './ConfirmationModal'
import { calculatePlan } from '../utils/service'
import { useParams } from 'react-router-dom'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'

const initialValues = {
  idEntity: 0,
  idCurrency: 0
}

const PaymentPlan = ({show, onHide}) => {

  const isMounted = useIsMountedRef()
  const [contactTypes, contactTypesCompleted] = useContactsTypes(isMounted)
  const [productsData, productCompleted] = useAllProducts(isMounted, initialValues)
  const {user} = useSelector((state)=> state.auth)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [plan, setPlan] = useState([])
  const [planValues, setPlanValues] = useState({})
  const { id } = useParams()

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()
  
  if(!(contactTypesCompleted && productCompleted)) return <LayoutSplashScreen />

  const { contactsTypes } = contactTypes;
  const { products } = productsData;

  const openConfirmation = () => {
    setConfirmationModal(true)
  }

  const closeConfirmation = () => {
    setConfirmationModal(false)
  }

  const handleCalculatePlan = async(values) => {
    const bodyPlan = {
      idProduct: Number(values.product),
      installments: values.installments,
      import: values.amount
    }

    setPlanValues({
      idProduct: Number(values.product),
      installments: values.installments,
      import: values.amount,
      idCredit: Number(id),
      idUser: Number(values.idUser),
      channel: Number(values.contactType),
      message: values.description
    })
    try {
      const plan = await calculatePlan(bodyPlan)
      setPlan(plan)
    } catch (error) {
      setOpenMessage("error", "El plan no pudo ser calculado correctamente. Por favor, volvé a intentar.")
    }
  }

  return (
    <>
      <Modal
        size={'xl'}
        show={show}
        onHide={onHide}
        title="Confirmación"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            PLAN DE PAGOS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
          {/*begin::Loading*/}
          {!contactTypesCompleted ? (
            <>
            <div className="overlay-layer">
              <div className="spinner spinner-lg spinner-primary" />
            </div> 
            {/*end::Loading*/}
            </>
          ) : (
            <Formik
            initialValues={{
              contactType: contactsTypes[0]?.id,
              product: products[0]?.id,
              description: "",
              amount: 0,
              installments: 0,
              idUser: user.id,
            }}
            onSubmit={(values) => {
              openConfirmation()
              //handleNewContact(values);
            }}
            >
            {({ handleSubmit,values, setFieldValue, handleChange }) => (
              <>
                <Form className="form form-label-right">   
                  <div className="form-group row">
                    <div className="col">
                      <Select
                        name="contactType"
                        label="Tipo de contacto"
                        value={values.contactType}
                        onChange={(e)=>{
                          handleChange(e);
                          setFieldValue('contactType', e.target.value)
                        }}
                        >
                          {contactsTypes.map((e)=>(
                            <option key={e.id} value={e.id}>
                            {e.contactType}
                            </option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <TextField
                        name="description"
                        style={{ width: "100%"}}
                        color="secondary"
                        rows={3}
                        multiline
                        variant="outlined"
                        placeholder="Descripción"
                        label="Descripción"
                        onChange={(e) => {
                          setFieldValue("description", e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <Select
                        name="product"
                        label="Producto"
                        value={values.product}
                        onChange={(e)=>{
                          handleChange(e);
                          setFieldValue('product', e.target.value)
                        }}
                        >
                          {products.map((e)=>(
                            <option key={e.id} value={e.id}>
                            {e.product}
                            </option>
                          ))}
                      </Select>
                    </div>
                  </div>
                    <div className="form-group row">
                      <div className="col-4">
                        <Field
                          name="amount"
                          type='number'
                          value={values.amount}
                          component={Input}
                          error='El importe tiene que ser un número'
                          placeholder="Importe"
                          label="Importe"
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          onChange={(e)=> setFieldValue('amount', Number(e.target.value))}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          name="installments"
                          type='number'
                          value={values.installments}
                          component={Input}
                          error='La cantidad de cuotas tiene que ser un número'
                          placeholder="Cantidad de cuotas"
                          label="Cantidad de cuotas"
                          onChange={(e)=> setFieldValue('installments', Number(e.target.value))}
                        />
                      </div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        style={{height: "fit-content", marginTop: "26px"}}
                        onClick={()=> {
                          handleCalculatePlan(values)
                        }}
                      >
                        Calcular
                      </Button>
                    </div>
                    <div className='row w-100'>
                      <ListingTableContextProvider>
                        <Listing data={plan}/>
                      </ListingTableContextProvider>
                    </div>
                </Form>
              </>
            )}
          </Formik>
          )}
        </Modal.Body>
        <Modal.Footer className="form">
          <div className="form-group d-flex justify-content-end">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onHide}
            >
              Volver
            </Button>
            <Button
              className="ml-3"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                openConfirmation()
              }}
            >
              Enviar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal show={confirmationModal} onHide={closeConfirmation} plan={planValues}/>
      <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
      />
    </>
  )
}

export default withSnackbar(PaymentPlan)
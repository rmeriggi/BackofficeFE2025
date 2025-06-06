import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from '../../../../hooks/useSnackBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useDispatch } from "react-redux";
import { useFetchCombos } from '../../../../hooks';
import { getCountries, getCategories, getCostCenters } from "../../../../_redux/combos/combosActions";
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';
import { CreateModal } from "./Modal/CreateModal";
import { updateSupplier, getBankAccounts, deleteBankAccount } from "../../../../_redux/suppliers/suppliersCrud";
import { getAllSuppliers } from "../../../../_redux/suppliers/suppliersActions";
import { getSupplierDetail } from "../../../../_redux/suppliers/suppliersCrud";
import BankAccountData from "./BankAccountData";
import { DeleteModal } from "../../../../modules/Clients/BankAccounts/pages/Listing/components/DeleteModal";

const NotificationsSchema = Yup.object().shape({
  id: Yup.number().required('Este campo es obligatorio'),
  cuit: Yup.string().required('Este campo es obligatorio'),    
  business_name: Yup.string().required('Este campo es obligatorio'),
  country: Yup.string().required('Este campo es obligatorio'),
  province: Yup.string().required('Este campo es obligatorio'),
  city: Yup.string().required('Este campo es obligatorio'),
  address: Yup.string().required('Este campo es obligatorio'),
  cp: Yup.string().required('Este campo es obligatorio'),
  cellphone: Yup.string().required('Este campo es obligatorio'),
  email: Yup.string().required('Este campo es obligatorio'),
  category_id: Yup.number().required('Este campo es obligatorio'),
  center_id: Yup.number().required('Este campo es obligatorio'),
  iva: Yup.number().required('Este campo es obligatorio'),
  ganancias: Yup.number().required('Este campo es obligatorio'),
  iibb: Yup.number().required('Este campo es obligatorio')
});

export function SupplierEdit() {
  const history = useHistory();
  const formikRef = useRef(null);  
  const { id }  = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState();
  const [loading , setLoading] = useState(false);
  const [showAccountModal, setAccountModal] = useState(false);
  const [countries] = useFetchCombos('countries', getCountries);
  const [categories] = useFetchCombos('categories', getCategories);
  const [costCenters] = useFetchCombos('costCenters', getCostCenters);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [progress, setProgress] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [accountIdToDelete, setAccountIdToDelete] = useState(null);

  const initialValues = {
    id: supplier?.id,
    cuit: supplier?.cuit,
    business_name: supplier?.business_name,
    country: supplier?.country ? supplier.country.replace("+", "") : "",
    province: supplier?.province,
    city: supplier?.city,
    address: supplier?.address,
    cp: supplier?.cp,
    cellphone: supplier?.cellphone,
    email: supplier?.email,
    category_id: supplier?.category_id,
    center_id: supplier?.center_id,
    status: supplier?.status,
    iva: supplier?.IVA || '',
    ganancias: supplier?.Ganancias || '',
    iibb: supplier?.IIBB || ''
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      try {
        const response = await getSupplierDetail(id);
        setSupplier(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        setLoading(false);
      }
    };

    const fetchBankAccounts = async () => {
      try {
        const response = await getBankAccounts(id); 
        if (Array.isArray(response)) {
          setBankAccounts(response);
        } else {
          console.error("Respuesta inesperada al obtener las cuentas bancarias:", response);
          setBankAccounts([]);
        }
      } catch (error) {
        setBankAccounts([]);
        console.error("Error fetching bank accounts:", error);
      }
    };

    fetchSupplier();
    fetchBankAccounts();
  }, [id]);

  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  };

  const handleEdit = async (value) => {     
    const requestValues = {
      id: value.id,
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
      idcentrocosto: Number(value.center_id),
      IVA: value.iva ? value.iva.toString() : "",
      Ganancias: value.ganancias ? value.ganancias.toString() : "",
      IIBB: value.iibb ? value.iibb.toString() : ""
    };   
      
    try {
      await updateSupplier(requestValues);
      setProgress(false);
      setOpenMessage("success",'El proveedor fue actualizado correctamente.');
      dispatch(getAllSuppliers());
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch {
      setOpenMessage("error",'El proveedor no pudo ser actualizado correctamente. Por favor, volvé a intentar.');
    }
  };
  
  const refetchBankAccounts = async () => {
    try {
      const updatedAccounts = await getBankAccounts(id);
      console.log("Respuesta de cuentas bancarias después de eliminación:", updatedAccounts);
      if (Array.isArray(updatedAccounts)) {
        setBankAccounts(updatedAccounts);
      } else {
        console.warn("Estructura inesperada al obtener cuentas bancarias:", updatedAccounts);
        setBankAccounts([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No se encontraron cuentas bancarias para el proveedor.");
        setBankAccounts([]); 
      } else {
        console.error("Error al obtener cuentas bancarias:", error);
        setOpenMessage("error", "Error al cargar las cuentas bancarias.");
      }
    }
  };

  const handleAddBankAccount = () => {
    setAccountModal(true);
  };

  const handleDeleteBankAccount = (accountId) => {
    setAccountIdToDelete(accountId); 
    setShowDeleteModal(true);
  };

  const confirmDeleteBankAccount = async () => {
    console.log("Iniciando eliminación de cuenta bancaria"); 
    try {
      const deleteResponse = await deleteBankAccount(accountIdToDelete);
      console.log("Respuesta al eliminar cuenta bancaria:", deleteResponse);
      await refetchBankAccounts();
      setOpenMessage("success", "Cuenta bancaria eliminada correctamente.");
    } catch (error) {
      console.error("Error en confirmDeleteBankAccount:", error);
      setOpenMessage("error", "Error al eliminar la cuenta bancaria.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (!supplier || loading) {
    return <LayoutSplashScreen />;
  }

  return (
    <Card>
      <CardHeader title={`${supplier?.business_name} - ${supplier?.cuit} `}>       
        <CardHeaderToolbar>
          <Button
            onClick={() => history.goBack()}
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
            endIcon={progress && <CircularProgress size={20} color="primary"/>}
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
            initialValues={initialValues}
            validationSchema={NotificationsSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              setProgress(!progress);
              handleEdit(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="form form-label-right">
            
                <div className="d-flex flex-column p-5">
                  <p className="header-title fs-2 mb-5 mt-4">Dirección legal</p>
                  <article className="d-flex flex-column mb-5 justify-content-md-evenly flex-md-row gap-4">
                    <div className="col-lg-4">
                      <p className="header-title mb-2">País*</p>
                      <GeneralSelector 
                        values={values}
                        valueName='country'
                        keyName='country'
                        valueKey='code'
                        label=''
                        data={countries}
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage name="country">{error => <p className="text-danger text-xs">{error}</p>}</ErrorMessage>
                    </div>   
                    <div className="col-lg-4"> 
                      <Field
                        name="province"
                        component={Input}
                        label="Provincia*"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="city"
                        component={Input}
                        label="Ciudad*"
                      />
                    </div>
                  </article>
                  <article className="d-flex flex-column flex-md-row gap-4">
                    <div className="col-lg-6">
                      <Field
                        name="cp"
                        component={Input}
                        placeholder=""
                        label="Código postal*"
                      />
                    </div>
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
                      <Field
                        name="cellphone"
                        component={Input}
                        placeholder=""
                        label="Teléfono*"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="email"
                        component={Input}
                        placeholder=""
                        label="Correo electrónico*"
                      />
                    </div>
                  </article>
                </div>
                <div className="col-lg-12">
                  <p className="header-title fs-2 mb-5 mt-4">IVA</p>
                  <Field name="iva" component={Input} type="number" label="" />
                </div>
                <div className="col-lg-12">
                  <p className="header-title fs-2 mb-5 mt-4">Ganancias</p>
                  <Field name="ganancias" component={Input} type="number" label="" />
                </div>
                <div className="col-lg-12">
                  <p className="header-title fs-2 mb-5 mt-4">IIBB</p>
                  <Field name="iibb" component={Input} type="number" label="" />
                </div>
                

                <div className="d-flex flex-column p-5">
                  <p className="header-title fs-2 mb-5 mt-4">Categoría</p>
                  <GeneralSelector 
                    values={values}
                    name="id"
                    valueName='category_id'
                    keyName='categoria'
                    label=''
                    data={categories}
                    setFieldValue={setFieldValue}
                  />
                  <ErrorMessage name="category_id">{error => <p className="text-danger text-xs">{error}</p>}</ErrorMessage>
                </div>
                
                <div className="d-flex flex-column p-5">
                  <p className="header-title fs-2 mb-5 mt-4">Centro de costos</p>
                  <GeneralSelector 
                    values={values}
                    name="id"
                    valueName='center_id'
                    keyName='CentroC'
                    label=''
                    data={costCenters}
                    setFieldValue={setFieldValue}
                  />
                  <ErrorMessage name="center_id">{error => <p className="text-danger text-xs">{error}</p>}</ErrorMessage>
                </div>

                <div className="mb-10 mt-6 p-5">
                  <p className="header-title fs-2">Cuentas bancarias</p>
                  {Array.isArray(bankAccounts) && bankAccounts.length > 0 ? (
                    bankAccounts.map((account) => (
                      <BankAccountData
                        key={account.id}
                        refetch={refetchBankAccounts}
                        idSuplier={id}
                        showView={false}
                        transferIcon={false}
                        trashIcon={true}
                        showButtons={true}
                        dataCvuSuplier={{
                          bank: account.CBUAlias,
                          cvu_cbu: account.cuit,
                          id: account.id,
                          name: account.CBU,
                        }}
                        onDelete={() => handleDeleteBankAccount(account.id)}
                      />
                    ))
                  ) : (
                    <p className="text-title fs-4 text-center">
                      No hay cuentas bancarias/virtuales disponibles.
                    </p>
                  )}
                </div>

                <div className="d-flex w-100 justify-content-md-end gap-4 p-5">
                  <Button 
                    variant="contained"
                    color="secondary"
                    className="ml-4"
                    size="large"
                    onClick={handleAddBankAccount} 
                    endIcon={progress && <CircularProgress size={20} color="primary"/>}
                  >
                    +
                  </Button>
                </div>
              </Form>
            )}
          </Formik>          
        </div>
      </CardBody>

      <CreateModal
        show={showAccountModal}
        onHide={() => setAccountModal(false)}
        refetchAccounts={refetchBankAccounts}
        idProveedor={id}
      />

      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        accountId={accountIdToDelete}
        clientId={id}
        refetch={refetchBankAccounts}
        onConfirm={confirmDeleteBankAccount} 
      />

      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </Card>
  );
}

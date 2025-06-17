import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useDispatch } from "react-redux";
import { useFetchCombos } from "../../../../hooks";
import {
  getCountries,
  getCategories,
  getCostCenters,
} from "../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../components/Fields/GeneralSelector";
import { CreateModal } from "./Modal/CreateModal";
import {
  updateSupplier,
  getBankAccounts,
  deleteBankAccount,
} from "../../../../_redux/suppliers/suppliersCrud";
import { getAllSuppliers } from "../../../../_redux/suppliers/suppliersActions";
import { getSupplierDetail } from "../../../../_redux/suppliers/suppliersCrud";
import BankAccountData from "./BankAccountData";
import { DeleteModal } from "../../../../modules/Clients/BankAccounts/pages/Listing/components/DeleteModal";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Contacts as ContactsIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  AccountBalance as BankIcon,
} from "@material-ui/icons";

const NotificationsSchema = Yup.object().shape({
  id: Yup.number().required("Este campo es obligatorio"),
  cuit: Yup.string().required("Este campo es obligatorio"),
  business_name: Yup.string().required("Este campo es obligatorio"),
  country: Yup.string().required("Este campo es obligatorio"),
  province: Yup.string().required("Este campo es obligatorio"),
  city: Yup.string().required("Este campo es obligatorio"),
  address: Yup.string().required("Este campo es obligatorio"),
  cp: Yup.string().required("Este campo es obligatorio"),
  cellphone: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string().required("Este campo es obligatorio"),
  category_id: Yup.number().required("Este campo es obligatorio"),
  center_id: Yup.number().required("Este campo es obligatorio"),
  iva: Yup.number().required("Este campo es obligatorio"),
  ganancias: Yup.number().required("Este campo es obligatorio"),
  iibb: Yup.number().required("Este campo es obligatorio"),
});

export function SupplierEdit() {
  const history = useHistory();
  const formikRef = useRef(null);
  const { id } = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState();
  const [loading, setLoading] = useState(false);
  const [showAccountModal, setAccountModal] = useState(false);
  const [countries] = useFetchCombos("countries", getCountries);
  const [categories] = useFetchCombos("categories", getCategories);
  const [costCenters] = useFetchCombos("costCenters", getCostCenters);
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
    iva: supplier?.IVA || "",
    ganancias: supplier?.Ganancias || "",
    iibb: supplier?.IIBB || "",
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
          console.error(
            "Respuesta inesperada al obtener las cuentas bancarias:",
            response
          );
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
      IIBB: value.iibb ? value.iibb.toString() : "",
    };

    try {
      await updateSupplier(requestValues);
      setProgress(false);
      setOpenMessage("success", "El proveedor fue actualizado correctamente.");
      dispatch(getAllSuppliers());
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch {
      setOpenMessage(
        "error",
        "El proveedor no pudo ser actualizado correctamente. Por favor, volvé a intentar."
      );
    }
  };

  const refetchBankAccounts = async () => {
    try {
      const updatedAccounts = await getBankAccounts(id);
      console.log(
        "Respuesta de cuentas bancarias después de eliminación:",
        updatedAccounts
      );
      if (Array.isArray(updatedAccounts)) {
        setBankAccounts(updatedAccounts);
      } else {
        console.warn(
          "Estructura inesperada al obtener cuentas bancarias:",
          updatedAccounts
        );
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
    <Card className="supplier-edit-card">
      <CardHeader
        title={
          <div className="d-flex align-items-center">
            <BusinessIcon className="mr-3 text-primary" fontSize="large" />
            <div>
              <h2 className="mb-0">{supplier?.business_name}</h2>
              <p className="text-muted mb-0">CUIT: {supplier?.cuit}</p>
            </div>
          </div>
        }
      >
        <CardHeaderToolbar>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            startIcon={<ArrowBackIcon />}
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
              progress ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <SaveIcon />
              )
            }
          >
            Guardar cambios
          </Button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody className="p-6">
        <div className="mt-4">
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
                {/* Sección de información general */}
                <div className="card card-custom gutter-b mb-8">
                  <div className="card-header border-0 bg-light-primary py-5 mb-6">
                    <div className="card-title">
                      <h3 className="card-label">
                        <BusinessIcon className="mr-2 text-primary " />
                        Información del Proveedor
                      </h3>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Razón Social*
                          </label>
                          <Field
                            name="business_name"
                            component={Input}
                            placeholder="Nombre de la empresa"
                          />
                          <ErrorMessage name="business_name">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">CUIT*</label>
                          <Field
                            name="cuit"
                            component={Input}
                            placeholder="00-00000000-0"
                          />
                          <ErrorMessage name="cuit">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de ubicación */}
                <div className="card card-custom gutter-b mb-8">
                  <div className="mb-6 card-header border-0 bg-light-primary py-5">
                    <div className="card-title">
                      <h3 className="card-label">
                        <LocationIcon className="mr-2 text-primary" />
                        Ubicación
                      </h3>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">País*</label>
                          <GeneralSelector
                            values={values}
                            valueName="country"
                            keyName="country"
                            valueKey="code"
                            placeholder="Seleccionar país"
                            data={countries}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage name="country">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">Provincia*</label>
                          <Field
                            name="province"
                            component={Input}
                            placeholder="Provincia"
                          />
                          <ErrorMessage name="province">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">Ciudad*</label>
                          <Field
                            name="city"
                            component={Input}
                            placeholder="Ciudad"
                          />
                          <ErrorMessage name="city">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label className="font-weight-bold">Dirección*</label>
                          <Field
                            name="address"
                            component={Input}
                            placeholder="Dirección completa"
                          />
                          <ErrorMessage name="address">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Código Postal*
                          </label>
                          <Field
                            name="cp"
                            component={Input}
                            placeholder="Código postal"
                          />
                          <ErrorMessage name="cp">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de contacto */}
                <div className="card card-custom gutter-b mb-8">
                  <div className="mb-6 card-header border-0 bg-light-primary py-5">
                    <div className="card-title">
                      <h3 className="card-label">
                        <ContactsIcon className="mr-2 text-primary" />
                        Información de Contacto
                      </h3>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">Teléfono*</label>
                          <Field
                            name="cellphone"
                            component={Input}
                            placeholder="Teléfono de contacto"
                          />
                          <ErrorMessage name="cellphone">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Correo Electrónico*
                          </label>
                          <Field
                            name="email"
                            component={Input}
                            placeholder="email@proveedor.com"
                            type="email"
                          />
                          <ErrorMessage name="email">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de impuestos */}
                <div className="card card-custom gutter-b mb-8">
                  <div className="mb-6 card-header border-0 bg-light-primary py-5">
                    <div className="card-title">
                      <h3 className="card-label">
                        <MoneyIcon className="mr-2 text-primary" />
                        Impuestos y Retenciones
                      </h3>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">IVA (%)*</label>
                          <Field
                            name="iva"
                            component={Input}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          <ErrorMessage name="iva">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Ganancias (%)*
                          </label>
                          <Field
                            name="ganancias"
                            component={Input}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          <ErrorMessage name="ganancias">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="font-weight-bold">IIBB (%)*</label>
                          <Field
                            name="iibb"
                            component={Input}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          <ErrorMessage name="iibb">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de categorización */}
                <div className="card card-custom gutter-b mb-8">
                  <div className="mb-6 card-header border-0 bg-light-primary py-5">
                    <div className="card-title">
                      <h3 className="card-label">
                        <CategoryIcon className="mr-2 text-primary" />
                        Categorización
                      </h3>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">Categoría*</label>
                          <GeneralSelector
                            values={values}
                            valueName="category_id"
                            keyName="categoria"
                            placeholder="Seleccionar categoría"
                            data={categories}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage name="category_id">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Centro de Costos*
                          </label>
                          <GeneralSelector
                            values={values}
                            valueName="center_id"
                            keyName="CentroC"
                            placeholder="Seleccionar centro de costos"
                            data={costCenters}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage name="center_id">
                            {(error) => (
                              <div className="text-danger small mt-1">
                                {error}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de cuentas bancarias */}
                <div className="card card-custom gutter-b">
                  <div className="mb-6 card-header border-0 bg-light-primary py-5">
                    <div className="card-title">
                      <h3 className="card-label">
                        <BankIcon className="mr-2 text-primary" />
                        Cuentas Bancarias
                      </h3>
                    </div>
                    <div className="card-toolbar">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="font-weight-bold"
                        onClick={handleAddBankAccount}
                        startIcon={<AddIcon />}
                      >
                        Agregar Cuenta
                      </Button>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {Array.isArray(bankAccounts) && bankAccounts.length > 0 ? (
                      <div className="bank-accounts-container">
                        {bankAccounts.map((account) => (
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
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <BankIcon
                          className="text-muted"
                          style={{ fontSize: "4rem" }}
                        />
                        <p className="font-size-h4 text-muted mt-4">
                          No hay cuentas bancarias registradas
                        </p>
                        <p className="text-muted mb-6">
                          Agrega una cuenta bancaria para este proveedor
                        </p>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleAddBankAccount}
                          startIcon={<AddIcon />}
                        >
                          Agregar primera cuenta
                        </Button>
                      </div>
                    )}
                  </div>
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

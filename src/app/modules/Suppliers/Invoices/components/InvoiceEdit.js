import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
/* import { useDispatch } from "react-redux"; */
import { useFetchCombos } from "../../../../hooks";
import {
  getCategories,
  getCostCenters,
} from "../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../components/Fields/GeneralSelector";
import {
  getInvoicesById,
  editInvoice,
} from "../../../../_redux/invoices/invoicesCrud";
import {
  CalendarToday,
  Description,
  Email,
  Link,
  Payment,
  Today,
} from "@material-ui/icons";

const NotificationsSchema = Yup.object().shape({
  date: Yup.string().required("La fecha es obligatoria"),
  expiration_date: Yup.string().required(
    "La fecha de vencimiento es obligatoria"
  ),
});

export function InvoiceEdit() {
  const history = useHistory();
  const formikRef = useRef(null);
  const { id } = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const [invoice, setInvoice] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  const [categories] = useFetchCombos("categories", getCategories);
  const [costCenters] = useFetchCombos("costCenters", getCostCenters);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await getInvoicesById(id);
        setInvoice(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleEdit = async (values) => {
    const payload = {
      id: values.id,
      tipomovimiento: values.id_type_movement,
      cuit: values.cuit?.toString() || "",
      fecha: new Date(values.date).toISOString(),
      fechavencimiento: new Date(values.expiration_date).toISOString(),
      condicion: values.payment_condition || "",
      trxautomatica: parseInt(values.trx_automatic, 10) || 0,
      email: values.email || "",
      url: values.url || "",
      comprobante: values.receipt || "",
      centrocosto: parseInt(values.id_center_cost, 10) || 0,
      importe: parseFloat(values.amount) || 0,
      idcuenta: parseInt(values.id_account, 10) || 0,
      categoria: parseInt(values.id_category, 10) || 0,
      descripcion: values.description || "",
      idorigen: parseInt(values.id_origin, 10) || 0,
      razonsocial: values.businnes_name || "",
    };

    setLoading(true);
    try {
      const response = await editInvoice(payload);
      if (response.id) {
        setOpenMessage("Edición exitosa", "success");
        setTimeout(() => {
          history.push("/suppliers/invoices");
        }, 1500);
      } else {
        setOpenMessage("No se pudo editar", "error");
      }
    } catch (error) {
      console.error("Error al editar la deuda:", error);
      setOpenMessage("Ocurrió un error al editar", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!invoice || loading) {
    return <LayoutSplashScreen />;
  }

  const initialValues = {
    id: invoice?.id || 0,
    id_type_movement: invoice?.id_type_movement || 0,
    cuit: invoice?.cuit || "",
    date: invoice?.date || "",
    expiration_date: invoice?.expiration_date || "",
    payment_condition: invoice?.payment_condition || "",
    trx_automatic: invoice?.trx_automatic || 0,
    email: invoice?.email || "",
    url: invoice?.url || "",
    receipt: invoice?.receipt || "",
    id_center_cost: invoice?.id_center_cost || 0,
    amount: invoice?.amount || 0,
    id_account: invoice?.id_account || 0,
    id_category: invoice?.id_category || 0,
    description: invoice?.description || "",
    id_origin: invoice?.id_origin || 0,
    businnes_name: invoice?.businnes_name || "",
  };

  // Estilos para campos de formulario
  const fieldStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #e4e6ef",
    padding: "12px 15px",
    fontSize: "15px",
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <Card className="col-lg-10 shadow-lg">
        <CardHeader
          title={
            <div className="d-flex align-items-center">
              <div
                className="symbol symbol-50px "
                style={{ marginRight: "8px" }}
              >
                <div className="symbol-label bg-light-primary">
                  <span className="svg-icon svg-icon-2x svg-icon-primary">
                    <i className="fas fa-file-invoice-dollar fs-2x text-primary"></i>
                  </span>
                </div>
              </div>
              <div>
                <h2 className="card-title fw-bolder text-dark">
                  DETALLE DE DEUDA
                </h2>
                <div className="text-muted">Editando factura #{id}</div>
              </div>
            </div>
          }
        >
          <CardHeaderToolbar>
            <Button
              onClick={() => history.goBack()}
              variant="outlined"
              className="btn btn-light btn-active-light-primary"
              startIcon={<i className="fas fa-arrow-left me-2"></i>}
            >
              Volver
            </Button>
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody className="p-8">
          <div className="mb-10">
            <h3 className="fw-bolder text-dark mb-6">
              Información del Proveedor
            </h3>
            <div className="d-flex align-items-center mb-8">
              <div
                className="symbol symbol-50px"
                style={{ marginRight: "8px" }}
              >
                <div className="symbol-label bg-light-warning">
                  <span className="svg-icon svg-icon-2x svg-icon-warning">
                    <i className="fas fa-building fs-2x text-warning"></i>
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="text-gray-600 fs-6 fw-bold">Razón Social</span>
                <span className="text-gray-800 fs-5 fw-bolder">
                  {initialValues.businnes_name}
                </span>
              </div>
            </div>

            <div className="row g-5 mb-8">
              <div className="col-md-6">
                <div className="d-flex flex-column">
                  <span className="text-gray-600 fs-6 fw-bold">CUIT/CUIL</span>
                  <span className="text-gray-800 fs-5">
                    {initialValues.cuit}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column">
                  <span className="text-gray-600 fs-6 fw-bold">Monto</span>
                  <span className="text-gray-800 fs-5 fw-bolder">
                    $
                    {parseFloat(initialValues.amount).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-10"></div>

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
            {({
              handleSubmit,
              values,
              handleChange,
              setFieldValue,
              isSubmitting,
              errors,
              touched,
            }) => (
              <Form>
                <h3 className="fw-bolder text-dark mb-6">
                  Detalles de la Factura
                </h3>

                <div className="row g-8 mb-10">
                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <Description
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      Descripción
                    </label>
                    <Field
                      name="description"
                      component={Input}
                      style={fieldStyle}
                      placeholder="Descripción de la factura"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <Payment
                        className="me-2"
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      Condición de Pago
                    </label>
                    <Field
                      name="payment_condition"
                      component={Input}
                      style={fieldStyle}
                      placeholder="Ej: Contado, 30 días"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <Today
                        className="me-2"
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      Fecha de Emisión
                      {errors.date && touched.date && (
                        <span className="text-danger ms-2">*</span>
                      )}
                    </label>
                    <Field
                      name="date"
                      type="date"
                      component={Input}
                      style={fieldStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <CalendarToday
                        className="me-2"
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      Fecha de Vencimiento
                      {errors.expiration_date && touched.expiration_date && (
                        <span className="text-danger ms-2">*</span>
                      )}
                    </label>
                    <Field
                      name="expiration_date"
                      type="date"
                      component={Input}
                      style={fieldStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <Email
                        className="me-2"
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      component={Input}
                      style={fieldStyle}
                      placeholder="correo@proveedor.com"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3 d-flex align-items-center">
                      <Link
                        className="me-2"
                        style={{ color: "#3699FF", marginRight: "4px" }}
                      />
                      URL
                    </label>
                    <Field
                      name="url"
                      component={Input}
                      style={fieldStyle}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                      Comprobante
                    </label>
                    <Field
                      name="receipt"
                      component={Input}
                      style={fieldStyle}
                      placeholder="Número de comprobante"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                      Categoría
                    </label>
                    <GeneralSelector
                      values={values}
                      valueName="id_category"
                      keyName="categoria"
                      data={categories}
                      setFieldValue={setFieldValue}
                      style={fieldStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                      Centro de Costo
                    </label>
                    <GeneralSelector
                      values={values}
                      valueName="id_center_cost"
                      keyName="CentroC"
                      data={costCenters}
                      setFieldValue={setFieldValue}
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-8">
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{
                      minWidth: "120px",
                      padding: "10px 20px",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    {isSubmitting ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Guardando...
                      </span>
                    ) : (
                      "Guardar Cambios"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>

        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
      </Card>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from '../../../../hooks/useSnackBar';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import { useDispatch } from "react-redux";
import { useFetchCombos } from '../../../../hooks';
import { getCategories, getCostCenters } from "../../../../_redux/combos/combosActions";
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';
import { getInvoicesById, editInvoice } from "../../../../_redux/invoices/invoicesCrud";

const NotificationsSchema = Yup.object().shape({
  date: Yup.string().required('La fecha es obligatoria'),
  expiration_date: Yup.string().required('La fecha de vencimiento es obligatoria'),
});

export function InvoiceEdit() {
  const history = useHistory();
  const formikRef = useRef(null);
  const { id } = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const [invoice, setInvoice] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  
  const [categories] = useFetchCombos('categories', getCategories);
  const [costCenters] = useFetchCombos('costCenters', getCostCenters);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await getInvoicesById(id);
        setInvoice(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice:', error);
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

    setLoading(true); // Asegúrate de que el estado de carga se actualice al inicio
    try {
      const response = await editInvoice(payload);
      if (response.id) {
        setOpenMessage("Edición exitosa", "success");
        history.push('/suppliers/invoices'); // Navega a la página anterior
        window.location.reload(); // Recarga la página para mostrar los datos actualizados
      } else {
        setOpenMessage("No se pudo editar", "error");
      }
    } catch (error) {
      console.error("Error al editar la deuda:", error);
      setOpenMessage("Ocurrió un error al editar", "error");
    } finally {
      setLoading(false); // Asegúrate de detener la carga en cualquier caso
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

  return (
    <Card className="mx-40 col-lg-8">
      <CardHeader title={`DETALLE DE DEUDA`}>
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
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div>
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
            {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
              <Form className="form form-label-right">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="header-title fs-2 mb-5 mt-4">RAZÓN SOCIAL</p>
                    <Field
                      name="businnes_name"
                      component={Input}
                      label=""
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">IMPORTE</p>
                    <Field name="amount" component={Input} type="number" label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">CONDICIÓN DE PAGO</p>
                    <Field name="payment_condition" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">DESCRIPCIÓN</p>
                    <Field name="description" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">FECHA</p>
                    <Field name="date" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">FECHA DE VENCIMIENTO</p>
                    <Field name="expiration_date" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">EMAIL</p>
                    <Field name="email" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">URL</p>
                    <Field name="url" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">COMPROBANTE</p>
                    <Field name="receipt" component={Input} label="" />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">CATEGORÍA</p>
                    <GeneralSelector 
                      values={values}
                      valueName='id_category'
                      keyName='categoria'
                      label=''
                      data={categories}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="col-lg-6">
                    <p className="header-title fs-2 mb-5 mt-4">CENTRO DE COSTO</p>
                    <GeneralSelector 
                      values={values}
                      valueName='id_center_cost'
                      keyName='CentroC'
                      label=''
                      data={costCenters}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#3783E7",
                      color: "white",
                      border: "1px solid #3783E7",
                    }}
                    disabled={isSubmitting}
                  >
                    Guardar
                  </Button>
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

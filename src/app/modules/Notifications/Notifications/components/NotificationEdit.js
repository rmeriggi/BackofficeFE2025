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
import { getAllNotifications } from "../../../../_redux/notifications/notificationsActions";
import { getNotificationsById } from "../../../../_redux/notifications/notificationsCrud";
import { updateNotification } from "../../../../_redux/notifications/notificationsCrud";
import { useFetchCombos } from "../../../../hooks";
import { getStatus } from "../../../../_redux/combos/combosActions";
import { MenuItem } from "@material-ui/core";
import { GeneralSelector } from "../../../../components/Fields/GeneralSelector";

const NotificationsSchema = Yup.object().shape({
  idCliente: Yup.number().required("Este campo es obligatorio"),
  idModulo: Yup.number().required("Este campo es obligatorio"),
  alerta: Yup.string().required("Este campo es obligatorio"),
  cliente: Yup.string().required("Este campo es obligatorio"),
  modulo: Yup.string().required("Este campo es obligatorio"),
  asunto: Yup.string().required("Este campo es obligatorio"),
  descripcion: Yup.string().required("Este campo es obligatorio"),
  fecha: Yup.string().required("Este campo es obligatorio"),
  fechaActualizacion: Yup.string().required("Este campo es obligatorio"),
  status: Yup.number().required("Este campo es obligatorio"),
});

export function NotificationEdit() {
  const history = useHistory();
  const formikRef = useRef(null);
  const { id } = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await getNotificationsById(id);
        setNotification(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [id]);

  const [status] = useFetchCombos("status", getStatus);

  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  };

  const handleEdit = async (value) => {
    const fechaObjeto = new Date(value.fechaActualizacion);
    const fechaISO = fechaObjeto.toISOString();
    value.fecha = fechaISO;
    const fechaActualizacionObjeto = new Date(value.fechaActualizacion);
    const fechaActualizacionISO = fechaActualizacionObjeto.toISOString();
    value.fechaActualizacion = fechaActualizacionISO;

    try {
      await updateNotification(value);
      setProgress(false);
      setOpenMessage(
        "success",
        "La notificación fue actualizada correctamente."
      );
      dispatch(getAllNotifications());
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch {
      setOpenMessage(
        "error",
        "La notificación no pudo ser actualizada correctamente. Por favor, volvé a intentar."
      );
    }
  };

  if (!notification || loading) {
    return <LayoutSplashScreen />;
  }

  return (
    <div className="bg-light-primary p-6">
      <Card className="shadow-lg rounded-xl border-0 overflow-hidden">
        <CardHeader
          title={
            <div className="d-flex align-items-center">
              <i className="fas fa-bell text-white fs-2x me-3"></i>
              <span className="text-white fw-bold fs-1">
                Editar Notificación
              </span>
            </div>
          }
          className="bg-gradient-primary py-5 px-6"
        >
          <CardHeaderToolbar>
            <Button
              onClick={(e) => {
                history.goBack();
              }}
              variant="outlined"
              className="btn btn-light btn-active-light-primary me-3"
              size="large"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Volver
            </Button>
            <Button
              variant="contained"
              className="ml-6 btn btn-primary"
              type="submit"
              size="large"
              onClick={handleFormSubmit}
              endIcon={
                progress && (
                  <CircularProgress size={20} className="text-white" />
                )
              }
            >
              <i className="fas fa-save me-2"></i>
              Actualizar
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody className="bg-white p-8">
          <div className="mt-5">
            <Formik
              innerRef={formikRef}
              enableReinitialize
              initialValues={notification}
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
              }) => (
                <Form className="form form-label-right">
                  {/* Información de la notificación */}
                  <div className="card card-bordered mb-8 bg-light-info">
                    <div className="card-body p-6">
                      <div className="row">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40px symbol-circle me-4 bg-white mr-6">
                              <i className="fas fa-exclamation-triangle text-warning fs-2x"></i>
                            </div>
                            <div>
                              <span className="text-muted fw-bold d-block">
                                ALERTA
                              </span>
                              <span className="text-dark fw-bolder fs-5">
                                {notification.alerta}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40px symbol-circle me-4 bg-white mr-6">
                              <i className="fas fa-building text-primary fs-2x"></i>
                            </div>
                            <div>
                              <span className="text-muted fw-bold d-block">
                                CLIENTE
                              </span>
                              <span className="text-dark fw-bolder fs-5">
                                {notification.cliente}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-40px symbol-circle me-4 bg-white mr-6">
                              <i className="fas fa-cube text-danger fs-2x"></i>
                            </div>
                            <div>
                              <span className="text-muted fw-bold d-block">
                                MÓDULO
                              </span>
                              <span className="text-dark fw-bolder fs-5">
                                {notification.modulo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Campos de edición */}
                  <div className="row mb-6">
                    <div className="col-lg-8">
                      <div className="form-group mb-6">
                        <label className="form-label fs-6 fw-bolder text-dark required">
                          Asunto
                        </label>
                        <Field
                          name="asunto"
                          component={Input}
                          placeholder="Ingrese el asunto"
                          className="form-control form-control-lg form-control-solid"
                        />
                      </div>

                      <div className="form-group mb-6">
                        <label className="form-label fs-6 fw-bolder text-dark required">
                          Descripción
                        </label>
                        <Field
                          as="textarea"
                          name="descripcion"
                          className="form-control form-control-lg form-control-solid"
                          rows="6"
                          placeholder="Ingrese la descripción..."
                        />
                        <ErrorMessage name="descripcion">
                          {(error) => (
                            <div className="text-danger fs-7 mt-1">{error}</div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="form-group">
                        <label className="form-label fs-6 fw-bolder text-dark required">
                          Estado
                        </label>
                        <div className="position-relative">
                          <GeneralSelector
                            values={values}
                            name="status"
                            valueName="status"
                            keyName="estadoNotificacion"
                            data={status}
                            setFieldValue={setFieldValue}
                            className="form-select form-select-lg form-select-solid"
                            extraMenuItem={
                              <MenuItem key={0} value={0}>
                                Todos
                              </MenuItem>
                            }
                          />
                        </div>
                        <ErrorMessage name="status">
                          {(error) => (
                            <div className="text-danger fs-7 mt-1">{error}</div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="card card-bordered bg-light-warning">
                        <div className="card-header bg-info">
                          <h3 className="card-title text-white">Detalles</h3>
                        </div>
                        <div className="card-body bg-light-info">
                          <div className="d-flex flex-column">
                            <div className="mb-5">
                              <span className="text-gray-600 fw-bold d-block">
                                Fecha de creación
                              </span>
                              <span className="text-dark fw-bolder">
                                {new Date(notification.fecha).toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 fw-bold d-block">
                                Última actualización
                              </span>
                              <span className="text-dark fw-bolder">
                                {new Date(
                                  notification.fechaActualizacion
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </CardBody>
      </Card>
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </div>
  );
}

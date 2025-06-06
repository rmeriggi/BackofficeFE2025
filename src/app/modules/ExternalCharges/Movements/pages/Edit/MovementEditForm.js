import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "../../../../../../_metronic/_partials/controls";
import {
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { ConfirmationModal } from "./ConfirmationModal";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { MovementStatusEnum } from "./MovementStatusEnum";
import { formatNumberToMoney } from "../../../../../utils/formatData";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
    width: "15px !important",
    height: "15px !important",
  },
  submitContainer: {
    display: "flex",
    alignItems: "center",
  },
  submitButton: {
    height: 35,
  },
}));

export function MovementEditForm({ movement, status }) {
  const initialValues = {
    id: movement.id,
    description: movement.description,
    status: movement.statusId,
    amount: formatNumberToMoney(movement.amount),
    authorizationNumber: movement.authorizationNumber,
    operationCode: movement.operationCode,
    operationNumber: movement.operationNumber,
    date: moment(movement.date).format("DD/MM/YYYY"),
    email: movement.email,
    days: movement.days,
    site: movement.site,
    beneficiario: movement.beneficiario,
    vencimiento: moment(movement.vencimiento).format("DD/MM/YYYY"),
    bin: movement.bin,
    groupState: movement.groupState,
    reason: movement.reason,
    errorType: movement.errorType,
  };

  const paymentMethodAgronacion = 22;

  const isAgronacion = () => {
    return movement.paymentMethodId === paymentMethodAgronacion;
  };
  const classes = useStyles();

  const [confirmationModal, setConfirmationModal] = useState(false);
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);

  const openConfirmation = () => {
    setConfirmationModal(true);
  };

  const closeConfirmation = () => {
    setConfirmationModal(false);
  };

  const checkOptionSelected = (optionSelected, currentValue, setFieldValue) => {
    if (
      Number(currentValue) === MovementStatusEnum.PENDING &&
      optionSelected !== MovementStatusEnum.UPLOADED
    ) {
      setOpenMessage(
        "error",
        "De 'Pendiente' solo puede seleccionar 'Operacion cargada'"
      );
    } else if (
      Number(currentValue) === MovementStatusEnum.UPLOADED &&
      optionSelected === MovementStatusEnum.PENDING
    ) {
      setOpenMessage(
        "error",
        "De 'Operacion cargada' solo puede seleccionar 'Aceptada' o 'Rechazada'"
      );
    } else {
      setFieldValue("status", optionSelected);
    }
  };

  const validateNroOperation = (values) => {
    if (values.status === 2) {
      if (values.operationNumber === 0 || !values.operationNumber) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setProgress(!progress);
          openConfirmation();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-description row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="description"
                    component={Input}
                    placeholder="Descripción"
                    label="Descripción"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="amount"
                    component={Input}
                    placeholder="Monto"
                    label="Monto"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="authorizationNumber"
                    component={Input}
                    placeholder="N° de autorización"
                    label="N° de autorización"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled={!isAgronacion()}
                    type="number"
                    name="operationNumber"
                    component={Input}
                    placeholder="N° de operación"
                    label="N° de operación"
                    withFeedbackLabel={false}
                  />
                  {validateNroOperation(values) && (
                    <small style={{ color: "red" }}>
                      El campo no puede ser 0 o estar vacio
                    </small>
                  )}
                </div>
              </div>
              <div className="form-description row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="operationCode"
                    component={Input}
                    placeholder="Código de operación"
                    label="Código de operación"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="date"
                    component={Input}
                    placeholder="Fecha"
                    label="Fecha"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="days"
                    component={Input}
                    placeholder="Dias"
                    label="Dias"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="vencimiento"
                    component={Input}
                    placeholder="Vencimiento"
                    label="Vencimiento"
                  />
                </div>
              </div>
              <div className="form-description row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="beneficiario"
                    component={Input}
                    placeholder="Beneficiario"
                    label="Beneficiario"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="site"
                    component={Input}
                    placeholder="Sitio"
                    label="Sitio"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="bin"
                    component={Input}
                    placeholder="BIN"
                    label="BIN"
                  />
                </div>
              </div>
              <div className="form-description row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="groupState"
                    component={Input}
                    placeholder="Grupo Estado"
                    label="Grupo Estado"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="reason"
                    component={Input}
                    placeholder="Motivo"
                    label="Motivo"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="errorType"
                    component={Input}
                    placeholder="Tipo Error"
                    label="Tipo Error"
                  />
                </div>
              </div>
              <div className="form-description row">
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="email"
                    component={Input}
                    placeholder="email"
                    label="Email"
                  />
                </div>
                <div className="col-lg-3 mt-6">
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Estado</InputLabel>
                    <Select
                      disabled={
                        movement.paymentMethodId !== paymentMethodAgronacion
                      }
                      value={values.status}
                      onChange={(e) => {
                        checkOptionSelected(
                          e.target.value,
                          values.status,
                          setFieldValue
                        );
                      }}
                      style={{ width: "250px" }}
                    >
                      {status.map((e) => (
                        <MenuItem value={e.id} key={e.id}>
                          {e.status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {movement.paymentMethodId === paymentMethodAgronacion && (
                <div className={classes.submitContainer}>
                  <Button
                    disabled={validateNroOperation(values)}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    onClick={handleSubmit}
                    endIcon={
                      progress && (
                        <CircularProgress size={20} color="secondary" />
                      )
                    }
                  >
                    Guardar
                  </Button>
                </div>
              )}
              <ConfirmationModal
                show={confirmationModal}
                onHide={closeConfirmation}
                values={values}
                setProgress={setProgress}
              />
              <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
              />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

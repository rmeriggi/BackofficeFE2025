import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Checkbox } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import relationTypeMock from "../../../../__mocks__/relationTypeMock";
import { GeneralSelector } from "../../../../components/Fields/GeneralSelector";
import { updateRelation } from "../../../../_redux/relations/relationsCrud";
import { getAllRelations } from "../../../../_redux/relations/relationsActions";
import { useDispatch } from "react-redux";
import { getOne, getUrlImages } from "../../BankAccounts/utils/service"; 

const RelationEdit = Yup.object().shape({
  participation: Yup.number().required("Nombre es un campo requerido"),
  idRelation: Yup.string().required("Nombre es un campo requerido"),
});

const relations = relationTypeMock.relations;

export function RelationsEdit({
  setIsEdit,
  setSelectedRelation,
  selectedRelation,
  clientId, 
}) {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });
  const [clientData, setClientData] = useState({}); 
  const [urlImage, setUrlImage] = useState("");
  const [imageUrls, setImageUrls] = useState({}); 

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientResponse = await getOne(clientId || id);
        setClientData(clientResponse);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    if (clientId || id) {
      fetchClientData();
    }
  }, [clientId, id]); 

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await getUrlImages(); 
        const imageUrl = response.url.replace("VALIDATIONS", "DOCUMENTS"); 
        setUrlImage(imageUrl); 
        console.log("URL de imagen base:", imageUrl);

        const passport = clientData?.client?.client.passport || "default_passport"; 
        const cuit = selectedRelation.cuit || "default_cuit";

        if (!passport || !cuit) {
          console.warn("Passport o CUIT no están definidos, no se pueden construir las URLs de las imágenes.");
          return;
        }

        const frontImage = `${imageUrl}${passport}/archivos/${cuit}/frente.jpg`;
        const backImage = `${imageUrl}${passport}/archivos/${cuit}/dorso.jpg`;
        const seriousImage = `${imageUrl}${passport}/archivos/${cuit}/serio.jpg`;
        const smilingImage = `${imageUrl}${passport}/archivos/${cuit}/sonriendo.jpg`;

        setImageUrls({
          frontImage,
          backImage,
          seriousImage,
          smilingImage,
        });

        console.log("URL de la imagen frontal:", frontImage);
        console.log("URL de la imagen dorso:", backImage);
        console.log("URL de la imagen seria:", seriousImage);
        console.log("URL de la imagen sonriendo:", smilingImage);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    if (clientData.client && selectedRelation.cuit) {
      fetchImageUrl();
    }
  }, [clientData, selectedRelation]); 

  const handleError = (name) => {
    setError({ ...error, [name]: true });
  };

  const handleFormSubmit = () => {
    formikRef.current.submitForm();
  };

  const handleEdit = async (values) => {
    const RelationValues = {
      id: Number(values.idClientRelation),
      idClient: Number(id),
      idPerson: Number(values.idPerson),
      idRelation: Number(values.idRelation),
      status: Number(values.status),
      dischargeDate: new Date().toISOString(),
      participation: values.idRelation === "2" ? 0 : Number(values.participation),
    };
    try {
      await updateRelation(RelationValues);
      setProgress(false);
      setOpenMessage("success", "La relación fue actualizada correctamente.");
      setIsEdit(false);
      await dispatch(getAllRelations(id, false));
    } catch (error) {
      console.error("Error updating relation:", error);
      setOpenMessage(
        "error",
        "La relación no pudo ser actualizada correctamente. Por favor, inténtalo de nuevo."
      );
      setIsEdit(false);
    }
  };

  return (
    <Card>
      <CardHeader title={`Editar Relación`}>
        <CardHeaderToolbar>
          <Button
            onClick={() => {
              setSelectedRelation({});
              setIsEdit(false);
            }}
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
            endIcon={progress && <CircularProgress size={20} color="primary" />}
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
            initialValues={{
              idClientRelation: selectedRelation.idClientRelation,
              firstName: selectedRelation.name,
              lastName: selectedRelation.lastName,
              cuit: selectedRelation.cuit ? selectedRelation.cuit : "",
              idRelation: selectedRelation.idRelation,
              idPerson: selectedRelation.idPerson,
              email: selectedRelation.email,
              status: selectedRelation.status === "1" ? 1 : 0,
              participation: selectedRelation.participation,
            }}
            validationSchema={RelationEdit}
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
                <div className="form-product row">
                  <div className="col-lg-3">
                    <Field
                      name="firstName"
                      readOnly
                      disabled
                      component={Input}
                      placeholder=""
                      label="Nombre"
                    />
                  </div>
                  <div className="col-lg-3">
                    <Field
                      name="lastName"
                      readOnly
                      disabled
                      component={Input}
                      placeholder=""
                      label="Apellido"
                    />
                  </div>
                  <div className="col-lg-3">
                    <Field
                      name="cuit"
                      readOnly
                      disabled
                      component={Input}
                      placeholder=""
                      label="CUIT/CUIL"
                    />
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 text-lg-left">
                      Tipo de relación
                    </label>
                    <GeneralSelector
                      values={values}
                      valueName="idRelation"
                      keyName="name"
                      label=""
                      data={relations}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="idRelation">
                      {(error) => (
                        <p className="text-danger text-xs">{error}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <Field
                      name="email"
                      readOnly
                      disabled
                      component={Input}
                      placeholder=""
                      label="Email"
                    />
                  </div>
                  {values.idRelation == "1" && (
                    <div className="col-lg-3">
                      <Field
                        name="participation"
                        component={Input}
                        placeholder=""
                        label="Porcentaje de participación"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label className="col-lg-12 col-form-label text-lg-left">
                      STATUS
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="status"
                        checked={values.status}
                        onChange={(e) => {
                          setFieldValue("status", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-group row">
            <div className="col-3">
              <img
                className="w-100"
                src={error.img1 ? toAbsoluteUrl("/media/error/bg3.jpg") : imageUrls.frontImage}
                alt="Frente del DNI"
                onError={() => handleError("img1")}
                role="button"
              />
            </div>
            <div className="col-3">
              <img
                className="w-100"
                src={error.img2 ? toAbsoluteUrl("/media/error/bg3.jpg") : imageUrls.backImage}
                alt="Dorso del DNI"
                onError={() => handleError("img2")}
                role="button"
              />
            </div>
            <div className="col-3">
              <img
                className="w-100"
                src={error.img3 ? toAbsoluteUrl("/media/error/bg3.jpg") : imageUrls.seriousImage}
                alt="Selfie serio"
                onError={() => handleError("img3")}
                role="button"
              />
            </div>
            <div className="col-3">
              <img
                className="w-100"
                src={error.img4 ? toAbsoluteUrl("/media/error/bg3.jpg") : imageUrls.smilingImage}
                alt="Selfie sonriendo"
                onError={() => handleError("img4")}
                role="button"
              />
            </div>
          </div>
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

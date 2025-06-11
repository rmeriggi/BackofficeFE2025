import React, { useState } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { toAbsoluteUrl } from "../../../../../../../../_metronic/_helpers";
import { Input } from "../../../../../../../../_metronic/_partials/controls";

const cardSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  lastName: Yup.string().required("Apellido es requerido"),
  number: Yup.string().required("Número es requerida"),
  birthDay: Yup.string().required("Fecha de nacimiento es requerido"),
  status: Yup.string().required("Status reqerido"),
});

export function CardIssueForm({
  values,
  btnRef,
  setIsSubmitting,
  saveEditCard,
}) {
  const [cardImageId, setCardImageId] = useState(values.cardId || 1);
  const [isHovered, setIsHovered] = useState(false);
  const toggleCardImage = (setFieldValue) => {
    const newId = cardImageId === 1 ? 2 : 1;
    setCardImageId(newId);
    setFieldValue("cardId", newId);
  };

  console.log(values.status);

  return (
    <div className="col-3">
      <Formik
        initialValues={values}
        validationSchema={cardSchema}
        onSubmit={(values) => {
          return saveEditCard(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <>
            <img
              src={toAbsoluteUrl(`/media/cards/card${cardImageId}.png`)}
              alt="card"
              className="img-fluid mb-3"
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
                filter: isHovered ? "brightness(1.1)" : "brightness(1)",
              }}
              onClick={() => toggleCardImage(setFieldValue)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            <Form className="form form-label-right mt-5">
              <div className="form-group row">
                <div className="col">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Holder Name"
                    label="Holder Name"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <Field
                    name="start_date"
                    component={Input}
                    placeholder="Fecha de Alta"
                    label="Fecha Alta"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <Field
                    name="expiration_date"
                    component={Input}
                    placeholder="Fecha de Vencimiento"
                    label="Fecha Vencimiento"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col">
                  <Field
                    name="number"
                    component={Input}
                    placeholder="Número de tarjeta"
                    label="Número"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col d-flex align-items-baseline">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.status === 0 ? false : true}
                        onChange={(e) =>
                          setFieldValue(
                            "status",
                            e.target.checked !== false ? 1 : 0
                          )
                        }
                        name="status"
                      />
                    }
                    label="Status"
                    labelPlacement="top"
                  />
                  <div>
                    {values.status === 1 ? <span>On</span> : <span>Off</span>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
                onClick={setIsSubmitting(isSubmitting)}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

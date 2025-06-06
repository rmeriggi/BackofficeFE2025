/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { InputAdornment, FormControlLabel, Checkbox } from "@material-ui/core";
import { Field } from "formik";
import { useEditContext } from "../Context/EditContext";
import { Input, Select } from "../../../../../../../_metronic/_partials/controls";
import { EDIT_PRODUCT } from "../Context/actions";

export function InfoEditForm({edit, setFieldValue, values, handleChange}) {

  const {state, dispatch, quotaCalculate, earnings} = useEditContext()
  const [calcForm, setCalcForm] = useState(quotaCalculate.quotasCalculate.find(q => state.product.idQuotaCalculate == q.id).formula || "Sin datos")
  
  const dispatchFields = (value) => {
    dispatch({
      type: EDIT_PRODUCT,
      product: value
    })
  }

  const {quotasCalculate} = quotaCalculate
  const {earningsData} = earnings

  return (
    <>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="creditsQuantity"
            component={Input}
            placeholder="Límite por cliente"
            label="Límite por cliente"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({creditsQuantity :e.target.value})
            }}
          />
        </div> 
        <div className="col-lg-3">
          <Select 
            name="idPaymentCalculate" 
            label="Sistema de cálculo de cuotas" 
            value={values.idPaymentCalculate}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idPaymentCalculate", e.target.value)
              dispatchFields({idPaymentCalculate :e.target.value})
              setCalcForm(quotasCalculate.find(q => e.target.value == q.id).formula || "Sin datos")
            }}
          >
            {quotasCalculate.map((q) => (
              <option key={q.id} value={q.id}>
                {q.description}
              </option>
            ))}
          </Select>
        </div> 
        <div className="col-lg-3">
          <Field
            value={calcForm}
            disabled
            component={Input}
            placeholder="Fórmula de cálculo"
            label="Fórmula de cálculo"
          />
        </div> 
        <div className="col-lg-3">
          <Field
            name="RCI"
            component={Input}
            placeholder="RCI"
            label="RCI"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({RCI :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
          />
        </div>  
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="quotaMin"
            component={Input}
            placeholder="Cantidad cuota(min)"
            label="Cantidad cuota(min)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({quotaMin :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="quotaMax"
            component={Input}
            placeholder="Cantidad cuota(max)"
            label="Cantidad cuota(max)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({quotaMax :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="minAmount"
            component={Input}
            placeholder="Monto (min)"
            label="Monto (min)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({minAmount :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          /> 
        </div>
        <div className="col-lg-3">
          <Field
            name="maxAmount"
            component={Input}
            placeholder="Monto (max)"
            label="Monto (max)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({maxAmount :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          /> 
        </div>
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="minScore"
            component={Input}
            placeholder="Score (min)"
            label="Score (min)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({minScore :e.target.value})
            }}
          />
        </div> 
        <div className="col-lg-3">
          <Field
            name="maxScore"
            component={Input}
            placeholder="Score (max)"
            label="Score (max)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({maxScore :e.target.value})
            }}
          />
        </div> 
        <div className="col-lg-3">
          <Field
            name="minCalification"
            component={Input}
            placeholder="Calificación (min)"
            label="Calificación (min)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({minCalification :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="maxCalification"
            component={Input}
            placeholder="Calificación (max)"
            label="Calificación (max)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({maxCalification :e.target.value})
            }}
          />
        </div> 
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Select 
            name="idLoginData" 
            label="Datos ingresos" 
            value={values.idLoginData}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idLoginData", e.target.value)
              dispatchFields({idLoginData :e.target.value})
            }}
          >
            {earningsData.map((earning) => (
              <option key={earning.id} value={earning.id}>
                {earning.earningsData}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-3">
          <FormControlLabel
            label="Aplica reputación"
            labelPlacement="top"
            control={
              <Checkbox
                value={values.reputation}
                checked={values.reputation === "1"}
                onChange={(e) => {
                  setFieldValue("reputation", e.target.checked ? "1" : "0")
                  dispatchFields({reputation : e.target.checked ? "1" : "0"})
                }}
                color="secondary"
              />
            }
          />
        </div>
      </div>
    </>
  );
}
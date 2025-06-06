import React from "react";
import { Formik, Form, Field } from "formik";

const SelectInput = ({ field, form, options, set, valueName, keyName, values }) => {
  const handleChange = (e) => {
    set(valueName, e.target.value)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      set(valueName, e.target.value)
    }
  };

  return (
    <select
      className="custom-select"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={values[valueName]}
    >
      <option value="">Seleccione una opción</option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option[keyName]}
        </option>
      ))}
    </select>
  );
};

const GeneralSelectorArrow = ({data, setField, valueName, keyName, values}) => {

  return (
    <div>
          <Field
            name={valueName}
            component={SelectInput}
            options={data}
            set={setField}
            valueName={valueName}
            keyName={keyName}
            values={values}
          />
    </div>
  );
};

export default GeneralSelectorArrow;




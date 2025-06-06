import React from "react";
import InputErrors from "./InputErrors";
import clsx from "clsx";

const DataInputContainer = ({
  formik,
  formik_name,
  margins,
  title,
  placeholder,
  disabled,
  errors_position,
  max_width,
  type,
  autoComplete,
}) => {
  return (
    <div className={`${margins} position-relative`}>
      <p className="text-start">{title}</p>
      <div>
        <input
          autoComplete={autoComplete ?? "on"}
          style={{ height: "3.2rem", maxWidth: max_width }}
          disabled={disabled}
          {...formik.getFieldProps(formik_name)}
          name={formik_name}
          type={type ? type : "text"}
          className={clsx(
            "form-control input-modal-email border border-1 border-gray-700",
            {
              "is-invalid":
                formik.touched[formik_name] && formik.errors[formik_name],
            },
            {
              "is-valid":
                formik.touched[formik_name] && !formik.errors[formik_name],
            }
          )}
          placeholder={placeholder}
        />
      </div>
      {formik.touched[formik_name] && formik.errors[formik_name] && (
        <InputErrors
          position={`${errors_position}`}
          error={formik.errors[formik_name]}
        />
      )}
    </div>
  );
};

export default DataInputContainer;
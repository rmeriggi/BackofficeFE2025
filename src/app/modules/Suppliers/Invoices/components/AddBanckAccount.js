import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import DataInputContainer from "./DataInputContainer";
import { addBankAccount } from "../../../../_redux/suppliers/suppliersCrud";
import { useSnackBar } from '../../../../hooks/useSnackBar';
import { useHistory } from "react-router-dom"; 

const AddBankAccount = ({ idSupplier, refetchAccounts, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { setOpenMessage } = useSnackBar();
  const history = useHistory(); 

  const formik = useFormik({
    initialValues: {
      IdProveedor: idSupplier,  
      cbu_: "",
      CBUAlias: "",
      cuit: "",
      Entidad: "",
      status: 1,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const bankAccountData = {
          IdProveedor: values.IdProveedor,
          cbu: values.cbu,
          CBUAlias: values.CBUAlias,
          cuit: values.cuit,
          Entidad: values.Entidad,
          status: values.status,
        };
        
        const response = await addBankAccount(bankAccountData);
        if (response.status === 200) {
          await refetchAccounts();  
          setOpenMessage("success", "Cuenta bancaria añadida correctamente.");
          
          
          setTimeout(() => {
            closeModal(); 
            history.push("/suppliers/suppliers"); 
          }, 500);  
        }
      } catch (error) {
        setOpenMessage("error", "Error al añadir la cuenta bancaria.");
      } finally {
        setIsLoading(false);  
      }
    },
    validationSchema: Yup.object({
      cbu: Yup.string().required("Campo requerido"),
      CBUAlias: Yup.string().required("Campo requerido"),
      cuit: Yup.string().required("Campo requerido"),
      Entidad: Yup.string().required("Campo requerido"),
      status: Yup.number().required("Campo requerido"),
    }),
  });

  useEffect(() => {
    setButtonDisabled(!formik.values.cbu);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit} className="h-100 px-14 py-10">
      <div className="h-100 d-flex flex-column justify-content-between">
        <p className="header-title fs-2 mb-0 mt-4">
          Ingresá los datos de la primera cuenta
        </p>
        <article className="d-flex flex-column align-items-start">
          {/* Input fields */}
          <DataInputContainer
            title="CBU/CVU Alias"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="cbu"
            placeholder="CBU, CVU o alias"
          />
          {/* Additional input fields */}
          <DataInputContainer
            title="Alias"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="CBUAlias"
            placeholder="Alias CBU"
          />
          <DataInputContainer
            title="CUIT"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="cuit"
            placeholder="CUIT"
          />
          <DataInputContainer
            title="Entidad"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="Entidad"
            placeholder="Entidad"
          />
          <DataInputContainer
            title="Estado"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="status"
            placeholder="Estado"
          />
        </article>
        <div className="d-flex justify-content-end mt-5">
          <button
            type="submit"
            disabled={buttonDisabled || isLoading}
            className={clsx("btn mb-8", {
              "btn-disabled": buttonDisabled || isLoading,
            })}
            style={{
              backgroundColor: buttonDisabled || isLoading ? "#ccc" : "#00BFFF", 
              color: "white",
            }}
          >
            {!isLoading && <span className="indicator-label">Enviar</span>}
            {isLoading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Cargando...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBankAccount;

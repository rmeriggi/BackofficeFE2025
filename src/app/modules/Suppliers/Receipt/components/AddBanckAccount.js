import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import DataInputContainer from "./DataInputContainer";
import { addBankAccount } from "../../../../_redux/suppliers/suppliersCrud";
import { useSnackBar } from '../../../../hooks/useSnackBar';

const AddBankAccount = ({ idSupplier, refetchAccounts, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenMessage } = useSnackBar();

  const formik = useFormik({
    initialValues: {
      cbu: "",
      CBUAlias: "",
      cuit: "",
      Entidad: "",
      status: 1,
    },
    validationSchema: Yup.object({
      cbu: Yup.string().required("Campo requerido"),
      CBUAlias: Yup.string().required("Campo requerido"),
      cuit: Yup.string().required("Campo requerido"),
      Entidad: Yup.string().required("Campo requerido"),
      status: Yup.number().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await addBankAccount({
          IdProveedor: idSupplier,  // Asegúrate de que idSupplier esté correcto
          cbu: values.cbu,  // Mapea a CBU
          CBUAlias: values.CBUAlias,
          cuit: values.cuit,
          Entidad: values.Entidad,  // Mapea a entity
          status: values.status,
        });
    
        if (response.status === 200 && response.data) {
          setOpenMessage("success", "Cuenta bancaria añadida correctamente.");
          await refetchAccounts();
          closeModal(); 
        } else {
          throw new Error("Error al añadir la cuenta bancaria.");
        }
      } catch (error) {
        setOpenMessage("error", "Error al añadir la cuenta bancaria.");
      } finally {
        setIsLoading(false);
      }
    }
    
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-100 px-14 py-10">
      <div className="h-100 d-flex flex-column justify-content-between">
        <p className="header-title fs-2 mb-0 mt-4">Ingresá los datos de la cuenta bancaria</p>
        <article className="d-flex flex-column align-items-start">
          <DataInputContainer
            title="CBU/CVU Alias"
            margins="mb-0 w-100"
            errors_position="top-100 start-0"
            formik={formik}
            formik_name="cbu"
            placeholder="CBU, CVU o alias"
          />
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
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className={clsx("btn mb-8", {
              "btn-disabled": isLoading || !formik.isValid || !formik.dirty,
            })}
            style={{
              backgroundColor: isLoading || !formik.isValid || !formik.dirty ? "#ccc" : "#00BFFF", 
              color: "white",
            }}
          >
            {isLoading ? (
              <span className="indicator-progress" style={{ display: "block" }}>
                Cargando...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            ) : (
              "Enviar 1"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBankAccount;

import { Button, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useLoading } from "../../../../hooks/useLoading"
import { withSnackbar } from "../../../../HOCs/withSnackbar"
import paymentMethodArr from "../__mocks__/paymentMethodArr"

function ExternalImputationsPage({setOpenMessage}) {

  const [paymentMethod, setPayemntMethod] = useState("rio")
  const [file, setFile] = useState()
  const {loading, enableLoading, disableLoading} = useLoading(false)

  const onFileChange= (e) => {
    setFile(e.target.files[0])
  }

  const onFileUpload = async() => {
    enableLoading()
    const formData = new FormData();

    formData.append("file",file)
    formData.append("paymentMethod",paymentMethod)
    
    try {
      // uploadFile(formData)
      setOpenMessage("success", "Archivo cargado correctamente")
      disableLoading()
    } catch (error) {
      setOpenMessage("error", "No se pudo cargar el archivo correctamente, intente más tarde")
      disableLoading()
    }
    

  }
  return (
    <div className="d-flex bg-white align-items-center" style={{height : "50px"}}>
      <div className="mx-5" style={{width: "200px"}}>
        <Select
            name="paymentMethod"
            label="Forma de pago"
            fullWidth
            color="secondary"
            value={paymentMethod}
            onChange={(e)=>{
              setPayemntMethod(e.target.value)
            }}
          >
            {paymentMethodArr.map((e)=>(
              <option key={e.id} value={e.value}>
                {e.name}
              </option>
            ))}
          </Select>
      </div>
      <div className="mx-5" style={{width: "300px"}}>
        <input 
          type='file'
          name='file'
          onChange={onFileChange}
        />
      </div>
      <div className="mx-5">
        <Button
          variant="contained"
          color="secondary"
          disabled={loading || !file}
          onClick={onFileUpload}
          // endIcon={
          //   isSubmitting && <CircularProgress size={20} color="secondary"/>  
          //   }
          >
            Enviar
        </Button>
      </div>
    </div>
  )
}

export default withSnackbar(ExternalImputationsPage)
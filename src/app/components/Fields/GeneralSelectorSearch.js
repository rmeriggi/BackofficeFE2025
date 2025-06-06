import React, { useState } from "react";

const GeneralSelectorSearch = ({data, setField, valueName, keyName, error}) => {
  const [validate, setValidate] = useState(false);

  const handleInputChange = (event) => {
    const selectedValue = event.target.value;
    const selectedData = data?.find((e) => e[keyName].trim() === selectedValue.trim());
    if (selectedData) {
      setField(valueName,selectedData.id); 
    } else {
      setField(valueName,0);
    }
  };

  const handleBlur = () => {
    setValidate(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setValidate(true);
    }
  };


  return (
    <div>
      <datalist id={valueName}>
        {data?.map((e, index)=> <option key={index}>{e[keyName]}</option>)}
      </datalist>
      <input
       placeholder="Buscar..."
       className="form-control"
        autoComplete="on"
         list={valueName}
         onBlur={handleBlur}
         onKeyDown={handleKeyDown}
          onChange={handleInputChange}/> 
      {error && validate && <div style={{ color: "red" }}>{error}</div>}
  </div>
  );
};

export default GeneralSelectorSearch;




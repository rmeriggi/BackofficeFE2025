import React from "react";
const InputErrors = ({
    error,
    position,
  }) => {
    return (
      <div className={`input-errors-container ${position}`}>
        <span>{error}</span>
      </div>
    );
  };
  
  export default InputErrors;
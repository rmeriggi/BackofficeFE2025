import React from "react";

export function Checkbox({ isSelected, onChange, children, name}) {
  return (
    <>
      <input type="checkbox" style={{display: "none"}} />
      <label className="checkbox checkbox-lg checkbox-single">
        <input type="checkbox" checked={isSelected} name={name} onChange={onChange}/>
        {children}
        <span className="ml-2"/>
      </label>
    </>
  );
}

import React from "react";

export const TableNoRecordsFoundMessage = ({ entities, message }) => {
  if (message) return <div>{`${message}`}</div>;
  return <div>{`No se han registrado ${entities}`}</div>;
};

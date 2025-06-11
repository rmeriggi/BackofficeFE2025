import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const NewCardButton = () => {
  const history = useHistory();
  return (
    <Button onClick={() => history.push(`/cards/products/create`)}>
      Nuevo Producto
    </Button>
  );
};

export default NewCardButton;

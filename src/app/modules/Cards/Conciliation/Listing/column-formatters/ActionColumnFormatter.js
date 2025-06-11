import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { useHistory } from "react-router-dom";

export function ActionColumnFormatter({ row }) {
  const history = useHistory();

  const handleClick = () => {
    // Navegá a la ruta con el id del row
    history.push(`/cards/conciliation/${row.id}`);
  };

  return (
    <OverlayTrigger overlay={<Tooltip>Ver</Tooltip>}>
      <Button
        onClick={handleClick}
        className="btn btn-icon btn-light btn-m mx-5"
      >
        <span className="svg-icon svg-icon-b svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </Button>
    </OverlayTrigger>
  );
}

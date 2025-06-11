import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function DetailColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditClientPage, openSummary }
) {
  return (
    <div className="d-flex align-items-center">
      <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={() => openEditClientPage(row.id)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger overlay={<Tooltip>Resumen de cuenta</Tooltip>}>
        <Button
          className="btn btn-icon btn-light btn-m ml-2"
          onClick={() => openSummary(row.id)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </div>
  );
}

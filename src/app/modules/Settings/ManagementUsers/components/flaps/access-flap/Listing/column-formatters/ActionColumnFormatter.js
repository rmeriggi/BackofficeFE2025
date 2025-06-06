import React from "react";
import SVG from "react-inlinesvg";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {deletePermission}){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Borrar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={() => deletePermission(row.id, row.idPermission)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
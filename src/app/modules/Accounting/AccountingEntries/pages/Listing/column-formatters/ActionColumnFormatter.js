import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {openDetailsModal}){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Ver detalle</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light  btn-m mx-5"
          onClick={()=> openDetailsModal(row.id)} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
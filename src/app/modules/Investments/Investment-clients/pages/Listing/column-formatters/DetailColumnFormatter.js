import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function DetailColumnFormatter(cellContent,row, rowIndex, {openEditClientPage, openInvestment}){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Editar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mx-1"
          onClick={()=> openEditClientPage(row.id)} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip >Inversiones</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mx-1"
          onClick={()=> openInvestment(row.id)} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-pie.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, { openEdit, deleteBalanceItau }){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Editar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mr-3"
          onClick={()=> {
            openEdit(row)
          }} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Design/Edit.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip>Eliminar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={()=> {
            deleteBalanceItau(row.id)
          }} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Home/Trash.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
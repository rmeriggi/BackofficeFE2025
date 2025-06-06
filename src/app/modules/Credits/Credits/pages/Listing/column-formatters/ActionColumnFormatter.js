/* eslint-disable eqeqeq */
import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {openCredit, openModalConfirm, selectStatus}){


  if(row.status.trim() == "Autorizado") return (
    <> 
      <select
        className="form-control col-6"
        name="subheader.width"
        value={selectStatus}
        onChange={(e) => openModalConfirm(e, row.id)}
      >
        <option value="1">Ver</option>               
        <option value="4">Aceptar</option>
        <option value="5">Rechazar</option>
      </select>
      <OverlayTrigger
      overlay={<Tooltip >Ver crédito</Tooltip>}
    >
      <Button
        className="btn btn-icon btn-light btn-m mx-1 col-3"
        onClick={()=> openCredit(row.id, row.originalId)} 
      >
        <span className="svg-icon svg-icon-b svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
          />
        </span>
      </Button>
    </OverlayTrigger> 
    </>
   
  )
  

  return ( 
    <OverlayTrigger
      overlay={<Tooltip >Ver crédito</Tooltip>}
    >
      <Button
        className="btn btn-icon btn-light  btn-m mx-5"
        onClick={()=> openCredit(row.id, row.originalId)} 
      >
        <span className="svg-icon svg-icon-b svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
          />
        </span>
      </Button>
    </OverlayTrigger>    
  )
};
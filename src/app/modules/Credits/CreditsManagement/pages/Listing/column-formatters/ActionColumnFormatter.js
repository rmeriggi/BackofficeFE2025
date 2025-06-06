/* eslint-disable eqeqeq */
import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {openCredit}){


  if(row.status.trim() == "Autorizado") return (
      <>
        <select
               className="form-control"
               name="subheader.width"
               
           >
               <option value="fluid">Ver</option>               
               <option value="fluid">Aceptar</option>
               <option value="fixed">Rechazar</option>
           </select>
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
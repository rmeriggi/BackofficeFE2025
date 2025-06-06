import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, { setActionModal, openActionModal }){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Autorizar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={()=> {
            setActionModal("authorize")
            openActionModal(row.id)
          }} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Code/Done-circle.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip >Rechazar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m ml-2"
          onClick={()=> {
            setActionModal("reject")
            openActionModal(row.id)
          }} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
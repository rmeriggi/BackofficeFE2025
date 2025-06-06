import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, { openModal, setDataModal }){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Ver comprobante</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
          onClick={()=> {
            setDataModal(row)
            openModal()
          }} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
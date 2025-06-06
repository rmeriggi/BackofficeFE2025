import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../../_metronic/_helpers"

export function ActionColumnFormatter(cellContent,row, rowIndex, {tooltip = 'Editar', fnAction, icon}){
  const iconRoute = icon ? icon : 'Communication/Write.svg'
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mx-5"
          onClick={() => fnAction(row)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl(`/media/svg/icons/${iconRoute}`)}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
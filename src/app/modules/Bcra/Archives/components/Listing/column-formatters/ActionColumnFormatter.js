import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row){

  return (
      <OverlayTrigger
        overlay={<Tooltip >Descargar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m"
        >
          <a href={row.action} target="_blank" rel="noopener noreferrer" download>
            <span className="svg-icon svg-icon-b svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Files/Download.svg")}
              />
            </span>
          </a>
        </Button>
      </OverlayTrigger>
)};
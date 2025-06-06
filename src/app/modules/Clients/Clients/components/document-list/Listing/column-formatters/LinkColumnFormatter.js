/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../../_metronic/_helpers";

export function LinkColumnFormatter(cellContent,row, rowIndex, ){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Ver Documento</Tooltip>}
      >
        <Button
            className="btn btn-icon btn-light btn-m"
        >
          <a target="_blank" href={row.url}>
            <span className="svg-icon svg-icon-b svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
              />
            </span>
          </a>
        </Button>
      </OverlayTrigger>
    </>
)};
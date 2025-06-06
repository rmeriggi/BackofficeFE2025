import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../../_metronic/_helpers";

export function SeeMoreInfoColumnFormatter(cellContent,row, rowIndex, {openModalMoreInfo}){

  return (
      <OverlayTrigger
        overlay={<Tooltip >Ver m&aacute;s info</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light  btn-m mx-5"
          onClick={()=> openModalMoreInfo()} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
)};
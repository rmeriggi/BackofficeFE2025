import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {openCreditDetail, openReasignCredit}){

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip >Ver</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mr-1"
          onClick={()=> openCreditDetail(row.idCredit, row.manager)} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip >Reasignar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light btn-m mt-1"
          onClick={()=> openReasignCredit(row.id)} 
          disabled
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Media/Repeat.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
)};
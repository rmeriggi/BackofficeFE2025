import React from 'react'
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

export default function TaxWhoColumnFormatter(cellContent,row, rowIndex, {deleteWhoData}) {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Borrar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light  btn-m mx-5"
          onClick={() => deleteWhoData(row.id)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
  )
}

import React from "react";
import { Button } from "@material-ui/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function DetailColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openReceipt, openAccusation }
) {
  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Ver</Tooltip>}>
        <Button
          className="btn btn-icon btn-light  btn-m mx-5"
          onClick={() => openReceipt(row.id)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")} />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger overlay={<Tooltip>Imputar</Tooltip>}>
        <Button
          className="btn btn-icon btn-light  btn-m mx-5"
          onClick={() => openAccusation(row.id)}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Files/Folder-thunder.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
  );
}

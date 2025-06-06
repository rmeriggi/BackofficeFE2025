import React from "react";
import {
  ClientStatusCssClasses,
  ClientStatusTitles,
} from "../../ProvidersUIHelpers";
import {toAbsoluteUrl} from "../../../../../../../_metronic/_helpers";

export function CardColumnFormatter(cellContent, row) {

  return (
    <img
      src={toAbsoluteUrl(`/media/cards/card${cellContent}.png`)}
      alt="tarjeta"
      style={{width: "50px"}}
      className="rounded"
    />
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../../../../_metronic/_helpers";

export function ActionColumnFormatter(cellContent,row, rowIndex, {openModal, openCollectionDetail, setIdCredit, setQuotaNumber}){

  return (
  <div style={{width : "85px"}}>
    <OverlayTrigger
      overlay={<Tooltip>Link de pago</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-sm mr-1"
        onClick={()=> {
          openModal(row.id, row.quota)
        }}
      >
        <span className="svg-icon svg-icon-b svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>
    <OverlayTrigger
        overlay={<Tooltip>Detalle de cobranza</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-sm mr-1"
          onClick={()=> {
            openCollectionDetail(row.id)
            setIdCredit(row.idCredit)
            setQuotaNumber(row.quota)
          }}
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Shopping/Price1.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
  </div>
)};
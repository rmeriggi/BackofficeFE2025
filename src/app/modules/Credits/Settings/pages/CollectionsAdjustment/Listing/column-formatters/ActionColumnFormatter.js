import { Button } from '@material-ui/core'
import React from 'react'
import SVG from "react-inlinesvg";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../../../../../_metronic/_helpers'

export const ActionColumnFormatter = (cellContent,row, rowIndex, {condonate, asingLost}) => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Condonar</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light mx-1"
          size='small'
          onClick={()=> condonate(row.quotaid)} 
        >
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Navigation/Up-down.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={<Tooltip >Asignar perdida</Tooltip>}
      >
        <Button
          className="btn btn-icon btn-light mx-1">
          <span className="svg-icon svg-icon-b svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrows-h.svg")}
            />
          </span>
        </Button>
      </OverlayTrigger>
    </>
  )
}

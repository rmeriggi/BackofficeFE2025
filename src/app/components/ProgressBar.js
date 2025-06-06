import React from 'react'
import { formatNumberThousandsSeparator } from '../utils/formatData'

export function ProgressBar({title, progress, color, value}) {
  return (
    <div className="p-3">
      <p className="text-uppercase text-muted" style={{margin: "0", marginTop: "10px"}}>{title}</p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="progress" style={{width: "80%"}}>
          <div className="progress-bar" role="progressbar" style={{width: `${progress}%`, backgroundColor: `${color}`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax={value}></div>
        </div>
        <span className="h4">{formatNumberThousandsSeparator(value)}</span>
      </div>
    </div>
  )
}

import React from 'react'

export default function CollectionsProgressBar({title, progress, color, value}) {
  return (
    <div className="col-12 mt-5">
      <div className="mb-4">
        <span className="text-muted text-uppercase">{title}</span>
        <span className="h5 ml-3">$ {new Intl.NumberFormat("de-DE", {minimumFractionDigits:2}).format(value)}</span>
      </div>
      <div className="progress mb-4" style={{width: "100%"}}>
        <div className="progress-bar" role="progressbar" style={{width: `${progress}%`, backgroundColor: `${color}`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax={value}></div>
      </div>
    </div>
  )
}

import React from 'react'
import { Grid } from '@material-ui/core'

export default function CardInfo({number, title}) {
  return (
    <Grid item xs={6} sm={4} md={2} className="text-center border-left my-3">
      <p className="mt-1" style={{fontSize: "1.35rem"}}>{number}</p>
      <span className="text-muted text-uppercase"> {title}</span>
    </Grid>
  )
}

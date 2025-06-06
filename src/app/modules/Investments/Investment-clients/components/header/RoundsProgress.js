import { LinearProgress } from '@material-ui/core'
import React from 'react'

export const RoundsProgress = ({rounds}) => {

  return (
    <div className='rounded p-3' style={{backgroundColor: "#EBE7E7", width: "400px"}}>
      {rounds.map((r, i) => (
        <div  key={i}>
          <p className='mb-2'>{r.name}</p>
          <div className='mb-5'>
            <LinearProgress 
              variant="determinate" 
              value={r.progress} 
              style={{height: "10px"}} 
              color={i % 2 === 0 ? "primary" : "secondary"}
              aria-valuemax={r.total}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

import React from 'react'

export const CardDescription = ({description}) => {
  return (
    <div className='bg-info p-3 text-center my-1 mx-auto'>
      <span className='text-white text-uppercase'>{description}</span>
    </div>
  )
}

import React from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/_helpers'

export const Avatar = ({image}) => {
  return (
    <div
        className="image-input image-input-outline align-self-center d-flex align-items-center"
        id="kt_profile_avatar"
      >       
      <div className="image-input-wrapper d-flex"> 
        <img src={image ? image : toAbsoluteUrl("/media/misc/avatar.png")} alt="avatar"
          className='h-100 m-auto'
        />
      
      </div>
    </div>
  )
}

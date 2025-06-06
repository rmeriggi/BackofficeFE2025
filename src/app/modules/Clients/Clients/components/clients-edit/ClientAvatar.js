import React from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/_helpers'

export default function ClientAvatar() {
  return (
    <div className="form-group">
    <div className="text-center d-flex flex-column">
      <label className="col-form-label">Imagen</label>
      <div
        className="image-input image-input-outline align-self-center"
        id="kt_profile_avatar"
        style={{
          backgroundImage: `url(${toAbsoluteUrl(
            "/media/users/blank.png"
          )}`,
        }}
      >
        <div
          className="image-input-wrapper"
          //style={{ backgroundImage: `${getUserPic()}` }}
        />
        </div>
    </div>
  </div>
  )
}

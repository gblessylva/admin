import React from 'react'

export default props =>
  props.images.map((image, i) =>
    <div key={i} className='fadein'>
      {/* <div
        onClick={() => props.removeImage(image.public_id)}
        className='delete'
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div> */}
      <img
        src={image.secure_url}
        alt=''
        onError={() => props.onError(image.public_id)}
      />
    </div>
  )
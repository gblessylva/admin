import React from 'react'
import Button from '@material-ui/core/Button';


export default props =>
  <div className='buttons fadein'>

    <div className='button'>
      {/* <label htmlFor='single'>
          <button>Add</button>
      </label> */}

      <input type='file' id='single' onChange={props.onChange} />
    </div>


  </div>
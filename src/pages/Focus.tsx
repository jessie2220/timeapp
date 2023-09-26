//import React from 'react'
import FocusMode from '../components/FocusMode'
import Unauthorised from './Unauthorised'


const Focus = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <FocusMode />}
    </div>
  )
}

export default Focus
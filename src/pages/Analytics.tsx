//import React from 'react'
import AnalyticsDisplay from '../components/AnalyticsDisplay'
import Unauthorised from './Unauthorised'


const Analytics = (props:any) => {
  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <AnalyticsDisplay />}
    </div>
  )
}

export default Analytics
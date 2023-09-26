//import React from 'react'
import TaskList from '../components/TaskList'
import Unauthorised from './Unauthorised'


const Tasks = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <TaskList />}
    </div>
  )
}

export default Tasks
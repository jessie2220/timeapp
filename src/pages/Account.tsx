//import React from 'react'
import AccountDisplay from "../components/AccountDisplay"
import Unauthorised from "./Unauthorised"


const Account = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <AccountDisplay />}

    </div>
  )
}

export default Account
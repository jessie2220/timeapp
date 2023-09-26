//import React from 'react'
import Hero from '../components/Hero'
import MountainPage from '../components/MountainPage'



const Home = (props: any) => {

  return (
    <>
      <div>
        {!props.loggedState ? <Hero setLoggedState={props.setLoggedState} /> : <MountainPage />}
      </div>
    </>
  )
}

export default Home
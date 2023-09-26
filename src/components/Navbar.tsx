import ChakraNavbar from './ChakraNavbar'
import ChakraNavbarLogged from './ChakraNavbarLogged'

const Navbar = (props: any) => {

  return (
    <>
      {!props.loggedState ?

        <ChakraNavbar setLoggedState={props.setLoggedState} />
        :
        <ChakraNavbarLogged setLoggedState={props.setLoggedState} />

      }
    </>
  )
}

export default Navbar
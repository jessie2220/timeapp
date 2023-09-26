import { Container, useColorModeValue } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typed from 'react-typed'

const Unauthorised = () => {
    const navigate = useNavigate()
  
    useEffect(() => {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }, [])
  
    return (
      <div className="p-40 mt-4 rounded-3xl text-black justify-center text-center font-bold h-screen mx-40">
        <Container bg={useColorModeValue("bgLight.100", "bgDark.900")} color={useColorModeValue("bgDark.900", "bgLight.100")} rounded={'3xl'} p={8}>
          <p className='lg:text-4xl text-3xl'>Unauthorised. Please log in. Redirecting</p>
          <Typed className='lg:text-4xl text-2xl font-bold justify-center text-center my-40' strings={['.', '..', '...']} typeSpeed={120} loop />
        </Container>
      </div>
    )
}

export default Unauthorised
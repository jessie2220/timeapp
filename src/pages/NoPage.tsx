import { Container, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

const NoPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        navigate('/')
        setLoading(false)
      }, 3000)
    }, [])
  
    return (
      <div className="p-40 mt-4 rounded-3xl text-black justify-center text-center font-bold h-screen mx-40">
        <Container bg={useColorModeValue("rgba(255,255,255,0.7)", "rgba(0,0,0,0.7)")} color={useColorModeValue("bgDark.900", "bgLight.100")} rounded={'3xl'} p={8}>
          <p className='lg:text-4xl text-3xl'>NO PAGE FOUND :(</p>
          <p className="text-xl mt-20">Redirecting<p className="">{loading ? <ClipLoader color={useColorModeValue("bgDark.900", "bgLight.100")} size={20} /> : ""}</p></p>
        </Container>
      </div>
    )
}

export default NoPage
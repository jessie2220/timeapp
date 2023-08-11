import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
// import Typed from 'react-typed'


export function unAuthRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10)
  }, [])

  return (<div></div>)

  // return (<div className='lg:text-4xl text-2xl font-bold text-[#b78bff] justify-center text-center my-40'>Unauthorised. Please log in. Redirecting
  // <Typed className='lg:text-4xl text-2xl font-bold text-[#b78bff] justify-center text-center my-40' strings={['.', '..', '...']} typeSpeed={120} loop />
  // </div>)

}


export function noPageRedirect() {
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
    <>
      <p className='lg:text-4xl text-3xl font-bold text-[#b78bff] justify-center text-center mt-40'>NO PAGE FOUND :(</p>
      <p className="text-xl font-bold text-black justify-center text-center mt-40 h-screen">Redirecting<p className="">{loading ? <ClipLoader color="#000000" size={20} /> : ""}</p></p>
    </>
  )
}


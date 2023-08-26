//import React, { useEffect } from 'react'
import Typed from 'react-typed'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { isLoggedIn } from '../functions'
import { writeUserData, test } from '../config/config'
import { useNavigate } from 'react-router-dom'

// primary-600
const Button = styled.button`
color: white;
font-size: auto;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
transition:  0.25s;
border-radius: 8px;
width: 200px
`;



export const signOutWithGoogle = async (props: any) => {

    const auth = getAuth()

    signOut(auth).then(() => {
        console.log("signed out")
        sessionStorage.removeItem("displayName")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("uid")
        sessionStorage.removeItem("imageURL")
        sessionStorage.removeItem("taskAmount")
        props.setLoggedState(false)
    }) .catch((error) => {
        console.log(error)
    })

}

export const signInWithGoogle = async (props:any) => {
    
    const auth = getAuth()
    // const navigate = useNavigate()

    setPersistence(auth, browserSessionPersistence).then(() => {
        return(signInWithPopup(auth, new GoogleAuthProvider())
        .then(async response => {
            console.log(response.user.uid)
            console.log(response.user.displayName)
            console.log(response.user.email)

            sessionStorage.setItem("displayName", response.user.displayName || '')
            sessionStorage.setItem("email", response.user.email || '')
            sessionStorage.setItem("uid", response.user.uid || '')
            sessionStorage.setItem("imageURL", response.user.photoURL || '')

            writeUserData(response.user.uid, response.user.displayName as string, response.user.email as string, response.user.photoURL as string)

            // sessionStorage.setItem("taskAmount", await test())
            
            props.setLoggedState(true)
            // navigate('/')
        })
        .catch(error => {
            console.log(error)
        }))
    })
}


const Hero = (props: any) => {

    // const auth = getAuth()
    // const navigate = useNavigate()
    

    // const signInWithGoogle = async () => {
    //         setPersistence(auth, browserSessionPersistence).then(() => {
    //             return(signInWithPopup(auth, new GoogleAuthProvider())
    //             .then(async response => {
    //                 console.log(response.user.uid)
    //                 console.log(response.user.displayName)
    //                 console.log(response.user.email)

    //                 sessionStorage.setItem("displayName", response.user.displayName || '')
    //                 sessionStorage.setItem("email", response.user.email || '')
    //                 sessionStorage.setItem("uid", response.user.uid || '')
    //                 sessionStorage.setItem("imageURL", response.user.photoURL || '')

    //                 writeUserData(response.user.uid, response.user.displayName as string, response.user.email as string, response.user.photoURL as string)

    //                 sessionStorage.setItem("taskAmount", await test())
                    
    //                 props.setLoggedState(true)
    //                 navigate('/')
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             }))
    //         })
    // }


    return (
        <div>
            <div className='mx:auto text-center flex flex-col justify-center text-[#ffffffe1] bg-black bg-opacity-0 pb-[20px]'>
                <p className='text-pink-500 font-bold p-2 md:text-3xl mt-10'>TEST STRING</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]'>string 2 but longer</h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]'>yet another test string</p>
                    <Typed className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,1)]' strings={['Test', 'Best', 'Nest']} typeSpeed={120} backSpeed={140} loop />
                </div>
                <p className='md:text-2xl text-xl font-bold text-[#ff30cb] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>Even more text haebaerolkgnaregl</p>
                <ul className='mt-[20px] font-medium mx-auto'>
                    <li>
                        <Button className='shadow-md bg-gradient-to-r from-green-400 to-primary-500 hover:from-pink-500 hover:to-yellow-500' onClick={() => signInWithGoogle(props)} disabled={isLoggedIn()}>Sign in with Google</Button> 
                    </li>
                </ul>
            </div>
            <div className=' w-full h-80 bg-gradient-to-t from-blue-100 to-white border bg-opacity-50 border-y-gray-200 text-black text-center'>
                    <p className='mt-[120px]'>IMPORTANT TEXT</p>
                </div>

                <div className='w-full h-80 border-b-gray-200 text-black text-center'>
                    <p className='mt-[120px] text-white'>IMPORTANT TEXT 2</p>
                </div>
        </div>
    )
}

export default Hero
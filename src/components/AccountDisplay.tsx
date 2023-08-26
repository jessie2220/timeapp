//import React from 'react'
import { getFirstName, readDisplayName, readEmail, readImageURL } from '../functions'
import styled from 'styled-components'



const Img = styled.img`
border-radius: 50%; 
width: auto;
height: auto;
`




const AccountDisplay = () => {

    return (
        <>
            <div className="text-black bg-white h-screen">
                <div className='text-center'>
                    Hello {getFirstName()}
                </div>
                Account info
                <ul>
                    <li>Name: {readDisplayName()}</li>
                    <li>Email: {readEmail()}</li>
                    <li><Img src={readImageURL()} /></li>
                </ul>
            </div>
        </>
    )
}

export default AccountDisplay
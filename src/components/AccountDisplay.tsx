//import React from 'react'
import { readDisplayName, readEmail } from '../functions'

function getFirstName() {
    let name = readDisplayName()
    const firstName:any = name?.split(" ")

    return (firstName[0])
}

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
                </ul>
            </div>
        </>
    )
}

export default AccountDisplay
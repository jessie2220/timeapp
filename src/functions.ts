//import React from 'react'


export const readDisplayName: () => string | null = () => {

    return (sessionStorage.getItem("displayName"))
}

export function readEmail() {

    return (sessionStorage.getItem("email"))
}

export function readTest() {

    return (sessionStorage.getItem("storageTest"))
}


export function isLoggedIn() {
    let keys = Object.keys(window.sessionStorage)
    // console.log(keys)
    // console.log(sessionStorage.getItem(keys[0]))
    // console.log(typeof(sessionStorage.getItem(keys[0])))

    if (sessionStorage.getItem(keys[0]) == null) {
        return (false)
    } else {
        return (true)
    }
}
//import React from 'react'

export const readDisplayName: () => string | null = () => {

    return (sessionStorage.getItem("displayName"))
}

export function readEmail() {

    return (sessionStorage.getItem("email"))
}

export function readUID() {
    if (sessionStorage.getItem("storageTest") !== null) {
        return (sessionStorage.getItem("storageTest") as string)
    }

}

export function readImageURL(): any {
    return (sessionStorage.getItem("imageURL"))
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
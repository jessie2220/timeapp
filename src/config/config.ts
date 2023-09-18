// export const config = {
//     firebaseConfig: {
//         apiKey: "AIzaSyDh7BsQz-IRqEWuNuD4WEOoynHyP4gwx0o",
//         authDomain: "time-app2.firebaseapp.com",
//         projectId: "time-app2",
//         storageBucket: "time-app2.appspot.com",
//         messagingSenderId: "982446485650",
//         appId: "1:982446485650:web:9c4d5cba032d79c562364b",
//         databaseURL: "https://time-app2-default-rtdb.asia-southeast1.firebasedatabase.app/"
//     }
// }

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyDh7BsQz-IRqEWuNuD4WEOoynHyP4gwx0o",
//     authDomain: "time-app2.firebaseapp.com",
//     projectId: "time-app2",
//     storageBucket: "time-app2.appspot.com",
//     messagingSenderId: "982446485650",
//     appId: "1:982446485650:web:9c4d5cba032d79c562364b",
//     databaseURL: "https://time-app2-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL
}


const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { child, get, getDatabase, onValue, ref, set } from 'firebase/database'


const db = getDatabase()


export function writeUserData(uid: string, name: string, email: string, imageURL: string) {
    const reference = ref(db, 'users/' + uid)
    
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'users/' + uid + "/XPAmount")).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("VALUE OF XP  " + snapshot.val())
            if (snapshot.val() > 0) {
                sessionStorage.setItem("XPAmount", snapshot.val() || '')
            } else {
                sessionStorage.setItem("XPAmount", "0" || '')
            }
        } else {
            console.log("XP HAS NOT BEEN FOUND")
            sessionStorage.setItem("XPAmount", "0" || '')
            set(reference, {
                name: name,
                email: email,
                image: imageURL,
                XPAmount: 0,
            })
        }
    })

}

export function updateXPAmount(uid: string, name: string, email: string, imageURL: string) {
    const totalXP: any = sessionStorage.getItem("XPAmount")
    const updateXPVal = parseInt(totalXP)

    console.log("this is the xp amount on signb out :  " + updateXPVal)

    const reference = ref(db, 'users/' + uid)

    set(reference, {
        name: name,
        email: email,
        image: imageURL,
        XPAmount: updateXPVal,
    })
}


export function getNameFromDatabase(uid: any) {
    const reference = ref(db, 'users/' + uid + '/name')
    let data

    if (reference !== null) {
        onValue(reference, (snapshot) => {
            data = snapshot.val()
            return (data)
        })
    } else {
        console.log("no data")
        return("ekirgh")
    }
}


export function getEmailFromDatabase(uid: any) {
    const reference = ref(db, 'users/' + uid + '/email')
    let data

    onValue(reference, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}


export function getImageFromDatabase(uid: any):string | undefined {
    const reference = ref(db, 'users/' + uid + '/image')
    let data

    onValue(reference, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}

// export function getTaskAmountFromDatabase(uid: any): string {
//     const reference = ref(db, 'users/' + uid + '/taskAmount')
//     var data
//     onValue(reference, (snapshot) => {
//         data = snapshot.val()
//         console.log("should be 0      ", data)
//     })

//     return (data!)

// }
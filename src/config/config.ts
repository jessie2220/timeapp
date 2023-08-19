export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyDh7BsQz-IRqEWuNuD4WEOoynHyP4gwx0o",
        authDomain: "time-app2.firebaseapp.com",
        projectId: "time-app2",
        storageBucket: "time-app2.appspot.com",
        messagingSenderId: "982446485650",
        appId: "1:982446485650:web:9c4d5cba032d79c562364b",
        databaseURL: "https://time-app2-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { getDatabase, onValue, ref, set } from 'firebase/database'


export function writeUserData(uid: string, name: string, email: string, imageURL: string) {
    const db = getDatabase()
    const reference = ref(db, 'users/' + uid)

    set(reference, {
        name: name,
        email: email,
        image: imageURL
    })
}


export function getNameFromDatabase(uid: any) {
    const db = getDatabase()
    const databaseName = ref(db, 'users/' + uid + '/name')
    let data

    if (databaseName !== null) {
        onValue(databaseName, (snapshot) => {
            data = snapshot.val()
            return (data)
        })
    } else {
        console.log("no data")
        return("ekirgh")
    }
}


export function getEmailFromDatabase(uid: any):string | undefined {
    const db = getDatabase()
    const databaseName = ref(db, 'users/' + uid + '/email')
    let data

    onValue(databaseName, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}


export function getImageFromDatabase(uid: any):string | undefined {
    const db = getDatabase()
    const databaseName = ref(db, 'users/' + uid + '/image')
    let data

    onValue(databaseName, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}

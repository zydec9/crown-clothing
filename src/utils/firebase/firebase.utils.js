import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'
import { useContext } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyCytyycgA1zhfcBBoPT4qSglL4cYYZlX6s",
    authDomain: "crown-clothing-db-89fa3.firebaseapp.com",
    projectId: "crown-clothing-db-89fa3",
    storageBucket: "crown-clothing-db-89fa3.appspot.com",
    messagingSenderId: "270980555547",
    appId: "1:270980555547:web:9d8380f380059c54a2a9be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()


// upload the categories from SHOP_DATA to the respective collection in firestore

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd,
    field = 'title'
) => {

    // collection method allows to create a collection reference 
    //(the same way we created a user (document)reference (userDocRef))
    const collectionRef = collection(db, collectionKey)

    // to make sure that ALL the object we want to add to the collection are succefully added
    // and to do that we need to use a batch
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

//retrieve the data

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(docSnapchot => docSnapchot.data())

}


export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation = {}
) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()


        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }

    }
    return userSnapshot
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)

}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    const result =  await signInWithEmailAndPassword(auth, email, password)

    return result
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)


// instead of having a listenner 
//responds every time a user state update (in the app component)
// the code is wrapped in a promise bases function call in firebase utils

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}
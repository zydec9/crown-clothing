import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


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

export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation={}
    ) => {
    if(!userAuth) return 

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
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  
    if(!email || !password)return

   return await createUserWithEmailAndPassword(auth, email, password)

}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)return

    return await signInWithEmailAndPassword(auth, email, password)
}
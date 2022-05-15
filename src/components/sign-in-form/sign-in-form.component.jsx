import { useState, } from "react"
import { useDispatch } from "react-redux"

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'


import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import FormInput from "../form-input/form-input.component"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"


import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import { SignUpContainer, ButtonContainer } from './sign-in-form.styles'



const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = () => {

    const dispatch = useDispatch()

    const [formFields, setFormfields] = useState(defaultFormFields)
    const { email, password } = formFields





    const signInWithGoogle = async () => {

        dispatch(googleSignInStart())

    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormfields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {

            dispatch(emailSignInStart( email, password ))

            setFormfields(defaultFormFields)

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password')
                    break
                case 'auth/user-not-found':
                    alert('User not found')
                    break
                default:
                    console.log(error)
            }
        }

    }


    return (
        <SignUpContainer>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={'Email'}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label={'Password'}
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <ButtonContainer>

                    <Button type='submit'>
                        Sign in
                    </Button>

                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>

                </ButtonContainer>
            </form>
        </SignUpContainer>
    )
}



export default SignInForm
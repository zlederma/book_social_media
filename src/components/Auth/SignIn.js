import React from 'react'
import {
    InputLabel, Input, Typography,
    Button, Card
} from '@mui/material'
import "./SignIn.css"
import { useState, useContext, useRef } from "react"
import { flexbox } from '@mui/system'
import AuthContext from '../../store/auth-context'
import { database } from '../../firebase/firebase-config'
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, inMemoryPersistence, } from "firebase/auth"

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }
const auth = getAuth()
export default function SignIn() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        // optional: Add validation

        setIsLoading(true);
        if (isLogin) {
            signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    console.log(userCredential)
                    setIsLoading(false)
                    // Signed in 
                    // const user = userCredential.user;
                    // console.log(user);
                    // const expirationTime = new Date(
                    //     new Date().getTime() + + userCredential.expiresIn * 1000
                    // );
                    // authCtx.login(userCredential.user.accessToken, expirationTime.toISOString())
                    localStorage.setItem('token', userCredential._tokenResponse.idToken);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
            createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    setIsLoading(false)
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    const expirationTime = new Date(
                        new Date().getTime() + + userCredential.expiresIn * 1000
                    );
                    authCtx.login(userCredential._tokenResponse.idToken, expirationTime.toISOString())
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }

    };




    return (
        <Card elevation={3} style={{ maxWidth: "400px", margin: "auto", backgroundColor: "#f7f3f1", padding: "10px" }}>
            <Typography variant="h4"
                sx={{ mb: 1 }}
                style={{ textAlign: "center" }}>
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Typography>
            <form onSubmit={submitHandler}>
                <div>
                    <InputLabel htmlFor="email" aria-describedby="my-helper-text"> Email</InputLabel>
                    <Input
                        className="auth-input"
                        sx={{ mb: 3 }}
                        id="email"
                        inputRef={emailInputRef}
                        fullWidth={true}
                        disableUnderline={true}
                        focused={true} />
                </div>
                <div>
                    <InputLabel htmlFor="password"> Password</InputLabel>
                    <Input className="auth-input"
                        id="password"
                        inputRef={passwordInputRef} aria-describedby="m-helper-text"
                        fullWidth={true}
                        disableUnderline={true}
                        required />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit'
                        variant="contained"
                        color="secondary"
                        disableRipple sx={{ mt: 3 }}>
                        {isLogin ? 'Submit' : 'Create Account'}
                    </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="text"
                        color="secondary"
                        onClick={switchAuthModeHandler}
                        disableRipple sx={{ mt: 3 }}>
                        {isLogin ? 'Create New Account' : 'Login with existing account'} </Button>
                </div>
            </form>
        </Card>
    )
}

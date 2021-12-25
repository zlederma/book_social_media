import React from 'react'
import {
    InputLabel, Input, Typography,
    Button, Card
} from '@mui/material'

import { Link } from '@mui/material'
import "./SignIn.css"
import { useState, useRef, useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, inMemoryPersistence, browserLocalPersistence } from "firebase/auth"

import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInActions } from "../../store/auth";

const auth = getAuth()

export default function SignInBox() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

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
            setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            })
                .then((userCredential) => {
                    console.log(userCredential)
                    // localStorage.setItem('token', userCredential._tokenResponse.idToken);
                    setIsLoading(false)
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
            createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    localStorage.setItem('token', userCredential._tokenResponse.idToken);
                    setIsLoading(false)
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }

    };

    const [test, setTest] = useState("initial");
    useEffect(() => {
        console.log('Running App useEffect...');
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setTest(user.uid)
                console.log('onAuthstateworking')
                dispatch(isLoggedInActions.setIsLoggedIn(true))
                console.log(isLoggedIn)
                // ...
            } else {
                console.log("out")
                dispatch(isLoggedInActions.setIsLoggedIn(false))
                console.log(isLoggedIn)
                // User is signed out
                // ...
            }
        });
    }, []);


    return (
        <Card elevation={3} style={{ width: "400px", maxWidth: "400px", backgroundColor: "#f7f3f1", padding: "10px", margin: "10px" }}>
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
                        type="password"
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

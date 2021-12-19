import React from 'react'
import {
    InputLabel, Input, Typography,
    Button, Card
} from '@mui/material'
import "./SignIn.css"
import { useState, useContext, useRef } from "react"
import { flexbox } from '@mui/system'
import AuthContext from '../../store/auth-context'


export default function SignIn() {
    const [isFocused, setIsFocused] = useState(false)
    const inputClickHandler = () => {
        setIsFocused(true)
    }

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((previousState) => !previousState);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*',)
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',

        setIsLoading(true);

        let url;
        const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY

        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/
        accounts:signUp?key=${FIREBASE_API_KEY}`
        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: headers,
            // headers: {
            //     // 'Access-Control-Allow-Origin': '*',
            //     // 'Content-Type': 'application/json',
            // },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        console.log(data)
                        console.log(enteredEmail)
                        let errorMessage = 'Authentication Failed';
                        throw new Error(errorMessage);
                    })
                }
            })
            .then((data) => {
                //expiration time
                authCtx.login(data.idToken);
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <Card elevation={3} style={{ maxWidth: "400px", margin: "auto", backgroundColor: "#f7f3f1", padding: "10px" }}>
            <Typography variant="h4" sx={{ mb: 1 }} style={{ textAlign: "center" }}> {isLogin ? 'Sign In' : 'Sign Up'} </Typography>
            <form onSubmit={submitHandler}>
                <div>
                    <InputLabel htmlFor="email" aria-describedby="my-helper-text"> Email</InputLabel>
                    <Input className="auth-input" sx={{ mb: 3 }} id="email" inputRef={emailInputRef} fullWidth={true} disableUnderline={true} onClick={inputClickHandler} focused={true} />
                </div>
                <div>
                    <InputLabel htmlFor="password"> Password</InputLabel>
                    <Input className="auth-input" id="password" inputRef={passwordInputRef} aria-describedby="m-helper-text" fullWidth={true} disableUnderline={true} required />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type='submit' variant="contained" color="secondary" disableRipple sx={{ mt: 3 }}> {isLogin ? 'Submit' : 'Create Account'} </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="secondary" onClick={switchAuthModeHandler} disableRipple sx={{ mt: 3 }}> {isLogin ? 'Create New Account' : 'Login with existing account'} </Button>
                </div>
            </form>
        </Card>
    )
}

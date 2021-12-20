import React from 'react'
import {
    InputLabel, Input, Typography,
    Button, Card
} from '@mui/material'
import "./SignIn.css"
import { useState, useContext, useRef } from "react"
import { flexbox } from '@mui/system'
import AuthContext from '../../store/auth-context'
import { getAuth } from "firebase/auth"
import { database } from '../../firebase/firebase-config'
import { getDatabase, ref, set } from 'firebase/database';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const auth = getAuth()

// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

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
        let url;
        if (isLogin) {
            url =
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        } else {
            url =
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    console.log(res);
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        console.log(data)
                        let errorMessage = 'Authentication failed!';
                        // if (data && data.error && data.error.message) {
                        //   errorMessage = data.error.message;
                        // }

                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                authCtx.login(data.idToken)
            })
            .catch((err) => {
                alert(err.message);
            });

    };

    const handler = () => {
        const user = auth.currentUser;
        console.log(user);

    }



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
            <button onClick={handler}> click me </button>
        </Card>
    )
}

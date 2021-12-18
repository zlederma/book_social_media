import React from 'react'
import {
    InputLabel, Input, Typography,
    Button, Card
} from '@mui/material'
import "./SignIn.css"
import { useState } from "react"
import { flexbox } from '@mui/system'


export default function SignIn() {
    const [isFocused, setIsFocused] = useState(false)
    const inputClickHandler = () => {
        setIsFocused(true)
    }
    return (
        <Card elevation={3} style={{ maxWidth: "400px", margin: "auto", backgroundColor: "#f7f3f1", padding: "10px" }}>
            <Typography variant="h4" sx={{ mb: 1 }} style={{ textAlign: "center" }}>Sign In</Typography>
            <form>
                <div>
                    <InputLabel htmlFor="email" aria-describedby="my-helper-text"> Email</InputLabel>
                    <Input className="auth-input" sx={{ mb: 3 }} id="email" fullWidth={true} disableUnderline={true} onClick={inputClickHandler} focused={true} />
                </div>
                <div>
                    <InputLabel htmlFor="password"> Password</InputLabel>
                    <Input className="auth-input" id="password" aria-describedby="m-helper-text" fullWidth={true} disableUnderline={true} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="secondary" disableRipple sx={{ mt: 3 }}> Submit </Button>
                </div>
            </form>
        </Card>
    )
}

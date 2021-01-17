import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './auth.css'

import axios from 'axios';

function Login(){

    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [errorText, setErrorText] = useState("");

    const history = useHistory();

    const login = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            data: {
                username: loginUser,
                password: loginPass
            },
            withCredentials: true,
            url: "/login"
        }).then((res) => {
            console.log(res.data);
            history.push("/timer");
        }).catch(err => {
            if(err.response.status === 409){
                setLoginPass("");
                setErrorText("Username or password is incorrect");
            }
        });
    };

    return (
        <div className="Login">
            <h1 className="title">C U B E X</h1>
            <img className="authLogo" src={"logo.png"} alt="logo"/>
            <form className="Inputs" onSubmit={login}>
                <h1>Login</h1>
                <input placeholder="username" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
                <input type="password" placeholder="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                <input type="checkbox" id="rmbmebox" /> 
                <label htmlFor="rmbmebox">Remember Me</label><br/>
                <button type="submit">Go!</button>
                <Link to='/register' className="registerLink">Create an account</Link>
                <p>{errorText}</p>
            </form>
        </div>
    );
}

export default Login;

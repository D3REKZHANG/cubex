import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './auth.css'

import axios from 'axios';

function Login(){

    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const login = () => {
        axios({
            method: "POST",
            data: {
                username: loginUser,
                password: loginPass
            },
            withCredentials: true,
            url: "http://localhost:5000/login"
        }).then((res) => console.log(res));
    };

    return (
        <div className="Login">
            <h1 className="title">C U B E X</h1>
            <img className="authLogo" src={"logo.png"} />
            <div className="Inputs">
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUser(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setLoginPass(e.target.value)} />
                <input type="checkbox" id="rmbmebox" /> 
                <label for="rmbmebox">Remember Me</label><br/>
                <Link to='/'><button onClick={login}>Go!</button></Link>
                <Link to='/register' className="registerLink">Create an account</Link>
            </div>
        </div>
    );
}

export default Login;
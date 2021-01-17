import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './register.css';

import axios from 'axios';

function Register(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errorText, setErrorText] = useState("");

    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        if(registerPass !== confirmPass){
            setErrorText("passwords do not match");
            setRegisterPass("");
            setConfirmPass("");
        }else{
            axios({
                method: "post",
                data: {
                    email: registerEmail,
                    username: registerUser,
                    password: registerPass
                },
                withCredentials: true,
                url: "/register"
            }).then((res) => history.push("/login")).catch(err => {
                if (err.response.status === 409) {
                    setRegisterUser("");
                    setRegisterPass("");
                    setConfirmPass("");
                    setErrorText("Username already taken");
                }
            });
        }
    };

    return (
        <div className="Register" onSubmit={register}>
            <h1> Register </h1>
            <form className="Inputs">
                <input placeholder="email" value={registerEmail} onChange={e=>setRegisterEmail(e.target.value)} />
                <input placeholder="username" value={registerUser} onChange={e => setRegisterUser(e.target.value)} />
                <input type="password" value={registerPass} placeholder="password" onChange={e => setRegisterPass(e.target.value)} />
                <input type="password" value={confirmPass} placeholder="confirm password" onChange={e => setConfirmPass(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <Link className="loginLink" to="/login">Already have an account?</Link>
            <p className="error">{errorText}</p>
        </div>
    );
}

export default Register;

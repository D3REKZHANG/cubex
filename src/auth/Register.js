import React, {useState, useEffect} from 'react';
import './Register.css';

import axios from 'axios';

function Register(){

    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass] = useState("");

    const register = () => {
        axios({
            method: "post",
            data: {
                username: registerUser,
                password: registerPass
            },
            withCredentials: true,
            url: "http://localhost:5000/register"
        }).then((res) => console.log(res));
    };

    return (
        <div className="Register">
            <h1> Register </h1>
            <input placeholder="username" onChange={e => setRegisterUser(e.target.value)} />
            <input placeholder="password" onChange={e => setRegisterPass(e.target.value)} />
            <button onClick={register}>Submit</button>
        </div>
    );
}

export default Register;

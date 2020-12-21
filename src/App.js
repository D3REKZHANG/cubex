import React, {useState, useEffect} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Main from "./main-screen/Main";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
     
    return ( 
        <Router>
            <Route path="/" exact component={Main}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
        </Router>
    );
}
export default App;

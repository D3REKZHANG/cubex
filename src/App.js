import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Main from "./main-screen/Main";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
   
    return ( 
        <Router>
            <Route path="/" exact render={() => {
                return (
                    <Redirect to="/login" />
                )
            }}/>
            <Route path="/timer" exact render={(props)=>(<Main {...props} isGuest={false}/>)}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/guest" exact render={(props)=>(<Main {...props} isGuest={true}/>)}/>
        </Router>
    );
}
export default App;

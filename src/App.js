import React, {useState, useEffect} from 'react';
import './App.css';

import Timer from "./Timer"
import Button from "./Button"

function App() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    }

    const start = () => {
        setStartTime(new Date().getTime());
        setIsActive(true);
    }

    const reset = () => {
        setTime(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if(isActive){
            interval = setInterval(() => {
                const now = new Date().getTime();
                setTime((now-startTime)/1000);
            }, 10);
        }else{
            clearInterval(interval);    
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <div className="App">
            <p> Cubex </p>
            <Timer time = {isActive? time.toFixed(1) : time.toFixed(2)}/>
            <button onClick={isActive? toggle : start}>{isActive ? "Stop" : "Start"}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default App;

import React, {useState, useEffect} from 'react';
import './App.css';

import EntryList from "./EntryList"
import {ReactComponent as Logo } from './logo.svg';

function App() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        return () => {
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
        }
    }, [isActive, time]);

    const keyDown = (event) => {
        if(event.key === ' '){
            if(!isActive){
                setTime(0);
            }
        }
    }

    const keyUp = (event) => {
        if(event.key === ' '){
            if(isActive){
                setData([...data, time]);
                setIsActive(false);
            }else{
                setStartTime(new Date().getTime());
                setTime(0);
                setIsActive(true);
            }
        }
    }

    // timing 
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
            <div className="sidebar">
                <img src={"./logo.png"} />
                <p id="title">C U B E X</p>
                <EntryList className="EntryList" data = {data}/>
                <p className="option">Export</p>
                <p className="option">Settings</p>
                <p className="option">Sign Out</p>
            </div>
            <div className="main">
                <h1 className="time">{isActive? time.toFixed(1) : time.toFixed(2)}</h1>
            </div>
        </div>
    );
}

export default App;

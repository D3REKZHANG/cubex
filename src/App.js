import React, {useState, useEffect} from 'react';
import './App.css';

import EntryList from "./EntryList"
import Scramble from "./Scramble"

import {ReactComponent as Logo } from './logo.svg';

import axios from "axios";

function App() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);
    const [scram, setScram] = useState(false);
    const [data, setData] = useState([]);
    const [test, setTest] = useState('b');
    
    useEffect(() => {
        axios.get("/a").then(response => {
            setTest(response.data);
        });
    }, [])

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
                setData([time,...data]);
                setIsActive(false);
                setScram(!scram);
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
                <EntryList data = {data}/>
                <ul className="options">
                    <li>Export</li>
                    <li>Settings</li>
                    <li>Sign Out</li>
                </ul>
            </div>
            <div className="main">
                <Scramble scram={scram}/>
                <p className="time">{isActive? time.toFixed(1) : time.toFixed(2)}</p>
                <div className="averages">
                    <p>ao5: N/A</p>
                    <p>ao12: N/A</p>
                </div>
            </div>
        </div>
    );
}

export default App;

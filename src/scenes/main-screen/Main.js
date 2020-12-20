import React, {useState, useEffect} from 'react';
import './Main.css';

import EntryList from "./EntryList"
import Scramble from "./Scramble"

import axios from "axios";

function Main() {
     
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);
    const [scram, setScram] = useState(false);
    const [data, setData] = useState([]);
    const [ao5, setAo5] = useState("NA");
    const [ao12, setAo12] = useState("NA");
    const [test, setTest] = useState('b');
    
    useEffect(() => {
        axios.get("/a").then(response => {
            setTest(response.data);
        });
    }, [])

    useEffect(() => {
        // timing 
        let interval = null;
        if(isActive){
            interval = setInterval(() => {
                const now = new Date().getTime();
                setTime((now-startTime)/1000);
            }, 10);
        }else{
            clearInterval(interval);    
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        return () => {
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
            clearInterval(interval);
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
                updateAvg(time);
            }else{
                setStartTime(new Date().getTime());
                setTime(0);
                setIsActive(true);
            }
        }
    }

    const updateAvg = ()=>{
        if(data.length < 4){
            setAo5("NA");
        }else{
            var sum=time;
            for(var x=0;x<4;x++){
                sum += data[x];    
            }
            setAo5(sum/5);
            console.log(data);
        }

        if(data.length < 11){
            setAo12("NA");
            for(var x=4;x<11;x++){
                sum+=data[x];    
            }
        }else{
            setAo12(sum/12);
        }        
    }

    return (
        <div className="Main">
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
                    <p>ao5: {(data.length < 5)? "NA" : parseFloat(ao5).toFixed(2)}</p>
                    <p>ao12: {(data.length < 12)? "NA" : parseFloat(ao12).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default Main;

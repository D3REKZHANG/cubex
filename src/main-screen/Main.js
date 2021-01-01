import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Main.css';

import EntryList from "./EntryList"
import Scramble from "./Scramble"

import axios from "axios";

function Main() {
     
    const [currentUser, setCurrentUser] = useState("None");
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);
    const [scram, setScram] = useState(false);
    const [data, setData] = useState([]);
    const [ao5, setAo5] = useState("NA");
    const [ao12, setAo12] = useState("NA");

    const history = useHistory();
    
    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/user",
        }).then((res)=>{
            setCurrentUser(res.data.username);
            setData(res.data.timeData)
            console.log(res.data);
        });
    }, [])

    useEffect(() => {
        console.log("data effect");
        if(data.length > 0){
            updateAvg();
        }
    }, [data]);

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
                setIsActive(false);
                setScram(!scram);
                axios({
                    method: "POST",
                    data: {
                        username: currentUser,
                        timeData: [
                            {
                                "time": time,
                                "scramble": scram,
                                "session": "1"
                            },
                            ...data
                        ]
                    },
                    withCredentials: true,
                    url: "/update"
                });
                setData([
                    {
                        "time": time,
                        "scramble": scram,
                        "session": "1",
                        "id": data.length+1
                    },
                    ...data]);
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
            var sum=0;
            for(var x=0;x<5;x++){
                sum += data[x]["time"];    
            }
            setAo5(sum/5);
        }
        if(data.length < 12){
            setAo12("NA");
            for(var x=5;x<12;x++){
                sum+=data[x]["time"];    
            }
        }else{
            setAo12(sum/12);
        }        
    }

    const deleteTime = (index) => {
        setData(data.slice(0, index).concat(data.slice(index+1)));
    }

    const tformat = (isActive, time) => {
        var rounding = isActive? 1 : 2;
        if(time >= 60) {
            var m = Math.floor(time/60);
            var s = time-60*m;
            if(s < 10) {
                console.log(`${m}:0${s.toFixed(rounding)}`);
                return `${m}:0${s.toFixed(rounding)}`;
            }
            else {
                console.log(`${m}:${s.toFixed(rounding)}`);
                return `${m}:${s.toFixed(rounding)}`; 
            }
        }
        return time.toFixed(rounding);
    }

    const signout = () =>{
        axios({
            method: "GET",
            url: "/logout"
        }).then(res => {
            console.log(res.data);
        });
        
        history.push("/login"); 
    };

    return (
        <div className="Main">
            <div className="sidebar">
                <img src={"logo.png"} alt="logo"/>
                <p id="title">C U B E X</p>
                <EntryList data = {data} deleteTime={deleteTime}/>
                <div className="options">
                    <button>Settings</button>
                    <button onClick={signout}>Sign Out</button>
                </div>
            </div>
            <div className="main">
                <Scramble scram={scram}/>
                <p className="time">{tformat(isActive, time)}</p>
                <div className="averages">
                    <p>ao5: {(data.length < 5)? "NA" : parseFloat(ao5).toFixed(2)}</p>
                    <p>ao12: {(data.length < 12)? "NA" : parseFloat(ao12).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default Main;

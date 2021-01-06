import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import './Main.css';

import min2phase from '../min2phase.js';

import EntryList from "./EntryList"
import Scramble from "./Scramble"

import axios from "axios";

function Main() {
     
    const [currentUser, setCurrentUser] = useState("None");
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [isActive, setIsActive] = useState(false);
    const [scram, setScram] = useState("NA");
    const [session, setSession] = useState("NA");
    const [data, setData] = useState([]);
    const [ao5, setAo5] = useState("NA");
    const [ao12, setAo12] = useState("NA");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(-1);

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
        
        min2phase.initFull();
        setScram(min2phase.solve(min2phase.randomCube()));
    }, [])

    // Update Average on data change
    useEffect(() => {
        if(data.length > 0){
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
                for(x=5;x<12;x++){
                    sum+=data[x]["time"];    
                }
            }else{
                setAo12(sum/12);
            }        
        }
    }, [data]);

    const keyDown = (event) => {
        if(event.key === ' '){
            event.preventDefault();
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
                setScram(min2phase.solve(min2phase.randomCube()));
            }else{
                setStartTime(new Date().getTime());
                setTime(0);
                setIsActive(true);
            }
        }
    }

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
    }, [isActive, time, keyUp, keyDown]);

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

    const focusTime = (index) => {
        setSelectedTime(index) 
    }

    return (
        <div className="Main">
            <div className="sidebar">
                <img src={"logo.png"} alt="logo"/>
                <p id="title">C U B E X</p>
                <EntryList data = {data} setSelectedTime={setSelectedTime} setModal={setModalOpen} tformat={tformat}/>
                <div className="options">
                    <button>Settings</button>
                    <button onClick={signout}>Sign Out</button>
                </div>
            </div>
            <div className="main">
                <p className="Scramble"> {scram}</p>
                <p className="time">{tformat(isActive, time)}</p>
                <div className="averages">
                    <p>ao5: {(data.length < 5)? "NA" : tformat(false, parseFloat(ao5))}</p>
                    <p>ao12: {(data.length < 12)? "NA" : tformat(false, parseFloat(ao12))}</p>
                </div>
            </div>
            <Modal 
                isOpen={modalOpen} ariaHideApp={false}
                className="Modal" overlayClassName="Overlay" 
            >
                <h1> {(selectedTime != -1)?data[selectedTime]["time"]:"yert"} </h1>
                <p> {(selectedTime != -1)?data[selectedTime]["scramble"]:"yert"} </p>
                <button onClick={()=>{setModalOpen(false);setSelectedTime(-1)}}>Close</button>
            </Modal>
        </div>
    );
}

export default Main;

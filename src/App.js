import React, {useState} from 'react';
import './App.css';

import Timer from "./Timer"
import Button from "./Button"

function App() {
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState(0);
  const [interv, setInterv] = useState();

  const start = () => {
    run();
    setMode(1);
    setInterv(setInterval(run, 10));
  };

  const stop = () => {
    setMode(2);
    setInterv();
  }

  const run = () => {
    setTime(prevTime => prevTime+1);
  }

  return (
    <div className="App">
      <p> Cubex Yeet </p>
      <Timer time = {time}/>
      <Button mode = {mode} start = {start} stop = {stop}/>
    </div>
  );
}

export default App;

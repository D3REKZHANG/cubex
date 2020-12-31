import React, { useState,useEffect } from 'react';

import min2phase from '../min2phase.js';

function Scramble(props) {

    const [ scramble, setScramble ] = useState("yeet");

    const generateScramble = () => {
        return min2phase.solve(min2phase.randomCube()); 
    }

    useEffect(()=>{
        setScramble(generateScramble());
    }, [props.scram]);

    useEffect(()=>{
        min2phase.initFull();
    }, []);

    return (
        <div className="Scramble">
            <p>{scramble}</p>
        </div>
    );
}

export default Scramble;

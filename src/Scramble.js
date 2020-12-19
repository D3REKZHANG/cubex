import React, { useState,useEffect } from 'react';

function Scramble(props) {

    const [ scramble, setScramble ] = useState("yeet");

    const generate = () => {
        const full = [
            ["R","R'","R2"],
            ["U", "U'","U2"],
            ["D", "D'", "D2"],
            ["B","B'","B2"],
            ["L","L'", "L2"]
        ];

        var scram = [];
        for(var i=0;i<20;i++){
            var pool = [].concat.apply([], full);
            if(i!=0){
                pool = [];
                for(var x=0;x<5;x++){
                    if(!full[x].includes(scram[i-1])){
                        pool = pool.concat(full[x]);
                    }
                }
            }
            scram.push(pool[Math.floor(Math.random() * pool.length)]);
        }
        return scram.join(" ");
    }

    useEffect(()=>{
        setScramble(generate());
    }, [props.scram]);

    return (
        <div className="Scramble">
            <p>{scramble}</p>
        </div>
    );
}

export default Scramble;

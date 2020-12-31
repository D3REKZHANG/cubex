import React, {useState} from 'react';

function EntryList(props) {

    return (
        <div className="EntryList">
            <p> Session 1</p>
            <ol>
            {props.data.map((entry, index)=>{
                return <li key={index} onClick={()=>props.deleteTime(index)}> {entry["time"].toFixed(2)}</li>;
            })}
            </ol>
        </div>
    );
}

export default EntryList;

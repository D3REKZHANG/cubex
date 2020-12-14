import React, {useState} from 'react';

function EntryList(props) {
    return (
        <div className="EntryList">
            <p style={{fontSize: "6px", marginBottom: "3px"}}>Session 1</p>
            {props.data.map((entry)=>{
                return <p> {entry.toFixed(2)}</p>;
            })}
        </div>
    );
}

export default EntryList;

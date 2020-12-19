import React, {useState} from 'react';

function EntryList(props) {
    return (
        <div className="EntryList">
            <p> Session 1</p>
            <ol>
            {props.data.map((entry)=>{
                return <li> {entry.toFixed(2)}</li>;
            })}
            </ol>
        </div>
    );
}

export default EntryList;

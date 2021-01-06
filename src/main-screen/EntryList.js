import React from 'react';

function EntryList(props) {

    return (
        <div className="EntryList">
            <p> Session 1</p>
            <ol>
                {props.data.map((entry, index)=>{
                    return <li key={index} onClick={()=>{
                        props.setSelectedTime(index);
                        props.setModal(true);
                    }}> {props.tformat(false, entry["time"])}</li>;
            })}
            </ol>
        </div>
    );
}

export default EntryList;

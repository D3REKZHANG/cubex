import React from 'react';

function Timer(props) {
  return (
    <div>
    	<h1 className="time">{props.isActive? props.time.toFixed(1) : props.time.toFixed(2)}</h1>
    </div>
  );
}

export default Timer;

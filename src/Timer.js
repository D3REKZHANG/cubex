import React from 'react';

function Timer(props) {
  return (
    <div>
    	<span>{(props.time >= 1) ? props.time : "0"}</span>
    </div>
  );
}

export default Timer;
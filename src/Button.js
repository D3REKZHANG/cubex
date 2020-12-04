import React, {useState} from 'react';

function Component(props) {
  return (
  	<div>
  		{(props.mode===0)?
	    	<button className="stopwatch-btn stopwatch-btn-gre"
	        onClick={props.start}>Start</button> : ""
    	}
    	{(props.mode===1)?
	    	<button className="stopwatch-btn stopwatch-btn-gre"
	        onClick={props.stop}>Stop</button> : ""
    	}
    </div>
  );
}

export default Component;
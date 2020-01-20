import React from 'react';

import Trace from '../Trace/Trace';

const GetResponse = ({ getKey, value, trace }) => {
  console.log("gr key", getKey)
  console.log("gr value", value)
  console.log("gr trace", trace)
  return (
    <div>
      <span><p>Key: {getKey}</p><p>Value: {value}</p></span>
      {trace.map((traceEntry, index) => {
        return (
          <Trace key={traceEntry.addr + index} traceEntry={traceEntry} />
        );
      })}
    </div>
  )
}

export default GetResponse
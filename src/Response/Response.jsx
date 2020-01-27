import React from 'react'

import Trace from '../Trace/Trace'

const Response = ({
  getKey, value, trace, handleShowGetTrace,
}) =>
  // console.log("gr key", getKey)
  // console.log("gr value", value)
  // console.log("gr trace", trace)
  (
    <div>
      <span>
        <p>
          Key:
          {getKey}
        </p>
        <p>
          Value:
          {value}
        </p>
      </span>
      {trace.map((traceEntry, index) => (
        <Trace key={traceEntry.addr} traceEntry={traceEntry} />
      ))}
      <button onClick={handleShowGetTrace}>Close</button>
    </div>
  )


export default Response

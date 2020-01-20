import React from 'react';

const Trace = ({ traceEntry }) => {
  return (
    <table style={{ border: "1px solid black", margin: "5px" }}>
      <tr><td>Node: {traceEntry.addr}</td></tr>
      <tr><td>Function: {traceEntry.functionCall}</td></tr>
      <tr><td>Duration: {traceEntry.duration}</td></tr>
    </table >
  );
}

export default Trace;
import React from 'react'

const Trace = ({ traceEntry }) => (
  <table style={{ border: '1px solid black', margin: '5px' }}>
    <tbody>
      <tr>
        <td>
          Node:
          {traceEntry.addr}
        </td>
      </tr>
      <tr>
        <td>
          Function:
          {traceEntry.functionCall}
        </td>
      </tr>
      <tr>
        <td>
          Duration:
          {traceEntry.duration}
        </td>
      </tr>
    </tbody>
  </table>
)

export default Trace

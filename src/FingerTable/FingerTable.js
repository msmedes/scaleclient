import React from 'react';

const FingerTable = ({ fingerTable }) => {
  let uniqueEntries = []
  let prevEntry = ''
  for (let i = 0; i < fingerTable.length; i++) {
    let start = 0
    let end = 0
    if (fingerTable[i] != prevEntry) {
      start = i
      end = i
      const currEntry = { addr: fingerTable[i], start: start, end: end }
      prevEntry = fingerTable[i]
      uniqueEntries.push(currEntry)
    }
    else {
      uniqueEntries[uniqueEntries.length - 1].end = i
    }
  }
  console.log(uniqueEntries)

  return (
    <>
      <p>fingerTable</p>
      <ul>
        {uniqueEntries.map((fingerEntry, index) => {
          return <li key={`${fingerEntry.addr + index}`
          }> <details>
              <summary>{fingerEntry.addr}</summary>
              <p>start: {fingerEntry.start} end: {fingerEntry.end}</p>
            </details>
          </li>
        })}
      </ul>
    </>
  )
}

export default FingerTable
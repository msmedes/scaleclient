import React, { useState } from 'react';

const GetForm = ({ handleGetSubmit }) => {
  const [get, setGet] = useState("");

  const handleSubmit = (e) => {
    handleGetSubmit(e, get)
    setGet("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="get" value={get} onChange={e => setGet(e.target.value)} />
      <button type="submit">Get</button>
    </form>
  )
}

export default GetForm;
import React, { useState } from 'react';

import { Form } from '../styles/Form';

const GetForm = ({ handleGetSubmit }) => {
  const [get, setGet] = useState("");

  const handleSubmit = (e) => {
    handleGetSubmit(e, get)
    setGet("")
  }
  return (
    <Form onSubmit={handleSubmit}>
      <input type="text" name="get" value={get} onChange={e => setGet(e.target.value)} placeholder="key" />
      <button type="submit">Get</button>
    </Form>
  )
}

export default GetForm;
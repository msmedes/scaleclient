import React, { useState } from 'react';

import { Form } from '../styles/Form';


const SetForm = ({ handleSetSubmit }) => {
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    handleSetSubmit(e, key, value)
    setKey("")
    setValue("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <input type="text" name="key" value={key} onChange={e => setKey(e.target.value)} required />
        <input type="text" name="value" value={value} onChange={e => setValue(e.target.value)} required />
        <button type="submit">Set</button>
      </fieldset>
    </Form>
  )
}

export default SetForm

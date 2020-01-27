import React, { useState } from 'react'

import FormStyles from '../styles/FormStyles'

const GetForm = ({ handleGetSubmit, command }) => {
  const [get, setGet] = useState('')

  const handleSubmit = (e) => {
    handleGetSubmit(e, get)
    setGet('')
  }
  return (
    <FormStyles onSubmit={handleSubmit}>
      <input type="text" name="get" value={get} onChange={(e) => setGet(e.target.value)} placeholder="key" />
      <button type="submit">{command}</button>
    </FormStyles>
  )
}

export default GetForm

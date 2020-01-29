import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

GetForm.propTypes = {
  handleGetSubmit: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
}

export default GetForm

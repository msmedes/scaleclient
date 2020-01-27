import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormStyles from '../styles/FormStyles'


const SetForm = ({ handleSetSubmit }) => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    handleSetSubmit(e, key, value)
    setKey('')
    setValue('')
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      <fieldset>
        <input type="text" name="key" value={key} onChange={(e) => setKey(e.target.value)} required placeholder="key" />
        <input type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} required placeholder="value" />
        <button type="submit">Set</button>
      </fieldset>
    </FormStyles>
  )
}

SetForm.propTypes = { handleSetSubmit: PropTypes.func.isRequired }


export default SetForm

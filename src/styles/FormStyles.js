import styled from 'styled-components'

const FormStyles = styled.form`
  width: 100px;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  select {
    width: 50%;
    padding: 0.1rem;
    margin: 0.1rem;
    font-size: .75rem;
    border: 1px solid black;
    &:focus{
      outline: 0;
      border-color: #2980b9;
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: #222831;
    color: white;
    border: 0;
    font-size: .75rem;
    font-weight: 600;
    padding: 0.2rem 0.25rem;
    box-shadow: 0 0 2px grey;
  }
  fieldset{
    border: 0;
    padding: 0;
  }
  &[disabled] {
    opacity: 0.5;
  }
`

export default FormStyles

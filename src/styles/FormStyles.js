import styled from 'styled-components'

const FormStyles = styled.form`
  width: 150px;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  select {
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      font-family: Roboto Mono
    }
    ::-moz-placeholder { /* Firefox 19+ */
      font-family: Roboto Mono
    }
    :-ms-input-placeholder { /* IE 10+ */
      font-family: Roboto Mono
    }
    :-moz-placeholder { /* Firefox 18- */
      font-family: Roboto Mono
    }
    border: none;
    background: #fafafa;
    width: 75%;
    padding: 0.1rem;
    margin: 0.1rem;
    font-size: .75rem;
    &:focus{
      outline: 0;
      border-color: hsl(218, 5%, 50%);
      background-color: hsl(218, 5%, 93%);
    }
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, .12);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, .24);
  }
  button,
  input[type='submit'] {
    font-family: Roboto Mono, monospace;
    width: auto;
    background: hsl(218, 5%, 25%);
    color: #fafafa;
    border: 0;
    font-weight: 600;
    padding: 0.2rem 0.25rem;
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, .12);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, .24);
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

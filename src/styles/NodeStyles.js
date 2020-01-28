import styled from 'styled-components'

const NodeStyles = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 1px solid;
  border-radius: 50%;
  background: ${(props) => (props.isFinger ? 'rgba(57, 62, 120, .1)' : '#fafafa')};
  border-color: ${(props) => (props.inTrace ? 'blue' : 'black')};
  box-shadow: ${(props) => (props.inTrace ? '0 0 2px blue' : '0 0 2px grey')};
  width: 125px;
  height: 125px;
  margin: -30px;
  transform: ${(props) => `rotate(${props.rotateAngle}deg) translate(0, -325px) rotate(-${props.rotateAngle}deg)`};
  top: 50%;
  left: 50%;
  p{
    text-align: center;
    margin-top: 1px;
    margin-bottom: 0px;
  }
`

export default NodeStyles

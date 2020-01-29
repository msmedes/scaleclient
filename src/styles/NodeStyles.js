import styled from 'styled-components'

const NodeStyles = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  background: ${(props) => (props.isFinger ? 'hsl(218, 12%, 80%)' : 'hsl(218, 12%, 92%)')};
  background: ${(props) => (props.inTrace && 'hsl(218, 25%, 77%)')};
  box-shadow: ${(props) => (props.inTrace ? '1px 1px 1px hsl(218, 25%, 77%)' : 'hsl(218, 12%, 92%)')};
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
    color: ${(props) => ((props.isFinger || props.headNode || props.inTrace) ? 'hsl(218, 5%, 18%)' : 'hsl(218, 5%, 35%)')}
  }
  .fingerIndices{
    color: hsl(218, 5%, 40%);
    font-weight: 400;
  }
  .functionCall{

  }
  .duration{
  }
  .addr{
    font-weight: ${(props) => ((props.isFinger || props.headNode || props.inTrace) ? '500' : '400')};
  }
`

export default NodeStyles

import styled from 'styled-components'

const NodeStyles = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  background: ${(props) => ((props.isFinger || props.headNode) ? 'hsl(218, 12%, 80%)' : 'hsl(218, 12%, 92%)')};
  background: ${(props) => (props.inTrace && 'hsl(218, 25%, 77%)')};
  box-shadow: none;
  transition: box-shadow .15s ease;
  
  width: 125px;
  height: 125px;
  margin-top: -30px;
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
  &:hover {
    box-shadow: ${(props) => (props.inTrace ? '1px 1px 1px 1px hsl(218, 25%, 77%), 1px 1px 1px 1px hsl(218, 25%, 77%) inset' : '1px 1px 1px 1px hsl(218, 12%, 75%), 1px 1px 1px hsl(218, 12%, 88%) inset')};
    text-shadow: ${(props) => ((props.isFinger || props.headNode || props.inTrace) ? '.1px .1px hsl(218, 5%, 18%)' : '.1px .1px hsl(218, 5%, 35%)')};
  }
  `

export default NodeStyles

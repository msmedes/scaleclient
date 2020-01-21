import styled from 'styled-components';

const NodeStyles = styled.li`
  border: 1px solid black;
  border-radius: 1px;
  width: 125px;
  background: rgba(57, 62, 120, 0.1);
  transform: ${props => `rotate(${props.rotateAngle}deg) translate(0, -250px) rotate(-${props.rotateAngle}deg)`};
  list-style: none;
  position: absolute;
  top: 33%;
  left: 33%;
`;

export default NodeStyles
import React from 'react';

import Node from '../Node/Node';
import NodesStyles from '../styles/NodesStyles';

const Nodes = ({ nodes }) => {
  return (
    <NodesStyles>
      {
        nodes.map((node, index) => {
          return (
            <Node key={node.port + index} className="node" rotateAngle={node.rotateAngle} client={node.client} />
          )
        })
      }
    </NodesStyles>
  )
}

export default Nodes;
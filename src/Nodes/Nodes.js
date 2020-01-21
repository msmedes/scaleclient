import React from 'react';
import getApolloClient from '../utils/getApolloClient';

import Node from '../Node/Node';
import { ApolloProvider } from '@apollo/client';
import NodesStyles from '../styles/NodesStyles';

const Nodes = () => {
  const ports = ['8000', '8001', '8002', '8003', '8004', '8005', '8006', '8007'];

  const calcRotateAngle = (i, length) => {
    const offsetAngle = 360 / length;
    return offsetAngle * i;
  }

  const nodes = ports.map((port, index) => {
    return { port: port, client: getApolloClient(port), rotateAngle: calcRotateAngle(index, ports.length) }
  });

  console.log(nodes)
  return (
    <NodesStyles>
      {
        nodes.map((node, index) => {
          return (
            <ApolloProvider key={index + node.port} client={node.client}>
              <Node key={node.port + node.index} className="node" rotateAngle={node.rotateAngle} />
            </ApolloProvider>
          )
        })
      }
    </NodesStyles>
  )
}

export default Nodes;
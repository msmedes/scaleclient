import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import NProgress from 'nprogress';

import { GET_NODE_MD_WITH_TRACE } from './queries';
import { SET_KEY } from './mutations'

import Error from '../Error/Error';
import FingerTable from '../FingerTable/FingerTable';
import GetForm from './GetForm';
import Response from '../Response/Response';
import SetForm from './SetForm';

import NodeStyles from '../styles/NodeStyles';


const Node = ({ rotateAngle }) => {
  const [mutationVariables, setMutationVariables] = useState({ setKey: "", setValue: "" });
  const { loading: queryLoading, error: queryError, data, refetch, variables } = useQuery(GET_NODE_MD_WITH_TRACE,
    {
      // client,
      variables: { key: "" },
    });
  const [setKeyMutation, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(SET_KEY, {
    // client,
  });
  console.log(rotateAngle)
  console.log(data);
  NProgress.start();

  if (queryLoading) return <div>Loading...</div>
  if (queryError) return <Error error={error} />

  console.log("mutationData", mutationData);;

  const { node } = data.metadata;
  const { addr, fingerTable, id, keys } = node;
  const { addr: predAddr, id: predID } = node.predecessor;
  const { addr: succAddr, id: succID } = node.successor;
  NProgress.done();

  const handleGetSubmit = (e, get) => {
    e.preventDefault();
    refetch({ key: get });

  }

  const handleSetSubmit = (e, key, value) => {
    e.preventDefault();
    setKeyMutation({ variables: { key, value } });
    setMutationVariables({ key, value });
  }

  return (
    <NodeStyles rotateAngle={rotateAngle}>
      <p>{":" + addr.split(":")[1]}</p>
      <GetForm handleGetSubmit={handleGetSubmit} />
      <SetForm handleSetSubmit={handleSetSubmit} />
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <Error error={mutationError} />}
      {variables.key && <Response getKey={variables.key} value={data.get.value} trace={data.get.trace} />}
      {mutationData && <Response getKey={mutationVariables.key} value={mutationVariables.value} trace={mutationData.set.trace} />}
    </NodeStyles>
  )
}

export default Node
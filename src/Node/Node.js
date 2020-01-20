import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import NProgress from 'nprogress';

import { GET_NODE_MD_WITH_TRACE } from './queries';
import { SET_KEY } from './mutations'

import Error from '../Error/Error';
import FingerTable from '../FingerTable/FingerTable';
import GetForm from './GetForm';
import GetResponse from '../GetResponse/GetResponse';
import SetForm from './SetForm';


const Node = () => {
  const { loading: queryLoading, error: queryError, data, refetch, variables } = useQuery(GET_NODE_MD_WITH_TRACE,
    {
      variables: { key: "" },
    });
  const [setKeyMutation, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(SET_KEY);

  console.log(data);
  NProgress.start();

  if (queryLoading) return <div>Loading...</div>
  if (queryError) return <Error error={error} />

  console.log("variables.key", variables.key)
  console.log("value", data.get.value)
  console.log("trace", data.get.trace)

  const { node } = data.metadata;
  const { addr, fingerTable, id, keys } = node;
  const { addr: predAddr, id: predID } = node.predecessor;
  const { addr: succAddr, id: succID } = node.successor;
  NProgress.done();

  const handleGetSubmit = (e, get) => {
    NProgress.start()
    e.preventDefault();
    refetch({ key: get });
    NProgress.done()
  }

  const handleSetSubmit = (e, key, value) => {
    e.preventDefault();
    setKeyMutation({ variables: { key, value } });
  }

  return (
    <div>
      <p>addr: {addr}</p>
      <p>id: {id}</p>
      <p>pred: {predAddr} id: {predID}</p>
      <p>succ: {succAddr} id: {succID}</p>
      <p>keys: {keys.length > 0 ? keys : 'None'}</p>
      <FingerTable fingerTable={fingerTable} />
      <GetForm handleGetSubmit={handleGetSubmit} />
      <SetForm handleSetSubmit={handleSetSubmit} />
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <Error error={mutationError} />}
      {variables.key && <GetResponse getKey={variables.key} value={data.get.value} trace={data.get.trace} />}
    </div>
  )
}

export default Node
import { useQuery } from '@apollo/client';
import React from 'react';
import { Text } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
const RepositoryDetails = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });
  if (loading) {
    return <Text>loading..</Text>;
  }
  const { url, ...rest } = data.repository;

  return <RepositoryItem item={rest} showUrl={url} />;
};

export default RepositoryDetails;

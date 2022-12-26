import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (queryParameters) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: { ...queryParameters },
    fetchPolicy: 'cache-and-network',
  });
  console.log(queryParameters);
  return { repositories: data?.repositories, loading };
};

export default useRepositories;
